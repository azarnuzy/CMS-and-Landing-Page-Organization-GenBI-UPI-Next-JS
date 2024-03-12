'use client';

import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { useGetDetailAwardee } from '@/hooks/awardee/hook';

import { BreadCrumb } from '@/components/breadcrumbs';
import BaseLayout from '@/components/layouts/base';

import { breadcrumbDetailAwardeeData } from '@/modules/admin/awardee/detail/constant';
import { awardeesDataDetailState } from '@/recoils/admin/awardees/atom';

const HeaderDetailAwardeeAdminSection = ({ id }: { id: string }) => {
  const { data } = useGetDetailAwardee({ id: Number(id) });

  const [, setDetailAwardee] = useRecoilState(awardeesDataDetailState);

  useEffect(() => {
    if (data) {
      setDetailAwardee(data.data);
    }
  }, [data, setDetailAwardee]);
  return (
    <BaseLayout>
      <div className='flex flex-col  border-b pb-5'>
        <BreadCrumb
          items={breadcrumbDetailAwardeeData(id)}
          textColor='text-primary-main'
        />
        <div className='flex flex-col lg:flex-row justify-between lg:items-center gap-y-4'>
          <h3 className='text-primary-900'>Data Detail Awardee</h3>
          <div className='flex gap-4 items-center'></div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default HeaderDetailAwardeeAdminSection;
