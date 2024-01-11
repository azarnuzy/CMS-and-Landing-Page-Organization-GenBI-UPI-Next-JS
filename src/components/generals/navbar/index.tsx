'use client';

import React from 'react';
import { FaChevronDown } from 'react-icons/fa';

import Button from '@/components/buttons/Button';
import BaseLayout from '@/components/layouts/base';
import NextImage from '@/components/NextImage';
const Navbar = () => {
  return (
    <nav
      className='w-full fixed top-0 left-0 z-50 h-16 flex justify-center items-center backdrop-blur-xl'
      style={{
        background: 'rgba(255, 255, 255, 0.15)',
        // backdropFilter: 'blur(25px)',
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
              src='/images/logo-genbi.png'
              width={38}
              height={38}
            />
            <h5 className='text-2xl text-neutral-100 font-bold tracking-wider'>
              GenBI UPI
            </h5>
          </div>
          <div className='flex gap-6 items-center'>
            <span className='text-neutral-100 text-lg font-semibold '>
              Berita
            </span>
            <span className='text-neutral-100 text-lg font-semibold flex gap-2 items-center'>
              Tentang Kami <FaChevronDown className='text-sm' />
            </span>
            <span className='text-neutral-100 text-lg font-semibold '>
              Kegiatan
            </span>
            <span className='text-neutral-100 text-lg font-semibold '>
              Galeri
            </span>
          </div>
          <Button variant='primary' size='base'>
            Masuk
          </Button>
        </div>
      </BaseLayout>
    </nav>
  );
};

export default Navbar;
