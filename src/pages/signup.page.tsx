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
import { REG_EMAIL } from '@/constant/regex';
import AuthLayout from '@/layouts/AuthLayout';
import api from '@/lib/api';
import { ApiError, ApiReturn } from '@/types/api';
import { SignUp } from '@/types/entity/auth';

export default function SignUpPage() {
  const [error, setError] = useState('');
  const router = useRouter();

  const methods = useForm<SignUp>();
  const { handleSubmit } = methods;

  const { mutate: handleSignUp, isLoading } = useMutation<
    AxiosResponse<ApiReturn<SignUp>> | void,
    AxiosError<ApiError>,
    SignUp
  >(async (data: SignUp) => {
    const res = await api.post('/user', data);
    return res;
  });

  const onSubmit = (data: SignUp) => {
    handleSignUp(data, {
      onSuccess: () => router.push('/login'),
      onError: (err) => {
        err.response && setError(err.response?.data.message);
      },
    });
  };

  return (
    <AuthLayout>
      <SEO title='Sign Up' description='Sign Up Page' />
      <FormProvider {...methods}>
        <form
          className='w-full max-w-[400px] flex flex-col gap-6'
          onSubmit={handleSubmit(onSubmit)}
        >
          <Typography
            font='montserrat'
            variant='h3'
            weight='bold'
            className='text-teal-600 text-center'
          >
            Sign Up
          </Typography>

          <div className='space-y-3'>
            <Input
              id='email'
              label='Email'
              placeholder='Input your email'
              validation={{
                required: 'Email is required',
                pattern: {
                  value: REG_EMAIL,
                  message: 'Email is not a valid email',
                },
              }}
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
              Sign Up
            </Button>

            <div className='flex gap-1'>
              <Typography
                font='open-sans'
                variant='c'
                className='text-teal-600'
              >
                Already have an account?
              </Typography>
              <UnstyledLink
                href='/login'
                className='self-end underline text-teal-400 hover:text-teal-600'
              >
                <Typography font='open-sans' variant='c' weight='semibold'>
                  Login
                </Typography>
              </UnstyledLink>
            </div>
          </div>
        </form>
      </FormProvider>
    </AuthLayout>
  );
}
