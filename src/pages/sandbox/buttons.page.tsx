import * as React from 'react';
import { BiPlus } from 'react-icons/bi';

import Button from '@/components/buttons/Button';
import Typography from '@/components/typography/Typography';
import { ExtractProps } from '@/types/helper';

export default function ButtonsPage() {
  return (
    <div className='p-6 min-w-max space-y-8 bg-base-surface text-base-primary'>
      <Typography as='h1' variant='h1' font='montserrat' className='font-bold'>
        Buttons
      </Typography>

      <div className='flex space-x-8'>
        <ButtonColumn size='small' />
        <ButtonColumn size='base' />
        <ButtonColumn size='large' />
      </div>
    </div>
  );
}

type ButtonProps = ExtractProps<typeof Button>;

function ButtonSet(props: ButtonProps) {
  return (
    <div className='flex space-x-4'>
      <Button className='min-w-max' {...props}>
        Text Only
      </Button>
      <Button className='min-w-max' leftIcon={BiPlus} {...props}>
        Text Only
      </Button>
      <Button className='min-w-max' rightIcon={BiPlus} {...props}>
        Text Only
      </Button>
      <Button className='min-w-max' icon={BiPlus} {...props} />
    </div>
  );
}

function ButtonVariant(props: ButtonProps) {
  return (
    <div className='space-y-4'>
      <ButtonSet variant='primary' {...props} />
      <ButtonSet variant='secondary' {...props} />
      <ButtonSet variant='warning' {...props} />
      <ButtonSet variant='danger' {...props} />
    </div>
  );
}

function ButtonColumn(props: ButtonProps) {
  return (
    <div className='space-y-8'>
      <ButtonVariant {...props} />
      <ButtonVariant disabled {...props} />
      <ButtonVariant isLoading {...props} />
    </div>
  );
}
