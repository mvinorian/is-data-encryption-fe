import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { ApiError } from 'next/dist/server/api-utils';
import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';
import { BsFillPersonFill } from 'react-icons/bs';

import Button from '@/components/buttons/Button';
import TextArea from '@/components/form/TextArea';
import PageNavigation from '@/components/PageNavigation';
import Typography from '@/components/typography/Typography';
import usePageNavigation from '@/hooks/usePageNavigation';
import api from '@/lib/api';
import CommentCard from '@/pages/manga/components/CommentCard';
import useAuthStore from '@/store/useAuthStore';
import { ApiReturn, PaginatedApiResponse } from '@/types/api';
import { Comment } from '@/types/entity/manga';

export default function Comment({ mangaId }: { mangaId: number }) {
  const user = useAuthStore.useUser();
  const router = useRouter();
  const methods = useForm<{ isi: string }>();
  const { handleSubmit } = methods;
  const { pageState, setPageState } = usePageNavigation({ pageSize: 5 });

  const { mutate: addComment } = useMutation<
    AxiosResponse<ApiReturn<null>>,
    AxiosError<ApiError>,
    { isi: string; seri_id: number }
  >((data: { isi: string; seri_id: number }) => api.post('komentar', data));

  const url = `/komentar/${mangaId}?page=${pageState.pageIndex + 1}&per_page=${
    pageState.pageSize
  }`;

  const { data: commentData, refetch } = useQuery<
    PaginatedApiResponse<Comment[]>
  >([url], {
    keepPreviousData: true,
  });

  const onSubmit = (data: { isi: string }) => {
    !user && router.push('/login');

    addComment(
      {
        isi: data.isi,
        seri_id: mangaId,
      },
      { onSuccess: () => refetch() }
    );
  };

  return (
    <div className='flex flex-col gap-6 w-full'>
      <Typography weight='semibold' className='text-teal-600'>
        Komentar Pembaca
      </Typography>

      <FormProvider {...methods}>
        <form
          className='flex flex-col w-full bg-base-surface gap-3 p-3 rounded-lg'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='flex flex-row items-center gap-1.5'>
            <div className='w-8 h-8 flex justify-center items-center rounded-full bg-base-light'>
              <BsFillPersonFill className='text-xl text-base-icon' />
            </div>
            <Typography variant='c' weight='semibold' className='text-teal-600'>
              {user ? user.nama : 'Guest'}
            </Typography>
          </div>
          <TextArea
            id='isi'
            placeholder='Tulis komentar di sini...'
            rows={5}
            onClick={() => !user && router.push('/login')}
          />
          <Button type='submit' className='self-end'>
            Kirim Komentar
          </Button>
        </form>
      </FormProvider>

      <div className='flex flex-col gap-6 items-end'>
        {commentData?.data.data_per_page?.map(
          ({ id, isi, username, created_at }) => (
            <CommentCard
              key={id}
              content={isi}
              author={username}
              createdAt={created_at}
            />
          )
        )}
        {commentData && (
          <PageNavigation
            meta={commentData?.data.meta}
            pageCount={5}
            pageState={pageState}
            setPageState={setPageState}
          />
        )}
      </div>
    </div>
  );
}
