import { HiOutlineExclamationCircle } from 'react-icons/hi';

import Typography from '@/components/typography/Typography';

export default function ErrorMessage({ children }: { children: string }) {
  return (
    <div className='flex space-x-1'>
      <HiOutlineExclamationCircle className='shrink-0 text-red-200' />
      <Typography variant='c' className='!leading-tight text-base-primary'>
        {children}
      </Typography>
    </div>
  );
}
