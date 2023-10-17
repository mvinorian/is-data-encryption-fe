import { Popover } from '@headlessui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { BiShoppingBag } from 'react-icons/bi';
import { BsFillPersonFill } from 'react-icons/bs';

import Button from '@/components/buttons/Button';
import ButtonLink from '@/components/links/ButtonLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import Typography from '@/components/typography/Typography';
import useAuthStore from '@/store/useAuthStore';

export default function Navbar() {
  const logout = useAuthStore.useLogout();
  const user = useAuthStore.useUser();
  const isAuthenticated = useAuthStore.useIsAuthenticated();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/');
  };
  return (
    <header className='fixed top-0 z-[100] w-full'>
      <div className='flex h-[92px] flex-row justify-between items-center px-12 py-6 rounded-b-xl bg-teal-600'>
        <UnstyledLink href='/' className='flex flex-row items-center gap-2'>
          <div className='w-10 h-10'>
            <Image src='/images/logo.png' alt='Logo' width='640' height='640' />
          </div>
          <Typography
            font='montserrat'
            variant='h6'
            weight='bold'
            className='hidden md:block text-base-surface'
          >
            Tamiyochi
          </Typography>
        </UnstyledLink>

        <div className='flex flex-row gap-8 items-center'>
          <UnstyledLink href='/'>
            <Typography
              font='montserrat'
              variant='h6'
              weight='bold'
              className='text-base-surface hover:text-teal-200'
            >
              Koleksi Manga
            </Typography>
          </UnstyledLink>

          {user && isAuthenticated && (
            <UnstyledLink href='/library'>
              <Typography
                font='montserrat'
                variant='h6'
                weight='bold'
                className='text-base-surface hover:text-teal-200'
              >
                Manga Terpinjam
              </Typography>
            </UnstyledLink>
          )}
        </div>

        {user && isAuthenticated ? (
          <div className='flex flex-row gap-8 items-center'>
            <ButtonLink
              href='/cart'
              icon={BiShoppingBag}
              variant='unstyled'
              size='large'
              iconClassName='text-4xl text-base-surface hover:text-teal-200'
            />
            <Popover className='relative'>
              <Popover.Button className='flex justify-center items-center w-11 h-11 bg-base-light rounded-full outline-none'>
                <BsFillPersonFill className='text-base-icon text-3xl' />
              </Popover.Button>
              <Popover.Panel className='absolute max-w-xs right-0 flex flex-col items-center gap-3 mt-3 p-3 bg-base-surface rounded-lg'>
                <div className='flex flex-row gap-1.5 items-center'>
                  <div className='flex justify-center items-center w-8 h-8 bg-base-light rounded-full'>
                    <BsFillPersonFill className='text-base-icon text-xl' />
                  </div>
                  <Typography
                    variant='c'
                    weight='semibold'
                    className='text-teal-600'
                  >
                    {user.nama.split(' ')[0]}
                  </Typography>
                </div>
                <Button
                  variant='danger'
                  className='min-w-max w-full'
                  onClick={handleLogout}
                >
                  Log Out
                </Button>
              </Popover.Panel>
            </Popover>
          </div>
        ) : (
          <div className='flex flex-row gap-6'>
            <ButtonLink
              href='/login'
              size='large'
              variant='primary'
              textClassName='font-secondary'
            >
              Log In
            </ButtonLink>
            <ButtonLink
              href='/signup'
              size='large'
              variant='secondary'
              textClassName='font-secondary'
              className='bg-transparent'
            >
              Sign Up
            </ButtonLink>
          </div>
        )}
      </div>
    </header>
  );
}
