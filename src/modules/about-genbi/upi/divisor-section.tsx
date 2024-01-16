import Image from 'next/image';
import React from 'react';

import BaseLayout from '@/components/layouts/base';

const DivisorSection = () => {
  return (
    <div
      className='w-full h-[245px] relative mb-10'
      style={{
        background:
          'linear-gradient(90deg, #1867C9 0%, #7CA2D1 50.64%, rgba(217, 217, 217, 0.00) 98.58%)',
      }}
    >
      <Image
        src='/images/genbi-formation.png'
        width={0}
        height={0}
        alt='genbi formation'
        className='absolute top-0 -right-40 w-full h-full object-cover -z-[1]'
        sizes='50vw'
      />

      <BaseLayout>
        <div className='flex items-start justify-center flex-col h-[245px]'>
          <h1 className='text-neutral-100'>Struktur Komunitas</h1>
          <h1 className='text-warning-main'>GenBI UPI</h1>
        </div>
      </BaseLayout>
    </div>
  );
};

export default DivisorSection;
