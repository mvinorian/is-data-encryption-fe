import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { serialize } from 'object-to-formdata';
import React from 'react';

import withAuth from '@/components/hoc/withAuth';
import Typography from '@/components/typography/Typography';
import DashboardLayout from '@/layouts/DashboardLayout';
import api from '@/lib/api';
import AddDataForm from '@/pages/dashboard/container/AddDataForm';
import { ApiError, ApiReturn } from '@/types/api';
import { Data } from '@/types/entity/data';

export default withAuth(AddDataPage, ['all']);

function AddDataPage() {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [page, setPage] = React.useState<number>(0);

  const { mutate: handleAddData } = useMutation<
    AxiosResponse<ApiReturn<Data>> | void,
    AxiosError<ApiError>,
    FormData
  >(async (data) => {
    const res = await api.post('/encrypt', data);
    return res;
  });

  const onSubmit = (data: Data) => {
    const body = {
      name: data.name,
      phone_number: data.phone_number,
      id_card: data.id_card[0],
      cv: data.cv[0],
      video: data.video[0],
    };

    const formData = serialize(body, { indices: true });
    handleAddData(formData, {
      onSuccess: () => setPage(1),
    });
  };

  return (
    <DashboardLayout>
      <div className='space-y-1'>
        <Typography
          as='h5'
          variant='h5'
          className='text-teal-600 font-semibold'
        >
          Add new data to your account
        </Typography>
        <Typography as='p' variant='p' className='text-base-icon'>
          Your data are stored with encryption. Click continue when you&apos;re
          done!
        </Typography>
      </div>

      <div className='flex gap-8'>
        <AddDataForm onSubmit={onSubmit} />
      </div>
    </DashboardLayout>
  );
}
