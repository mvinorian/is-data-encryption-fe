import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Button from '@/components/buttons/Button';
import Input from '@/components/form/Input';
import TextArea from '@/components/form/TextArea';
import clsxm from '@/lib/clsxm';
import { DataResponse } from '@/types/entity/data';

enum Method {
  'AES',
  'RC4',
  'DES',
}

export default function AddDataStatistics({
  statistics,
}: {
  statistics: DataResponse[];
}) {
  const [tab, setTab] = React.useState<keyof typeof Method>('AES');

  const methods = useForm<DataResponse>();

  const getStatistics = (method: keyof typeof Method) => {
    if (method === 'AES') return statistics[0];
    if (method === 'RC4') return statistics[1];
    return statistics[2];
  };

  return (
    <FormProvider {...methods}>
      <form className='p-6 space-y-4 w-1/2 bg-white rounded-lg'>
        <div className='p-2 w-full flex justify-between gap-4 bg-base-light rounded-md'>
          <Button
            size='small'
            variant={tab === 'AES' ? 'primary' : 'secondary'}
            disabled={tab === 'AES'}
            className='w-full'
            textClassName={clsxm(tab === 'AES' && 'text-base-surface')}
            onClick={() => setTab('AES')}
          >
            AES
          </Button>
          <Button
            size='small'
            variant={tab === 'RC4' ? 'primary' : 'secondary'}
            disabled={tab === 'RC4'}
            className='w-full'
            textClassName={clsxm(tab === 'RC4' && 'text-base-surface')}
            onClick={() => setTab('RC4')}
          >
            RC4
          </Button>
          <Button
            size='small'
            variant={tab === 'DES' ? 'primary' : 'secondary'}
            disabled={tab === 'DES'}
            className='w-full'
            textClassName={clsxm(tab === 'DES' && 'text-base-surface')}
            onClick={() => setTab('DES')}
          >
            DES
          </Button>
        </div>

        <Input
          readOnly
          id='encrypt_time'
          label='Encryption Time'
          suffix='seconds'
          value={getStatistics(tab).encrypt_time}
        />
        <TextArea
          readOnly
          id='name'
          label='Name'
          value={getStatistics(tab).name}
        />
        <TextArea
          readOnly
          id='phone_number'
          label='Phone Number'
          value={getStatistics(tab).phone_number}
        />
        <TextArea
          readOnly
          id='id_card_url'
          label='ID Card URL'
          value={getStatistics(tab).id_card_url}
        />
        <TextArea
          readOnly
          id='cv_url'
          label='Curriculum Vitae URL'
          value={getStatistics(tab).cv_url}
        />
        <TextArea
          readOnly
          id='video_url'
          label='Introduction Video URL'
          value={getStatistics(tab).video_url}
        />
      </form>
    </FormProvider>
  );
}
