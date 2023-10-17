import * as React from 'react';

import AuthIllustration from '@/pages/auth/container/AuthIllustration';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='flex min-h-screen w-full bg-base-surface'>
      <section className='hidden md:flex fixed w-full h-screen p-3 pointer-events-none'>
        <div className='w-1/3 min-w-[400px] h-full' />
        <div className='w-2/3 h-full'>
          <AuthIllustration />
        </div>
      </section>

      <section className='flex items-center justify-center w-full md:w-1/3 md:min-w-[400px] px-8 py-12'>
        {children}
      </section>
    </main>
  );
}
