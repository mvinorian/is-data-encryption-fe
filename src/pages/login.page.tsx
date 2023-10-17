import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Button from '@/components/buttons/Button';
import Input from '@/components/form/Input';
import UnstyledLink from '@/components/links/UnstyledLink';
import SEO from '@/components/SEO';
import Typography from '@/components/typography/Typography';
import AuthLayout from '@/layouts/AuthLayout';
import api from '@/lib/api';
import { setToken } from '@/lib/cookies';
import useAuthStore from '@/store/useAuthStore';
import { ApiError, ApiReturn } from '@/types/api';
import { LogIn } from '@/types/entity/auth';
import { User } from '@/types/entity/user';

export default function LoginPage() {
  const [error, setError] = useState('');
  const router = useRouter();

  const methods = useForm<LogIn>();
  const { handleSubmit } = methods;

  const login = useAuthStore.useLogin();

  const { mutate: handleLogin, isLoading } = useMutation<
    AxiosResponse<ApiReturn<LogIn>> | void,
    AxiosError<ApiError>,
    LogIn
  >({
    mutationFn: async (data) => {
      const res = await api.post('/user/login', data);

      const { token } = res.data.data;
      setToken(token);

      const user = await api.get<ApiReturn<User>>('/user/me');

      if (!user.data.data) {
        throw new Error('Sesi login tidak valid');
      }
      login({ ...user.data.data, token });
    },
  });

  const onSubmit = (data: LogIn) => {
    handleLogin(data, {
      onSuccess: () => router.push('/dashboard/add-data'),
      onError: (err) => {
        err.response && setError(err.response?.data.errors);
      },
    });
  };

  return (
    <AuthLayout>
      <SEO title='Login' description='Login Page' />
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='w-full max-w-[400px] flex flex-col gap-6'
        >
          <Typography
            font='montserrat'
            variant='h3'
            weight='bold'
            className='text-teal-600 text-center'
          >
            Log In
          </Typography>

          <div className='space-y-3'>
            <Input
              id='email'
              label='Email'
              placeholder='Input your email'
              validation={{ required: 'Email is required' }}
            />

            <Input
              id='password'
              type='password'
              label='Password'
              placeholder='Input your password'
              validation={{ required: 'Password is required' }}
            />
          </div>
          <div className='flex flex-col items-center gap-1.5'>
            {error && (
              <Button
                size='small'
                variant='danger'
                className='pointer-events-none w-full bg-opacity-80'
              >
                {error}
              </Button>
            )}
            <Button
              type='submit'
              className='w-full'
              textClassName='font-secondary'
              isLoading={isLoading}
            >
              Log In
            </Button>

            <div className='flex gap-1'>
              <Typography
                font='open-sans'
                variant='c'
                className='text-teal-600'
              >
                Don&apos;t have an account?
              </Typography>
              <UnstyledLink
                href='/signup'
                className='self-end underline text-teal-400 hover:text-teal-600'
              >
                <Typography font='open-sans' variant='c' weight='semibold'>
                  Sign Up
                </Typography>
              </UnstyledLink>
            </div>
          </div>
        </form>
      </FormProvider>
    </AuthLayout>
  );
}
