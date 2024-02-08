'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { toast } from 'sonner';
import { z } from 'zod';

import { ValidationSchemaLoginForm } from '@/lib/validations/login';

import BaseLayout from '@/components/layouts/base';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { TextField } from '@/components/ui/text-field';

const LoginSection = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof ValidationSchemaLoginForm>>({
    resolver: zodResolver(ValidationSchemaLoginForm),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = (data: z.infer<typeof ValidationSchemaLoginForm>) => {
    toast.success(`Login Success. Welcome ${data.username}`);
    router.push('/admin');
  };

  return (
    <BaseLayout>
      <div className='min-h-[calc(100vh-64px)] py-10'>
        <Link href='/' className='text-neutral-600 flex gap-1 items-center'>
          <IoIosArrowRoundBack className='text-2xl' />
          <p>Back to Main Page</p>
        </Link>
        <div className='min-h-[calc(100vh-64px-80px-24px)] flex items-center justify-center'>
          <div className='flex items-center justify-center rounded-xl shadow-md py-8 px-10 mx-auto w-fit flex-col gap-6'>
            <div className='flex flex-col gap-2 items-center'>
              <div className='flex gap-4 items-center'>
                <Image
                  src='/images/logo-bi-color.png'
                  width={30}
                  height={30}
                  alt='logo-bi'
                />
                <Image
                  src='/images/logo-genbi-color.png'
                  width={30}
                  height={30}
                  alt='logo-bi'
                />
                <p className='text-primary-main font-bold'>GenBI UPI</p>
              </div>
              <h3 className='text-primary-900'>Dashboard Admin</h3>
            </div>
            <div className='flex flex-col gap-4'>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='flex flex-col gap-4 w-full order-2 sm:order-1'
                >
                  <div className='flex flex-col '>
                    <TextField
                      type='text'
                      variant='md'
                      control={form.control}
                      name='username'
                      placeholder='Username'
                      label='Username'
                      status={form.formState.errors.username ? 'error' : 'none'}
                      message={form.formState.errors.username?.message}
                      required
                    />
                    <TextField
                      type='password'
                      variant='md'
                      control={form.control}
                      name='password'
                      placeholder='Password'
                      label='Password'
                      status={form.formState.errors.password ? 'error' : 'none'}
                      message={form.formState.errors.password?.message}
                      required
                    />
                    <Button
                      type='submit'
                      variant='default'
                      className='rounded-full bg-primary-main text-white w-[360px] hover:bg-primary-600 mt-4'
                    >
                      Login
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default LoginSection;
