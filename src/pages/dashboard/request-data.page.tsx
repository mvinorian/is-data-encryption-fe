import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Button from '@/components/buttons/Button';
import Input from '@/components/form/Input';
import withAuth from '@/components/hoc/withAuth';
import ButtonLink from '@/components/links/ButtonLink';
import Modal from '@/components/modal/Modal';
import Typography from '@/components/typography/Typography';
import DashboardLayout from '@/layouts/DashboardLayout';
import api from '@/lib/api';
import useAuthStore from '@/store/useAuthStore';
import { ApiError, ApiReturn } from '@/types/api';
import { SharedDataResponse } from '@/types/entity/data';
import { User } from '@/types/entity/user';

export default withAuth(RequestDataPage, ['all']);

function RequestDataPage() {
  const user = useAuthStore().user;

  const [openData, setOpenData] = React.useState(false);
  const [sharedData, setSharedData] = React.useState<SharedDataResponse>();
  const form = useForm<SharedDataResponse>();

  const { mutate: mutateRequest, isLoading: requestIsLoading } = useMutation<
    AxiosResponse<ApiReturn<{ email: string }>>,
    AxiosError<ApiError>,
    { email: string }
  >(
    async (data) => {
      const res = await api.post('/user/request_data', data);
      return res;
    },
    {
      onSuccess: () => {
        toast.success('Request data success');
      },
      onError: (err) => {
        toast.error(err.response?.data.errors);
      },
    }
  );

  const { mutate: mutateView, isLoading: viewIsLoading } = useMutation<
    AxiosResponse<ApiReturn<SharedDataResponse[]>>,
    AxiosError<ApiError>,
    { email: string }
  >(
    async (data) => {
      const res = await api.post('/user/asymmetric_decrypt', data);
      return res;
    },
    {
      onSuccess: (res) => {
        const data = res.data.data;
        setSharedData(data[0]);
        setOpenData(true);
      },
      onError: (err) => {
        toast.error(err.response?.data.errors);
      },
    }
  );

  const handleRequest = (data: { email: string }) => mutateRequest(data);

  const handleView = (data: { email: string }) => mutateView(data);

  const { data } = useQuery<ApiReturn<User[]>, AxiosError<ApiError>>(['/user']);

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
                    variant='secondary'
                    isLoading={requestIsLoading}
                    onClick={() => handleRequest({ email })}
                  >
                    Request
                  </Button>
                  <Button
                    isLoading={viewIsLoading}
                    onClick={() => handleView({ email })}
                  >
                    View
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

      <Modal open={openData} setOpen={setOpenData}>
        <Modal.Title>
          <Typography variant='h6' className='text-teal-600'>
            Requested Data
          </Typography>
        </Modal.Title>
        <Modal.Body>
          {sharedData && (
            <FormProvider {...form}>
              <form className='space-y-3'>
                <Input
                  id='name'
                  label='Name'
                  readOnly
                  value={sharedData.name}
                />
                <Input
                  id='phone_number'
                  label='Phone Number'
                  readOnly
                  value={`+62${sharedData.phone_number}`}
                />

                <div className='space-y-1 5'>
                  <Typography className='font-semibold text-teal-600'>
                    Files
                  </Typography>
                  <div className='flex gap-1'>
                    <ButtonLink
                      target='_blank'
                      size='small'
                      href={
                        api.getUri() +
                        '/encrypt/file?file_path=' +
                        sharedData.id_card
                      }
                    >
                      Show ID
                    </ButtonLink>
                    <ButtonLink
                      target='_blank'
                      size='small'
                      href={
                        api.getUri() +
                        '/encrypt/file?file_path=' +
                        sharedData.cv
                      }
                    >
                      Show CV
                    </ButtonLink>
                    <ButtonLink
                      target='_blank'
                      size='small'
                      href={
                        api.getUri() +
                        '/encrypt/file?file_path=' +
                        sharedData.video
                      }
                    >
                      Show Video
                    </ButtonLink>
                  </div>
                </div>
              </form>
            </FormProvider>
          )}
        </Modal.Body>
      </Modal>
    </DashboardLayout>
  );
}
