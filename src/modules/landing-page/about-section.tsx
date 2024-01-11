import Image from 'next/image';
import React from 'react';
import { IoArrowForwardOutline } from 'react-icons/io5';

import BaseLayout from '@/components/layouts/base';

const AboutSection = () => {
  return (
    <div className='min-h-screen w-full pt-40'>
      <div className='h-full relative'>
        <Image
          src='/images/line-pattern-about.svg'
          alt='line pattern'
          width={0}
          height={0}
          sizes='50vw'
          className='w-full rotate-[-22deg] top-0 absolute -z-10'
        />
      </div>
      <BaseLayout>
        <>
          <div className='flex flex-col gap-12'>
            <div className='flex flex-col gap-6'>
              <h1>
                Kenali Lebih Dekat Tentang{' '}
                <span className='text-primary-main'>GenBI UPI</span>
              </h1>
              <p className='text-neutral-600 w-1/2'>
                GenBI (Generasi Baru Indonesia) UPI merupakan komunitas penerima
                beasiswa Bank Indonesia di Universitas Pendidikan Indonesia.
              </p>
              <div className='flex flex-col sm:flex-row items-start sm:items-center gap-6'>
                <button className='bg-primary-main text-white px-6 py-2 rounded-full border border-transparent flex gap-3 items-center hover:bg-primary-600 hover:border-primary-main  duration-300 transition-all ease-in-out'>
                  <span>Tentang GenBI UPI</span>
                  <IoArrowForwardOutline className='text-xl' />{' '}
                </button>
                <button className='bg-neutral-100 border border-primary-main text-primary-main px-6 py-2 rounded-full flex gap-3 items-center hover:bg-primary-600 duration-300 transition-all ease-in-out hover:text-neutral-100'>
                  <span>Tentang Generasi Baru Indonesia</span>
                  <IoArrowForwardOutline className='text-xl' />{' '}
                </button>
              </div>
            </div>
            <div className='flex flex-col sm:flex-row gap-6'>
              <div className='sm:w-[160px] flex flex-row flex-wrap  sm:flex-col gap-3'>
                <div className=' px-3 py-2'>
                  <h2 className='border-l-2  border-primary-main px-3'>120</h2>
                  <p className='text-neutral-600 px-5'>Kegiatan</p>
                </div>
                <div className=' px-3 py-2'>
                  <h2 className='border-l-2  border-primary-main px-3'>90</h2>
                  <p className='text-neutral-600 px-5'>Berita</p>
                </div>
                <div className=' px-3 py-2'>
                  <h2 className='border-l-2  border-primary-main px-3'>11</h2>
                  <p className='text-neutral-600 px-5'>Tahun</p>
                </div>
                <div className=' px-3 py-2'>
                  <h2 className='border-l-2  border-primary-main px-3'>120</h2>
                  <p className='text-neutral-600 px-5'>Pengunjung</p>
                </div>
                <div className=' px-3 py-2'>
                  <h2 className='border-l-2  border-primary-main px-3'>120</h2>
                  <p className='text-neutral-600 px-5'>Penerima</p>
                </div>
              </div>
              <div className='w-full sm:w-[calc(100%-160px-24px)] '>
                <video
                  src='/images/Golden_Lamian_2.mp4'
                  autoPlay
                  loop
                  playsInline
                  muted
                  className='w-full rounded-lg sm:max-h-[550px] '
                ></video>
              </div>
            </div>
          </div>
        </>
      </BaseLayout>
    </div>
  );
};

export default AboutSection;
