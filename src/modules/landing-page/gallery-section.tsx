import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IoArrowForwardOutline } from 'react-icons/io5';

import BaseLayout from '@/components/layouts/base';

const GallerySection = () => {
  return (
    <div
      className='w-full min-h-[40vh] py-14'
      style={{
        background: 'linear-gradient(180deg, #11418B 0%, #021D47 98%)',
      }}
    >
      <BaseLayout>
        <div className='gap-4 flex flex-col justify-center items-center'>
          <div className='flex flex-nowrap gap-6 justify-center'>
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className='w-[94px] h-[324px] rounded-xl bg-white shadow-md hover:w-[254px] transition-all duration-300 ease-in-out'
              >
                <Image
                  src={`/images/hero-${i + 1}.webp`}
                  width={0}
                  height={0}
                  alt='gallery-1'
                  className='rounded-lg object-cover w-full h-full'
                  sizes='40vw'
                />
              </div>
            ))}
          </div>
          <Link
            href='/'
            className='text-white px-4 py-2 bg-transparent flex gap-1 border items-center border-neutral-100 w-fit rounded-full hover:bg-neutral-100 hover:text-primary-main transition-all duration-300 ease-in-out font-medium'
          >
            <span>Lihat Galeri GenBI</span> <IoArrowForwardOutline />{' '}
          </Link>
        </div>
      </BaseLayout>
    </div>
  );
};

export default GallerySection;
