import Image from 'next/image';
import React from 'react';

import BaseLayout from '@/components/layouts/base';
import NextImage from '@/components/NextImage';

const HeaderSection = () => {
  return (
    <div
      className='min-h-[60vh] md:min-h-[65vh] lg:min-h-[70vh] w-full relative'
      style={{
        background:
          'linear-gradient(101deg, #041C3F 3.31%, #11418B 39.48%, #11418B 98.43%)',
      }}
    >
      <Image
        className='absolute w-full h-[50vh] md:h-[55vh] lg:h-[60vh] -right-96 -top-10'
        src='/images/Ellipse.svg'
        alt='ellipse bg'
        width={0}
        height={0}
        sizes='40vw z-0'
      />
      <Image
        className='absolute w-full h-[60vh] md:h-[65vh] lg:h-[70vh] -left-[38vw] z-0'
        src='/images/line-pattern-head.svg'
        alt='ellipse bg'
        width={0}
        height={0}
        sizes='40vw'
        style={{
          transform: 'rotate(-9deg)',
        }}
      />
      <div className='h-full relative z-[2]'>
        <BaseLayout>
          <div className='min-h-[60vh] md:min-h-[65vh] lg:min-h-[70vh] grid items-center grid-cols-3'>
            <div className='col-span-3 md:col-span-2 flex flex-col gap-3'>
              <h1 className='text-neutral-100 h0'>
                Membentuk <i>Generasi Baru</i>
              </h1>
              <div className='flex gap-4 items-center'>
                <div className='flex flex-col gap-2.5 items-center bg-neutral-100 rounded-full p-[14px]'>
                  <NextImage
                    alt='Logo BI'
                    src='/images/logo-bi-color.png'
                    width={36}
                    height={36}
                  />
                  <NextImage
                    alt='Logo GenBI'
                    src='/images/logo-genbi-color.png'
                    width={38}
                    height={38}
                  />
                </div>
                <div className='flex flex-col gap-3'>
                  <h1 className='text-neutral-100 h0'>Dengan Mencipatakan </h1>
                  <h2 className='text-neutral-100'>Energi Untuk Negeri</h2>
                </div>
              </div>
              <p className='text-lg font-medium text-neutral-100 lg:w-[490px]'>
                Kami <strong>GenBI UPI</strong> hadir untuk mewujudkan perubahan
                nyata. Temukan kisah, prestasi, dan komitmen kami di sini.
              </p>
            </div>

            <div className='col-span-3 md:col-span-1'></div>
          </div>
        </BaseLayout>
      </div>
    </div>
  );
};

export default HeaderSection;
