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

const SignUpSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required!' })
    .email('Must be a valid email!'),
  username: z.string().min(1, { message: 'Username is required!' }),
  password: z
    .string()
    .min(1, { message: 'Password is required!' })
    .min(4, { message: 'Password must be at least 4 characters!' }),
});

export default function LoginPage() {
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = (data: z.infer<typeof SignUpSchema>) => {
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
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input type='text' placeholder='cute_mammal' {...field} />
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
