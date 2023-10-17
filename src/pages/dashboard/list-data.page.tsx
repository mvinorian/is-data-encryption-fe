import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import Button from '@/components/buttons/Button';
import Typography from '@/components/typography/Typography';
import DashboardLayout from '@/layouts/DashboardLayout';
import { ApiError, ApiReturn } from '@/types/api';

type ListDataColumn = {
  name: string;
  encrypt_method: 'AES' | 'DES' | 'RC4';
  encrypt_time: string;
};

export default function ListDataPage() {
  const { data } = useQuery<ApiReturn<ListDataColumn[]>, AxiosError<ApiError>>([
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
        <div className='w-full bg-teal-500 text-base-surface grid grid-cols-12 px-2 rounded-t-md border-b'>
          <div className='col-span-1 p-2 flex justify-center'>
            <Typography variant='p'>No</Typography>
          </div>
          <div className='col-span-4 p-2 flex justify-center'>
            <Typography variant='p'>Name</Typography>
          </div>
          <div className='col-span-2 p-2 flex justify-center'>
            <Typography variant='p'>Encryption Method</Typography>
          </div>
          <div className='col-span-2 p-2 flex justify-center'>
            <Typography variant='p'>Encryption Time</Typography>
          </div>
          <div className='col-end-12 p-2 flex justify-center'>
            <Typography variant='p'>Action</Typography>
          </div>
        </div>

        {data &&
          data.data?.map(({ name, encrypt_method, encrypt_time }, index) => (
            <div
              key={index}
              className='w-full border text-teal-600 grid grid-cols-12 px-2 last:rounded-b-md'
            >
              <div className='col-span-1 p-2 flex justify-center items-center'>
                <Typography variant='p'>{index + 1}</Typography>
              </div>
              <div className='col-span-4 p-2 flex justify-center items-center'>
                <Typography variant='p'>{name}</Typography>
              </div>
              <div className='col-span-2 p-2 flex justify-center items-center'>
                <Typography variant='p'>{encrypt_method}</Typography>
              </div>
              <div className='col-span-2 p-2 flex justify-center items-center'>
                <Typography variant='p'>{encrypt_time}</Typography>
              </div>
              <div className='col-end-12 p-2 flex justify-center items-center'>
                <Button>Details</Button>
              </div>
            </div>
          ))}
      </div>
    </DashboardLayout>
  );
}
