'use client';

import Image from 'next/image';
import React from 'react';
import { useRecoilState } from 'recoil';

import AwardeeCard from '@/components/card/member';
import BaseLayout from '@/components/layouts/base';

import { departmentDataState } from '@/recoils/departments/atom';

const MemberSection = () => {
  const [departmentData] = useRecoilState(departmentDataState);

  return (
    <div className='pt-14 pb-10 relative'>
      <Image
        src='/svg/line-pattern-about-genbi-upi.svg'
        width={0}
        height={0}
        sizes='50vw'
        alt='line pattern'
        className='w-full top-[30%] absolute -z-10 object-cover'
      />
      <Image
        src='/images/line-pattern-department.png'
        width={0}
        height={0}
        sizes='50vw'
        alt='line pattern'
        className='w-full right-0 -bottom-[40%] absolute -z-10 '
      />
      <BaseLayout>
        <div className='w-full max-w-4xl mx-auto relative z-[2]'>
          <div className='flex justify-center w-full pb-6'>
            <div className='flex gap-6 items-center max-w-[800px]  justify-center flex-col sm:flex-row'>
              <AwardeeCard
                name={departmentData?.structure?.manager?.name || 'Lorem Ipsum'}
                position={
                  departmentData?.structure?.manager?.position || 'Lorem Ipsum'
                }
                img={
                  departmentData?.structure?.manager?.photo?.file_url ||
                  '/images/secretary.png'
                }
                instagram={
                  `https://instagram.com/${departmentData?.structure?.manager?.instagram_username}` ||
                  'https://instagram.com/genbiupi'
                }
                linkedin={
                  `https://linkedin.com/in/${departmentData?.structure?.manager?.linkedin_username}` ||
                  'https://linkedin.com/in/genbiupi'
                }
              />
              <div className='flex flex-col gap-2 max-w-[554px]'>
                <h3 className='text-neutral-main'>Deskripsi</h3>
                <div
                  dangerouslySetInnerHTML={{
                    __html: departmentData?.department?.description || '',
                  }}
                  className='text-neutral-600 text-lg'
                >
                  {/* {departmentData?.department?.description ||
                    'lorem ipsum dolor ismet'} */}
                </div>
                <ol className='list-disc pl-5'>
                  {departmentData?.department?.divisions.map((item, i) => (
                    <li key={i} className='text-neutral-600 text-lg'>
                      <strong>{item.name}</strong> {item.description}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
          {departmentData?.structure?.awardees?.map((item, i) => (
            <div className='flex flex-col gap-6 items-center' key={i}>
              <h3 className='text-neutral-main text-center'>{item.name}</h3>
              <div className='flex justify-center flex-wrap gap-8 pb-8 content-center place-content-center'>
                {item.awardees.map((member, i) => (
                  <div key={i} className='flex justify-center gap-4'>
                    <AwardeeCard
                      name={member.name}
                      position={member.position}
                      instagram={`https://instagram.com/${member.instagram_username}`}
                      linkedin={`https://linkedin.com/in/${member.linkedin_username}`}
                      img={member.photo?.file_url || '/images/secretary.png'}
                      className='col-span-3 md:col-span-1 bg-white'
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
          <h3 className='text-neutral-main text-center'>
            {departmentData?.department?.name || 'Marketing'}{' '}
            <span className='text-primary-main '>Program Kerja</span>
          </h3>
          {departmentData?.department?.programs?.map((item, i) => (
            <div className='flex gap-4 items-start' key={i}>
              <div className='flex flex-col items-center gap-1 h-full'>
                <Image
                  src='/svg/step-icon.svg'
                  alt='step icon'
                  width={32}
                  height={32}
                />
                <div
                  className={`w-[2px] min-h-[70px] bg-primary-100 ${
                    departmentData?.department?.programs?.length - 2 === i
                  } && 'hidden' `}
                ></div>
              </div>
              <div className='pb-8 flex flex-col gap-2 w-full'>
                <h4 className='text-primary-main'>{item.name}</h4>
                <div>
                  <p className='text-sm text-neutral-600'>{item.description}</p>
                  <p className='text-sm text-neutral-600 italic'>
                    {item.implementation_desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </BaseLayout>
    </div>
  );
};

export default MemberSection;
