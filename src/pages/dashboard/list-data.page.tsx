import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import withAuth from '@/components/hoc/withAuth';
import ButtonLink from '@/components/links/ButtonLink';
import Typography from '@/components/typography/Typography';
import DashboardLayout from '@/layouts/DashboardLayout';
import api from '@/lib/api';
import { ApiError, ApiReturn } from '@/types/api';
import { DataResponse } from '@/types/entity/data';

export default withAuth(ListDataPage, ['all']);

function ListDataPage() {
  const { data } = useQuery<ApiReturn<DataResponse[]>, AxiosError<ApiError>>([
    '/encrypt',
  ]);

  return (
    <DashboardLayout>
      <div className='space-y-1'>
        <Typography
          as='h5'
          variant='h5'
          className='text-teal-600 font-semibold'
        >
          Data that you&apos;ve been added
        </Typography>
        <Typography as='p' variant='p' className='text-base-icon'>
          Click detail to see your saved data!
        </Typography>
      </div>

      <div className='space-y-0'>
        <div className='w-full bg-teal-500 text-base-surface grid grid-cols-11 px-2 rounded-t-md border-b'>
          <div className='col-span-1 py-4 px-2 flex justify-center items-center'>
            <Typography variant='p'>No</Typography>
          </div>
          <div className='col-span-2 py-4 px-2 flex justify-center items-center'>
            <Typography variant='p' className='text-center'>
              Name
            </Typography>
          </div>
          <div className='col-span-2 py-4 px-2 flex justify-center items-center'>
            <Typography variant='p' className='text-center'>
              Phone Number
            </Typography>
          </div>
          <div className='col-span-1 py-4 px-2 flex justify-center items-center'>
            <Typography variant='p' className='text-center'>
              ID Card
            </Typography>
          </div>
          <div className='col-span-1 py-4 px-2 flex justify-center items-center'>
            <Typography variant='p' className='text-center'>
              Curriculum Vitae
            </Typography>
          </div>
          <div className='col-span-1 py-4 px-2 flex justify-center items-center'>
            <Typography variant='p' className='text-center'>
              Introduction Video
            </Typography>
          </div>
          <div className='col-span-1 py-4 px-2 flex justify-center items-center'>
            <Typography variant='p' className='text-center'>
              Encryption Method
            </Typography>
          </div>
          <div className='col-span-2 py-4 px-2 flex justify-center items-center'>
            <Typography variant='p' className='text-center'>
              Encryption Time (s)
            </Typography>
          </div>
        </div>

        {data && data.data.length != 0 ? (
          data.data.map(
            (
              {
                name,
                phone_number,
                id_card_url,
                cv_url,
                video_url,
                encrypt_method,
                encrypt_time,
              },
              index
            ) => (
              <div
                key={index}
                className='w-full border bg-base-surface text-teal-600 grid grid-cols-11 px-2 last:rounded-b-md'
              >
                <div className='col-span-1 py-4 px-2 flex justify-center items-center'>
                  <Typography variant='p'>{index + 1}</Typography>
                </div>
                <div className='col-span-2 py-4 px-2 flex justify-center items-center'>
                  <Typography variant='p'>{name}</Typography>
                </div>
                <div className='col-span-2 py-4 px-2 flex justify-center items-center'>
                  <Typography variant='p'>+62{phone_number}</Typography>
                </div>
                <div className='col-span-1 py-4 px-2 flex justify-center items-center'>
                  <ButtonLink
                    href={
                      api.getUri() + '/encrypt/file?file_path=' + id_card_url
                    }
                    size='small'
                    target='_blank'
                  >
                    Show Files
                  </ButtonLink>
                </div>
                <div className='col-span-1 py-4 px-2 flex justify-center items-center'>
                  <ButtonLink
                    href={api.getUri() + '/encrypt/file?file_path=' + cv_url}
                    size='small'
                    target='_blank'
                  >
                    Show Files
                  </ButtonLink>
                </div>
                <div className='col-span-1 py-4 px-2 flex justify-center items-center'>
                  <ButtonLink
                    href={api.getUri() + '/encrypt/file?file_path=' + video_url}
                    size='small'
                    target='_blank'
                  >
                    Show Files
                  </ButtonLink>
                </div>
                <div className='col-span-1 py-4 px-2 flex justify-center items-center'>
                  <Typography variant='p'>{encrypt_method}</Typography>
                </div>
                <div className='col-span-2 py-4 px-2 flex justify-center items-center'>
                  <Typography variant='p'>{encrypt_time}</Typography>
                </div>
              </div>
            )
          )
        ) : (
          <div className='w-full border text-teal-600 rounded-b-md p-4 flex justify-center items-center'>
            <Typography variant='p'>No Data</Typography>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
