'use client';

import React from 'react';
import { useRecoilState } from 'recoil';

import DepartmentCard from '@/components/card/department';
import AwardeeCard from '@/components/card/member';
import BaseLayout from '@/components/layouts/base';

import { activeManagementsState } from '@/recoils/managements/atom';

const StructureGenbiSection = () => {
  const [activeManagements] = useRecoilState(activeManagementsState);

  return (
    <div className='py-10'>
      <BaseLayout>
        <div className='flex flex-col gap-9'>
          <h1 className='text-neutral-main text-center'>Executive</h1>
          <div className='w-full  flex justify-center'>
            <div className='grid grid-cols-3 gap-8 sm:gap-10 md:gap-12 lg:gap-14 w-fit justify-center'>
              {activeManagements?.structure?.executives?.map((item, i) => (
                <div
                  key={i}
                  className='col-span-3 sm:col-span-1 w-full sm:w-fit flex justify-center '
                >
                  <AwardeeCard
                    name={item.name}
                    position={item.position}
                    instagram={`https://instagram.com/${item.instagram_username}`}
                    linkedin={`https://www.linkedin.com/in/${item.linkedin_username}`}
                    img={item.photo?.file_url}
                  />
                </div>
              ))}
            </div>
          </div>
          <h1 className='text-neutral-main text-center'>Department</h1>
          <div className='w-full flex justify-center'>
            <div className='flex flex-wrap justify-center gap-8'>
              {activeManagements?.structure?.departments.map((item, i) => (
                <div key={i} className=' w-full sm:w-fit  flex justify-center'>
                  <DepartmentCard
                    name={item.name}
                    link={`/tentang-genbi/upi/${item.id}`}
                    img={item.cover.file_url}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </BaseLayout>
    </div>
  );
};

export default StructureGenbiSection;
