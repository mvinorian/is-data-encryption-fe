import Image from 'next/image';

import clsxm from '@/lib/clsxm';

export default function AuthIllustration() {
  return (
    <div
      className={clsxm(
        'relative flex justify-between items-stretch',
        'w-full h-full p-6',
        'rounded-xl bg-teal-600'
      )}
    >
      <div className='flex items-end h-full '>
        <Image
          src='/images/auth/bg-left-decoration.png'
          alt='left decoration'
          width='200'
          height='468'
          className='h-1/2 w-fit object-contain object-left-bottom'
        />
      </div>

      <div className='flex justify-center h-full'>
        <Image
          src='/images/logo.png'
          alt='logo'
          width='320'
          height='320'
          className='w-1/2 min-w-[200px] object-contain'
        />
      </div>

      <div className='flex flex-row-reverse items-start h-full'>
        <Image
          src='/images/auth/bg-right-decoration.png'
          alt='right decoration'
          width='200'
          height='468'
          className='h-1/2 w-fit object-contain object-right-top'
        />
      </div>
    </div>
  );
}
