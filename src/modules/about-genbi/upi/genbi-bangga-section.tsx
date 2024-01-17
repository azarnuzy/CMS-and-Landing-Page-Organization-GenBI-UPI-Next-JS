import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IoArrowForwardOutline } from 'react-icons/io5';

import BaseLayout from '@/components/layouts/base';

const GenbiBanggaSection = () => {
  return (
    <div className='w-full min-h-[40vh] relative'>
      <Image
        src='/images/genbi-bangga-bg.png'
        alt='genbi bangga'
        width={0}
        height={0}
        className='absolute top-0 left-0  object-right w-5/6  h-full object-cover -z-[1]'
        sizes='60vw'
      />
      <BaseLayout>
        <div className='flex justify-center pt-[10vh] 2xl:pr-[8vw] flex-col items-end gap-14 h-full'>
          <div className='flex flex-col gap-2 items-end max-w-[200px] sm:max-w-full'>
            <h1>
              GenBI <span className='text-warning-main'>Bangga</span>
            </h1>
            <p className='text-lg text-neutral-600 '>
              Apresiasi untuk Anggota Berprestasi
            </p>
          </div>
          <Link
            href='/tentang-genbi/upi/bangga'
            className='bg-primary-main text-white px-6 py-2 rounded-full border border-transparent flex gap-3 items-center hover:bg-primary-600 hover:border-primary-main  duration-300 transition-all ease-in-out '
          >
            <span>Lihat Selengkapnya</span>
            <IoArrowForwardOutline className='text-xl' />{' '}
          </Link>
        </div>
      </BaseLayout>
    </div>
  );
};

export default GenbiBanggaSection;
