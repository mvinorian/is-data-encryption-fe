import { FormProvider, useForm } from 'react-hook-form';

import Button from '@/components/buttons/Button';
import DropzoneInput from '@/components/form/DropzoneInput';
import Input from '@/components/form/Input';
import { REG_PHONE } from '@/constant/regex';
import { Data } from '@/types/entity/data';

export default function AddDataForm({
  onSubmit,
}: {
  onSubmit: (data: Data) => void;
}) {
  const methods = useForm<Data>();

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='p-6 space-y-4 w-1/2 bg-white rounded-lg'
      >
        <div className='space-y-3'>
          <Input
            id='name'
            label='Name'
            placeholder='Input your name'
            validation={{
              required: 'Name is required',
            }}
          />
          <Input
            id='phone_number'
            label='Phone Number'
            prefix='+62'
            placeholder='Input your phone number'
            validation={{
              required: 'Phone number is required',
              pattern: {
                value: REG_PHONE,
                message: 'Phone number is not valid',
              },
            }}
          />
          <DropzoneInput
            id='id_card'
            label='ID Card'
            accept={{ 'image/*': ['.jpg', '.jpeg', '.png'] }}
            acceptTypes='JPG, JPEG, or PNG'
            validation={{
              required: 'ID Card is required',
            }}
          />
          <DropzoneInput
            id='cv'
            label='Curriculum Vitae'
            accept={{ 'application/pdf': ['.pdf'] }}
            acceptTypes='PDF'
            validation={{
              required: 'ID Card is required',
            }}
          />
          <DropzoneInput
            id='video'
            label='Introduction Video'
            accept={{ 'video/*': ['.mp4', '.mkv'] }}
            acceptTypes='MP4 or MKV'
            validation={{
              required: 'ID Card is required',
            }}
            maxSize={10_000_000}
          />
        </div>

        <Button type='submit' className='w-full'>
          Continue
        </Button>
      </form>
    </FormProvider>
  );
}
