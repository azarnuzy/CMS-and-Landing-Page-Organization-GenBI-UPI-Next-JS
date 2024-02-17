'use client';

import Image from 'next/image';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import './index.css';

import { useGetActiveManagements } from '@/hooks/managements/hook';

import BaseLayout from '@/components/layouts/base';

import { activeManagementsState } from '@/recoils/managements/atom';

const ContentSection = () => {
  const { data } = useGetActiveManagements();

  const [activeManagements, setActiveManagements] = useRecoilState(
    activeManagementsState
  );

  useEffect(() => {
    if (data) {
      setActiveManagements(data?.data);
    }
  }, [data, setActiveManagements]);

  return (
    <div className='py-10 relative'>
      <Image
        src='/svg/line-pattern-about-genbi-upi.svg'
        width={0}
        height={0}
        sizes='50vw'
        alt='line pattern'
        className='w-full top-[30%] absolute -z-10 object-cover'
      />
      <BaseLayout>
        <div className='flex flex-none flex-col sm:flex-row gap-4  sm:gap-14'>
          <div className='relative w-fit h-full bg-neutral-100 shadow-md border p-4 rounded-3xl'>
            <video
              src={activeManagements?.management?.video?.file_url}
              loop
              controls
              className='w-[390px] rounded-3xl h-full'
            ></video>
          </div>
          <div className='flex flex-col gap-14 w-fit'>
            <div className='flex flex-col gap-6'>
              <h1 className='text-neutral-main'>
                Kenali <span className='text-primary-main'>GenBI UPI</span>
              </h1>
              <div
                className='text-neutral-600 content-dangerously'
                dangerouslySetInnerHTML={{
                  __html: activeManagements?.management?.description || '',
                }}
              ></div>
            </div>
            <div className='flex flex-col gap-6'>
              <h1 className='text-end text-neutral-main'>Visi & Misi</h1>
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
                  <div
                    className='content-dangerously'
                    dangerouslySetInnerHTML={{
                      __html: activeManagements?.management?.vision || '',
                    }}
                  ></div>
                </div>
              </div>
              <div className='rounded-3xl p-6 flex flex-col gap-4 justify-center bg-neutral-100 text-neutral-600 shadow-md border'>
                <h2 className='text-start'>Misi</h2>
                <div className='flex flex-col gap-4 w-full'>
                  {activeManagements?.management?.mission.map((item, index) => (
                    <div
                      className='rounded-2xl bg-neutral-100 border border-neutral-300 p-4 flex gap-4 items-center w-full'
                      key={index}
                    >
                      <div
                        className='content-dangerously'
                        dangerouslySetInnerHTML={{
                          __html: item || '',
                        }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </BaseLayout>
    </div>
  );
};

export default ContentSection;
