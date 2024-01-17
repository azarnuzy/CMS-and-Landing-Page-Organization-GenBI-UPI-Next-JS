'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import React from 'react';

import { BreadCrumb } from '@/components/breadcrumbs';
import BaseLayout from '@/components/layouts/base';

import {
  BreadcrumbDepartmentData,
  translateImage,
  translateTitleDepartment,
} from '@/modules/about-genbi/upi/department/constant';

const HeaderDepartmentSection = () => {
  const { department } = useParams();

  return (
    <div
      className='h-[336px] relative flex items-center gap-4'
      style={{
        background:
          'linear-gradient(90deg, #275FBC 2.82%, rgba(25, 109, 247, 0.00) 98.46%)',
      }}
    >
      <Image
        src={`/images/${translateImage(department as string)}`}
        alt='bg-shape-header-about'
        width={0}
        height={0}
        className='absolute top-0 right-0 object-cover object-right-bottom w-full h-full -z-[1] transform scale-x-110 blur'
        sizes='100vw'
      />
      <BaseLayout>
        <div className='relative z-[1]'>
          <BreadCrumb
            items={BreadcrumbDepartmentData(department as string)}
            textColor='text-neutral-100'
          />
          <h1 className='text-neutral-100'>
            <span className='text-warning-main'>
              {translateTitleDepartment(department as string)}
            </span>{' '}
            Department
          </h1>
        </div>
      </BaseLayout>
    </div>
  );
};

export default HeaderDepartmentSection;
