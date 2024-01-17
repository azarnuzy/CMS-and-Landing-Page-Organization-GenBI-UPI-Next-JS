import Image from 'next/image';
import React from 'react';

import { BreadCrumb } from '@/components/breadcrumbs';
import BaseLayout from '@/components/layouts/base';

import { breadCrumbGenBIBanggaData } from '@/modules/about-genbi/upi/bangga/constant';

const HeaderGenBIBanggaSection = () => {
  return (
    <div
      className='h-[336px] relative flex items-center gap-4'
      style={{
        background:
          'linear-gradient(90deg, #275FBC 2.82%, rgba(25, 109, 247, 0.00) 98.46%)',
      }}
    >
      <Image
        src='/images/all-members-genbi.png'
        alt='bg-shape-header-about'
        width={0}
        height={0}
        className='absolute top-0 right-0 object-cover object-right-bottom w-full h-full -z-[10] blur '
        sizes='100vw'
      />
      <BaseLayout>
        <div className='relative z-[1]'>
          <BreadCrumb
            items={breadCrumbGenBIBanggaData}
            textColor='text-neutral-100'
          />
          <div className='flex flex-col gap-4'>
            <h1 className='text-neutral-100'>
              GenBI
              <span className='text-warning-main'> Bangga</span>{' '}
            </h1>
            <p className='text-neutral-100 text-lg'>
              Kami selalu mengapresiasi segala prestasi dari para penerima
              beasiswa Bank Indonesia UPI.
            </p>
          </div>
        </div>
      </BaseLayout>
    </div>
  );
};

export default HeaderGenBIBanggaSection;
