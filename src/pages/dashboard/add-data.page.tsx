import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { serialize } from 'object-to-formdata';
import React from 'react';
import { TbNumber1, TbNumber2 } from 'react-icons/tb';

import Button from '@/components/buttons/Button';
import withAuth from '@/components/hoc/withAuth';
import Typography from '@/components/typography/Typography';
import DashboardLayout from '@/layouts/DashboardLayout';
import api from '@/lib/api';
import AddDataForm from '@/pages/dashboard/container/AddDataForm';
import AddDataStatistics from '@/pages/dashboard/container/AddDataStatistic';
import { ApiError, ApiReturn } from '@/types/api';
import { Data, DataResponse } from '@/types/entity/data';

export default withAuth(AddDataPage, ['all']);

function AddDataPage() {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [page, setPage] = React.useState<number>(1);
  const [response, setResponse] = React.useState<DataResponse[]>([]);

  const { mutate: handleAddData, isLoading } = useMutation<
    AxiosResponse<ApiReturn<DataResponse[]>>,
    AxiosError<ApiError>,
    FormData
  >(async (data) => {
    const res = await api.post('/encrypt', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res;
  });

  const onSubmit = (data: Data) => {
    const body = {
      name: data.name,
      phone_number: data.phone_number,
      id_card: data.id_card[0],
      cv: data.cv[0],
      video: data.video[0],
      id_card_filename: data.id_card[0].fileName,
      cv_filename: data.cv[0].fileName,
      video_filename: data.video[0].fileName,
    };

    const formData = serialize(body, { indices: true });
    handleAddData(formData, {
      onSuccess: (response) => {
        setPage(2);
        setResponse(response.data.data);
      },
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
        {page === 2 ? (
          <Typography as='p' variant='p' className='text-base-icon'>
            Your data has been stored with these encryption.
          </Typography>
        ) : (
          <Typography as='p' variant='p' className='text-base-icon'>
            Your data are stored with encryption. Click continue when
            you&apos;re done!
          </Typography>
        )}
      </div>

      <div className='flex gap-8 items-start'>
        {page === 2 ? (
          <AddDataStatistics statistics={response} />
        ) : (
          <AddDataForm onSubmit={onSubmit} isLoading={isLoading} />
        )}

        <div className='relative px-12 py-6 grid grid-cols-2 gap-8 bg-white rounded-lg'>
          <div className='absolute z-0 w-full h-full flex justify-center'>
            <div className='absolute top-1/3 w-1/4 h-0.5 bg-teal-500'></div>
          </div>
          <div className='flex flex-col gap-2 items-center'>
            <Button
              disabled
              size='large'
              icon={TbNumber1}
              iconClassName='text-base-surface'
            />
            <Typography className='text-base-icon'>Form Data</Typography>
          </div>
          <div className='flex flex-col gap-2 items-center'>
            <Button
              disabled
              size='large'
              variant={page === 2 ? 'primary' : 'secondary'}
              icon={TbNumber2}
              iconClassName={page === 2 ? 'text-base-surface' : 'text-teal-500'}
              className='relative bg-base-surface z-10'
            />
            <Typography className='text-base-icon'>Statistics</Typography>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
