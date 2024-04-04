'use client';

import Image from 'next/image';
import React from 'react';
import { useRecoilState } from 'recoil';

import BaseLayout from '@/components/layouts/base';

import { activeManagementsState } from '@/recoils/managements/atom';

const HeaderUpiSection = () => {
  // const { data } = useGetManagement('23.24');

  // const { setDataManagement } = useManagementDataState();

  const [activeManagements] = useRecoilState(activeManagementsState);

  // useEffect(() => {
  //   if (data) {
  //     setDataManagement(data?.data);
  //   }
  // }, [data, setDataManagement]);

  return (
    <div className='min-h-[50vh] relative'>
      <Image
        src='/images/header-about-upi-bg.png'
        width={0}
        height={0}
        alt='bg-shape-header-about'
        className='absolute top-0 -left-0 object-cover w-full h-full z-0 object-right-bottom'
        sizes='100vw'
      />
      <BaseLayout>
        <div className=' grid grid-cols-5 gap-4 pt-10 '>
          <div className='flex flex-col gap-4 relative z-[1] md:col-span-3 col-span-5 justify-center'>
            <div className='flex gap-4 items-center'>
              <div className='flex flex-col gap-4 justify-center bg-neutral-100 rounded-full p-[14px] '>
                <Image
                  alt='Logo BI'
                  src='/images/logo-bi-color.png'
                  width={36}
                  height={36}
                />
                <Image
                  alt='Logo GenBI'
                  src='/images/logo-genbi-color.png'
                  width={38}
                  height={38}
                />
              </div>
              <div className='flex flex-col gap-1 max-w-[50%] sm:max-w-full'>
                <h1 className='text-neutral-100 h0'>GenBI UPI </h1>
                <h2 className='text-neutral-100'>Generasi Baru Indonesia</h2>
                <h2 className='text-neutral-100'>
                  Universitas Pendidikan Indonesia
                </h2>
              </div>
            </div>
          </div>
          <div className='p-4 rounded-3xl w-full h-full bg-neutral-100 shadow-md relative z-[1] md:col-span-2 col-span-5'>
            <Image
              src={
                activeManagements?.management?.photo?.file_url ||
                '/images/genbi-upi-header.png'
              }
              width={0}
              height={0}
              alt={
                activeManagements?.management?.photo?.caption || 'about header'
              }
              className='w-full h-full object-cover rounded-3xl bg-primary-main'
              sizes='50vw'
            />
          </div>
        </div>
      </BaseLayout>
    </div>
  );
};

export default HeaderUpiSection;
