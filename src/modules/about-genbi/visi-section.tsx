'use client';

import Image from 'next/image';
import React from 'react';

import BaseLayout from '@/components/layouts/base';

import { misiData } from '@/modules/landing-page/about-section';

const VisiSection = () => {
  return (
    <div className='min-h-[50vh] w-full  relative'>
      <div className='h-full relative'>
        <Image
          src='/images/line-pattern-about.svg'
          alt='line pattern'
          width={0}
          height={0}
          sizes='50vw'
          className='w-full rotate-[-22deg] top-0 absolute -z-10 object-cover'
        />
        <BaseLayout>
          <div className='flex flex-col gap-4 pb-10'>
            <h1 className='text-center text-neutral-main'>
              Visi & Misi <span className='text-primary-main'>GenBI UPI</span>{' '}
            </h1>
            <div className='rounded-3xl p-6 flex gap-4 items-center bg-neutral-100 text-neutral-600 shadow-md border'>
              <Image
                src='/images/icon-visi.png'
                width={56}
                height={56}
                sizes='50vw'
                alt='icon visi w-14 h-14'
              />
              <div className='flex flex-col gap-2 w-fit'>
                <h2>Visi</h2>
                <p>
                  GenBI sebagai wadah eksplorasi diri serta menjadi mediator BI
                  untuk menyebarkan kebermanfaatan kepada masyarakat.
                </p>
              </div>
            </div>
            <div className='rounded-3xl p-6 flex flex-col gap-4 justify-center bg-neutral-100 text-neutral-600 shadow-md border'>
              <h2 className='text-start'>Misi</h2>
              <div className='flex flex-col gap-4 w-full'>
                {misiData.map((item, index) => (
                  <div
                    className='rounded-2xl bg-neutral-100 border border-neutral-300 p-4 flex gap-4 items-center w-full'
                    key={index}
                  >
                    <div className={`p-1.5 ${item.color} rounded-md`}>
                      {item.icon}
                    </div>
                    <p className='text-neutral-600'>{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </BaseLayout>
      </div>
    </div>
  );
};

export default VisiSection;
