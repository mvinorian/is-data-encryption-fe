import { useRouter } from 'next/router';
import * as React from 'react';
import { LuBookOpen, LuListChecks, LuListPlus, LuUser } from 'react-icons/lu';

import Button from '@/components/buttons/Button';
import UnstyledLink from '@/components/links/UnstyledLink';
import Typography from '@/components/typography/Typography';
import clsxm from '@/lib/clsxm';
import useAuthStore from '@/store/useAuthStore';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const logout = useAuthStore.useLogout();
  const user = useAuthStore.useUser();
  const isAuthenticated = useAuthStore.useIsAuthenticated();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  return (
    <main>
      <main className='flex min-h-screen w-full'>
        <section className='fixed hidden h-screen w-2/12 flex-col justify-between bg-teal-600 px-8 py-16 md:flex'>
          <div className='space-y-6'>
            <div className='flex items-center justify-center gap-3'>
              <LuBookOpen className='h-9 w-9 text-base-surface' />
              <Typography
                as='h5'
                variant='h5'
                className='text-base-surface font-semibold'
              >
                Tamiyochi
              </Typography>
            </div>

            <div className='h-px bg-base-inline'></div>

            <div className='bg-teal-500 py-1.5 px-6 rounded-md'>
              <Typography
                as='p'
                variant='p'
                className={clsxm(
                  'text-base-surface truncate',
                  user && isAuthenticated ? user.email : 'text-transparent'
                )}
              >
                {user && isAuthenticated ? user.email : 'Placeholder'}
              </Typography>
            </div>

            <div className='h-px bg-base-inline'></div>

            <div className='space-y-3'>
              <UnstyledLink
                href={
                  router.asPath.includes('add-data')
                    ? ''
                    : '/dashboard/add-data'
                }
                className='block'
              >
                <Typography
                  className={clsxm(
                    router.asPath.includes('add-data') && 'bg-teal-500',
                    'px-3 py-1.5 rounded-md text-base-surface font-medium flex gap-3 items-center',
                    'hover:bg-teal-500 transition-colors'
                  )}
                >
                  <LuListPlus className='w-6 h-6' />
                  Add Data
                </Typography>
              </UnstyledLink>

              <UnstyledLink
                href={
                  router.asPath.includes('list-data')
                    ? ''
                    : '/dashboard/list-data'
                }
                className='block'
              >
                <Typography
                  className={clsxm(
                    router.asPath.includes('list-data') && 'bg-teal-500',
                    'px-3 py-1.5 rounded-md text-base-surface font-medium flex gap-3 items-center',
                    'hover:bg-teal-500 transition-colors'
                  )}
                >
                  <LuListChecks className='w-6 h-6' />
                  List Data
                </Typography>
              </UnstyledLink>

              <UnstyledLink
                href={
                  router.asPath.includes('request-data')
                    ? ''
                    : '/dashboard/request-data'
                }
                className='block'
              >
                <Typography
                  className={clsxm(
                    router.asPath.includes('request-data') && 'bg-teal-500',
                    'px-3 py-1.5 rounded-md text-base-surface font-medium flex gap-3 items-center',
                    'hover:bg-teal-500 transition-colors'
                  )}
                >
                  <LuUser className='w-6 h-6' />
                  Request Data
                </Typography>
              </UnstyledLink>

              <UnstyledLink
                href={
                  router.asPath.includes('requesting-user')
                    ? ''
                    : '/dashboard/requesting-user'
                }
                className='block'
              >
                <Typography
                  className={clsxm(
                    router.asPath.includes('requesting-user') && 'bg-teal-500',
                    'px-3 py-1.5 rounded-md text-base-surface font-medium flex gap-3 items-center',
                    'hover:bg-teal-500 transition-colors'
                  )}
                >
                  <LuUser className='w-6 h-6' />
                  Requesting User
                </Typography>
              </UnstyledLink>
            </div>
          </div>

          <Button type='button' onClick={handleLogout}>
            Log Out
          </Button>
        </section>

        <section className='flex w-full flex-row-reverse bg-base-light'>
          <div className='w-full md:w-10/12 min-h-screen p-16 space-y-8'>
            {children}
          </div>
        </section>
      </main>
    </main>
  );
}
