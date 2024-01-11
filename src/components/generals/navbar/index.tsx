'use client';

import React from 'react';

import BaseLayout from '@/components/layouts/base';
import NextImage from '@/components/NextImage';

const Navbar = () => {
  return (
    <nav
      className='w-full fixed top-0 left-0 z-50 h-16 flex justify-center items-center'
      style={{
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(25px)',
      }}
    >
      <BaseLayout>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-4'>
            <NextImage
              alt='Logo BI'
              src='/images/logo-bi.png'
              width={36}
              height={36}
            />
            <NextImage
              alt='Logo GenBI'
              src='/images/logo.png'
              width={36}
              height={36}
            />
            <h5 className='text-2xl text-white font-bold tracking-wider'>
              GenBI UPI
            </h5>
          </div>
        </div>
      </BaseLayout>
    </nav>
  );
};

export default Navbar;
