import Image from 'next/image';
import React from 'react';

import BaseLayout from '@/components/layouts/base';

const HeaderAcaraSection = () => {
  return (
    <div className='min-h-[40vh] relative pt-12 pb-48 lg:pb-64'>
      <div
        className='w-[577px] h-[577px] absolute -top-40 -right-48 rounded-full blur-[75px]'
        style={{
          background: 'rgba(189, 219, 240, 0.82)',
        }}
      ></div>
      <div
        className='w-[577px] h-[577px] absolute -bottom-40 -left-48 rounded-full blur-[75px]'
        style={{
          background: 'rgba(250, 210, 164, 0.82)',
        }}
      ></div>
      <BaseLayout>
        <div className='h-[320px] w-full rounded-3xl relative px-6'>
          <Image
            src='/images/marketing.png'
            alt='banner event'
            className='object-cover object-center rounded-3xl w-full h-full relative z-[3]'
            width={0}
            height={0}
            sizes='100vw'
          />
          <Image
            src='/images/marketing.png'
            alt='banner event'
            className='w-1/2 h-[230px] object-cover object-center rounded-3xl absolute -top-16 translate-y-1/2 left-0 transform -translate-x-14 -z-[1]'
            width={0}
            height={0}
            sizes='50vw'
          />
          <Image
            src='/images/marketing.png'
            alt='banner event'
            className='w-1/2 h-[230px] object-cover object-center rounded-3xl absolute -top-16 translate-y-1/2 right-0 transform translate-x-14 -z-[1]'
            width={0}
            height={0}
            sizes='50vw'
          />
        </div>
      </BaseLayout>
    </div>
  );
};

export default HeaderAcaraSection;
