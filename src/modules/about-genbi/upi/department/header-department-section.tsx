'use client';

import Image from 'next/image';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import logger from '@/lib/logger';
import { useGetDepartmentById } from '@/hooks/departments/hook';

import { BreadCrumb } from '@/components/breadcrumbs';
import BaseLayout from '@/components/layouts/base';

import { BreadcrumbDepartmentData } from '@/modules/about-genbi/upi/department/constant';
import { departmentDataState } from '@/recoils/departments/atom';

const HeaderDepartmentSection = ({ id }: { id: string }) => {
  logger(id);
  const { data } = useGetDepartmentById({ id });

  const [departmentData, setDepartmentData] =
    useRecoilState(departmentDataState);

  useEffect(() => {
    if (data) {
      setDepartmentData(data?.data);
    }
  }, [data, setDepartmentData]);

  return (
    <div
      className='h-[336px] relative flex items-center gap-4'
      style={{
        background:
          'linear-gradient(90deg, #275FBC 2.82%, rgba(25, 109, 247, 0.00) 98.46%)',
      }}
    >
      <Image
        src={
          departmentData?.department?.cover?.file_url || '/images/marketing.png'
        }
        alt={departmentData?.department?.cover?.alt || 'bg-shape-header-about'}
        width={0}
        height={0}
        className='absolute top-0 right-0 object-cover object-right-bottom w-full h-full -z-[1] transform scale-x-110 blur'
        sizes='100vw'
      />
      <BaseLayout>
        <div className='relative z-[1]'>
          <BreadCrumb
            items={BreadcrumbDepartmentData(
              departmentData?.department?.name || 'Marketing'
            )}
            textColor='text-neutral-100'
          />
          <h1 className='text-neutral-100'>
            <span className='text-warning-main'>
              {departmentData?.department?.name || 'Marketing'}
            </span>{' '}
            Department
          </h1>
        </div>
      </BaseLayout>
    </div>
  );
};

export default HeaderDepartmentSection;
