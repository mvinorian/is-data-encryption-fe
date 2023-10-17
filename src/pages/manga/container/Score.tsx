import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { AiFillStar } from 'react-icons/ai';

import Typography from '@/components/typography/Typography';
import api from '@/lib/api';
import clsxm from '@/lib/clsxm';
import useAuthStore from '@/store/useAuthStore';
import { ApiError, ApiReturn } from '@/types/api';

type Rating = {
  id: number;
  rating: number;
  seri_id: number;
};

export default function Score({ seriId }: { seriId: number }) {
  const user = useAuthStore.useUser();
  const [score, setScore] = useState(0);
  const [userScore, setUserScore] = useState(0);

  const { refetch } = useQuery<ApiReturn<Rating[]>>(['seri/rating'], {
    onSuccess: ({ data }) => {
      const userRating = data.filter(({ seri_id }) => seri_id === seriId);
      if (userRating.length) {
        setUserScore(userRating[0].rating);
        setScore(userRating[0].rating);
      }
    },
  });

  const router = useRouter();

  const { mutate: addSkor } = useMutation<
    AxiosResponse<ApiReturn<null>>,
    AxiosError<ApiError>,
    { rating: number; seri_id: number }
  >((data: { rating: number; seri_id: number }) =>
    api.post('seri/rating', data)
  );

  const handleClick = (rating: number) => {
    if (user) {
      addSkor(
        { rating, seri_id: seriId },
        {
          onSuccess: () => {
            refetch().then((res) => {
              if (res.status == 'success') {
                const userRating = res.data.data.filter(
                  ({ seri_id }) => seri_id === seriId
                );
                if (userRating.length) {
                  setUserScore(userRating[0].rating);
                  setScore(userRating[0].rating);
                }
              }
            });
          },
        }
      );
    } else router.push('/login');
  };
  return (
    <div className='flex flex-col gap-6 w-full'>
      <Typography weight='semibold' className='text-teal-600'>
        Skor Pembaca
      </Typography>

      <div className='flex flex-row justify-between p-3 bg-base-surface rounded-lg'>
        <div className='flex flex-row'>
          {Array.from({ length: 10 }, (_, i) => i + 1).map((index) => (
            <div
              key={index}
              className='pr-8'
              onMouseEnter={() => setScore(index)}
              onMouseLeave={() => setScore(userScore)}
              onClick={() => handleClick(index)}
            >
              <AiFillStar
                className={clsxm(
                  'text-5xl text-base-inline cursor-pointer',
                  score && index <= score && 'text-yellow-500'
                )}
              />
            </div>
          ))}
        </div>
        <Typography variant='h5' weight='bold' className='text-teal-600'>
          {score}/10
        </Typography>
      </div>
    </div>
  );
}
