'use client';

import { zodResolver } from '@hookform/resolvers/zod';
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

const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required!' })
    .email('Must be a valid email!'),
  password: z.string().min(1, { message: 'Password is required!' }),
});

export default function LoginPage() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    console.log(data);
  };

  return (
    <div className='flex h-full items-center justify-center'>
      <div className='w-2/3 space-y-4'>
        <Typography
          as='h1'
          variant='h1'
          className='w-full text-center text-slate-900'
        >
          Login
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
                Login to your account
              </Button>
              <div className='flex justify-center gap-1'>
                <Typography as='p' variant='detail'>
                  Don&apos;t have an account?
                </Typography>
                <Link href='/auth/signup'>
                  <Typography as='p' variant='small' className='underline'>
                    Sign Up
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
