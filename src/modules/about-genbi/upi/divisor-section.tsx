'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import logger from '@/lib/logger';
import {
  useGetActiveManagements,
  useGetManagementsById,
  useGetOptionManagements,
} from '@/hooks/managements/hook';

import BaseLayout from '@/components/layouts/base';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  activeManagementsState,
  selectedOptionManagementState,
} from '@/recoils/managements/atom';

const DivisorSection = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { data } = useGetOptionManagements();

  const { data: dataActiveManagements } = useGetActiveManagements();
  const { data: dataById, refetch } = useGetManagementsById({
    id: Number(searchParams.get('period')) || 5,
  });

  const [, setSelectedOption] = useRecoilState(selectedOptionManagementState);

  const [, setActiveManagements] = useRecoilState(activeManagementsState);

  const handleChange = (e: string) => {
    logger(e);
    setSelectedOption(Number(e));
    router.replace(`/tentang-genbi/upi?period=${e}`, { scroll: false });
    refetch();
  };

  useEffect(() => {
    if (dataActiveManagements && dataById) {
      if (searchParams.get('period')) {
        setActiveManagements(dataById?.data);
      } else {
        setActiveManagements(dataActiveManagements?.data);
      }
    }
  }, [dataActiveManagements, dataById, searchParams, setActiveManagements]);

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
      <Image
        src='/svg/line-pattern-header-divisor.svg'
        width={0}
        height={0}
        alt='line pattern'
        className='absolute top-0 left-0 w-1/2 h-full object-cover z-[0]'
        sizes='50vw'
      />

      <BaseLayout>
        <div className='flex items-start justify-center flex-col h-[245px] relative z-[2]'>
          <h1 className='text-neutral-100'>Struktur Komunitas</h1>
          <h1 className='text-warning-main'>GenBI UPI</h1>
          <div className='mt-2'>
            <Select
              onValueChange={(e) => {
                handleChange(e);
              }}
            >
              <SelectTrigger className='w-[320px] bg-primary-main text-neutral-100 border-primary-main focus:outline-none focus:ring-0'>
                <SelectValue placeholder='Select Period' />
              </SelectTrigger>
              <SelectContent>
                {data?.data?.map((item, i) => (
                  <SelectItem key={i} value={String(item.id)}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </BaseLayout>
    </div>
  );
};

export default DivisorSection;
