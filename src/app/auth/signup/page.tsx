'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { ApiError } from 'next/dist/server/api-utils';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import Typography from '@/components/typography';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import api, { ApiReturn } from '@/lib/api';

const SignUpSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required!' })
    .email('Must be a valid email!'),
  password: z
    .string()
    .min(1, { message: 'Password is required!' })
    .min(4, { message: 'Password must be at least 4 characters!' }),
});

export default function LoginPage() {
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
  });

  const { mutate: handleSignUp } = useMutation<
    AxiosResponse<ApiReturn<z.infer<typeof SignUpSchema>>> | void,
    AxiosError<ApiError>,
    z.infer<typeof SignUpSchema>
  >(async (data) => await api.post('/user', data));

  const onSubmit = (data: z.infer<typeof SignUpSchema>) => {
    handleSignUp(data);
  };

  return (
    <div className='flex h-full items-center justify-center'>
      <div className='w-2/3 space-y-4'>
        <Typography
          as='h1'
          variant='h1'
          className='w-full text-center text-slate-900'
        >
          Sign Up
        </Typography>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='w-full space-y-4'
          >
            <div className='w-full space-y-3'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type='email'
                        placeholder='cute_mammal@example.com'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='cuteMammal123'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='space-y-3'>
              <Button type='submit' className='w-full'>
                Create an account
              </Button>
              <div className='flex justify-center gap-1'>
                <Typography as='p' variant='detail'>
                  Already have an account?
                </Typography>
                <Link href='/auth/login'>
                  <Typography as='p' variant='small' className='underline'>
                    Log In
                  </Typography>
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
