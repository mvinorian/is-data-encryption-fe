import { HiOutlineInformationCircle } from 'react-icons/hi';

import Typography from '@/components/typography/Typography';

export default function HelperText({ children }: { children: string }) {
  return (
    <div className='flex space-x-1'>
      <HiOutlineInformationCircle className='shrink-0 text-teal' />
      <Typography variant='c' className='!leading-tight text-base-primary'>
        {children}
      </Typography>
    </div>
  );
}
