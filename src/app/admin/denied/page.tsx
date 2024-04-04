'use client';

import { signOut } from 'next-auth/react';
import React from 'react';
import { RiAlarmWarningFill } from 'react-icons/ri';

import { Button } from '@/components/ui/button';

const DeniedAdminPage = () => {
  return (
    <main>
      <section className='bg-white'>
        <div className='layout flex min-h-screen flex-col items-center justify-center text-center text-black'>
          <RiAlarmWarningFill
            size={60}
            className='drop-shadow-glow animate-flicker text-red-500'
          />
          <h1>Access Denied</h1>
          <h4>
            You are logged in, but you do not have the required access level to
            view this page.
          </h4>
          <Button
            onClick={() => {
              signOut({ callbackUrl: '/login' });
            }}
            variant='default'
            className='mt-4'
          >
            <span>Return to Login</span>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default DeniedAdminPage;
