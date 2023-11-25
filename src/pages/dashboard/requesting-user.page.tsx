import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import React from 'react';
import { toast } from 'react-toastify';

import Button from '@/components/buttons/Button';
import withAuth from '@/components/hoc/withAuth';
import Typography from '@/components/typography/Typography';
import DashboardLayout from '@/layouts/DashboardLayout';
import api from '@/lib/api';
import useAuthStore from '@/store/useAuthStore';
import { ApiError, ApiReturn } from '@/types/api';
import { SharedDataResponse } from '@/types/entity/data';
import { User } from '@/types/entity/user';

export default withAuth(RequestingUserPage, ['all']);

function RequestingUserPage() {
  const user = useAuthStore().user;

  const { mutate: mutateAccept, isLoading: acceptIsLoading } = useMutation<
    AxiosResponse<ApiReturn<{ email: string }>>,
    AxiosError<ApiError>,
    { email: string }
  >(
    async (data) => {
      const res = await api.post(
        `user/asymmetric_encypt?requesting_user_email=${data.email}&response=accept`
      );
      return res;
    },
    {
      onSuccess: () => {
        toast.success('Success to accept user');
      },
      onError: (err) => {
        toast.error(err.response?.data.errors);
      },
    }
  );

  const { mutate: mutateDecline, isLoading: declineIsLoading } = useMutation<
    AxiosResponse<ApiReturn<SharedDataResponse[]>>,
    AxiosError<ApiError>,
    { email: string }
  >(
    async (data) => {
      const res = await api.post(
        `user/asymmetric_encypt?requesting_user_email=${data.email}&response=decline`
      );
      return res;
    },
    {
      onSuccess: () => {
        toast.success('Success to decline user');
      },
      onError: (err) => {
        toast.error(err.response?.data.errors);
      },
    }
  );

  const handleAccept = (data: { email: string }) => mutateAccept(data);

  const handleDecline = (data: { email: string }) => mutateDecline(data);

  const { data } = useQuery<ApiReturn<User[]>, AxiosError<ApiError>>([
    '/user/get_list_requesting_user',
  ]);

  return (
    <DashboardLayout>
      <div className='space-y-1'>
        <Typography
          as='h5'
          variant='h5'
          className='text-teal-600 font-semibold'
        >
          List of User
        </Typography>
        <Typography as='p' variant='p' className='text-base-icon'>
          Choose one of the available user!
        </Typography>
      </div>

      <div className='space-y-0'>
        <div className='w-full bg-teal-500 text-base-surface grid grid-cols-11 px-2 rounded-t-md border-b'>
          <div className='col-span-1 py-4 px-2 flex justify-center items-center'>
            <Typography variant='p'>No</Typography>
          </div>
          <div className='col-span-7 py-4 px-2 flex justify-center items-center'>
            <Typography variant='p' className='text-center'>
              Email
            </Typography>
          </div>
          <div className='col-span-3 py-4 px-2 flex justify-center items-center'>
            <Typography variant='p' className='text-center'>
              Action
            </Typography>
          </div>
        </div>

        {data && data.data.length != 0 ? (
          data.data
            .filter(({ email }) => email !== user?.email)
            .map(({ email }, index) => (
              <div
                key={index}
                className='w-full border bg-base-surface text-teal-600 grid grid-cols-11 px-2 last:rounded-b-md'
              >
                <div className='col-span-1 py-4 px-2 flex justify-center items-center'>
                  <Typography variant='p'>{index + 1}</Typography>
                </div>
                <div className='col-span-7 py-4 px-2 flex justify-center items-center'>
                  <Typography variant='p'>{email}</Typography>
                </div>
                <div className='col-span-3 py-4 px-2 flex justify-center items-center gap-2'>
                  <Button
                    isLoading={acceptIsLoading}
                    onClick={() => handleAccept({ email })}
                  >
                    Accept
                  </Button>
                  <Button
                    variant='secondary'
                    isLoading={declineIsLoading}
                    onClick={() => handleDecline({ email })}
                  >
                    Decline
                  </Button>
                </div>
              </div>
            ))
        ) : (
          <div className='w-full border text-teal-600 rounded-b-md p-4 flex justify-center items-center'>
            <Typography variant='p'>No Data</Typography>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
