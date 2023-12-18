import { FormProvider, useForm } from 'react-hook-form';

import Button from '@/components/buttons/Button';
import DropzoneInput from '@/components/form/DropzoneInput';
import { Files } from '@/types/entity/data';

export default function VerifyDigitalSignatureForm({
  onSubmit,
  isLoading,
}: {
  onSubmit: (data: Files) => void;
  isLoading: boolean;
}) {
  const methods = useForm<Files>();

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='p-6 space-y-4 bg-white rounded-lg mx-40'
        encType='multipart/form-data'
      >
        <div className='space-y-3'>
          <DropzoneInput
            id='files'
            label='File'
            accept={{ 'application/pdf': ['.pdf'] }}
            acceptTypes='PDF'
            validation={{
              required: 'File is required',
            }}
          />
        </div>

        <Button type='submit' className='w-full' isLoading={isLoading}>
          Submit
        </Button>
      </form>
    </FormProvider>
  );
}
