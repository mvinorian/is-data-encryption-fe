import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { serialize } from 'object-to-formdata';
import React from 'react';
import { toast } from 'react-toastify';

import withAuth from '@/components/hoc/withAuth';
import Typography from '@/components/typography/Typography';
import DashboardLayout from '@/layouts/DashboardLayout';
import api from '@/lib/api';
import VerifyDigitalSignatureForm from '@/pages/dashboard/container/VerifyDigitalSignatureForm';
import { ApiError, ApiReturn } from '@/types/api';
import { Files, FilesResponse } from '@/types/entity/data';
export default withAuth(VerifyDigitalSignaturePage, ['all']);

function VerifyDigitalSignaturePage() {
  const [response, setResponse] = React.useState<FilesResponse>();

  const { mutate: handleAddData, isLoading } = useMutation<
    AxiosResponse<ApiReturn<FilesResponse>>,
    AxiosError<ApiError>,
    FormData
  >(async (data) => {
    const res = await api.post('/encrypt/verify_digital_signature', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res;
  });
  const onSubmit = (data: Files) => {
    const body = {
      files: data.files[0],
    };

    const formData = serialize(body, { indices: true });
    handleAddData(formData, {
      onSuccess: (response) => {
        setResponse(response.data.data);
      },
      onError: (err) => {
        setResponse(undefined);
        toast.error(err.response?.data.errors);
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
          Verify Digital Signature
        </Typography>
        <Typography as='p' variant='p' className='text-base-icon'>
          Upload your file!
        </Typography>
      </div>
      <VerifyDigitalSignatureForm onSubmit={onSubmit} isLoading={isLoading} />
      {response && (
        <div className='p-6 space-y-4 bg-white rounded-lg mx-40'>
          <Typography as='p' variant='p' className='text-base-icon'>
            Name : {response.name}
          </Typography>
          <Typography as='p' variant='p' className='text-base-icon'>
            Email : {response.email}
          </Typography>
          <Typography as='p' variant='p' className='text-base-icon'>
            Issued On : {response.dateTime}
          </Typography>
        </div>
      )}
    </DashboardLayout>
  );
}
