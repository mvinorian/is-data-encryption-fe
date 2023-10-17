'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LuBookOpen, LuBookOpenCheck } from 'react-icons/lu';

import Typography from '@/components/typography';

const queryClient = new QueryClient();

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <main className='flex min-h-screen w-full'>
        <section className='fixed hidden h-screen w-1/2 flex-col justify-between bg-slate-800 p-16 md:flex'>
          <div className='flex items-center gap-3'>
            <LuBookOpen className='h-16 w-16 text-slate-50' />
            <Typography as='h1' variant='h1' className='text-slate-50'>
              Tamiyochi
            </Typography>
          </div>

          <div className='flex h-full items-center justify-center'>
            <LuBookOpenCheck className='h-60 w-60 text-slate-50' />
          </div>

          <div className='space-y-3'>
            <Typography as='h3' variant='h3' className='text-slate-50'>
              “This website can encrypt your data with your preferred algorithm
              you can choose”
            </Typography>
            <Typography as='p' variant='p' className='text-slate-50'>
              Vinorian
            </Typography>
          </div>
        </section>

        <section className='flex w-full flex-row-reverse'>
          <div className='w-full md:w-1/2'>{children}</div>
        </section>
      </main>
    </QueryClientProvider>
  );
}
