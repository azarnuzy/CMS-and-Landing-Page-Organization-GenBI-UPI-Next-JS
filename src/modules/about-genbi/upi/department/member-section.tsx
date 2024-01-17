'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import React from 'react';

import AwardeeCard from '@/components/card/member';
import BaseLayout from '@/components/layouts/base';

import {
  dataDepartment,
  translateTitleDepartment,
} from '@/modules/about-genbi/upi/department/constant';

const MemberSection = () => {
  const { description, division, manager, programs } = dataDepartment;

  const { department } = useParams();

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
                name={manager.name}
                position={manager.position}
                img={manager.image}
                instagram={manager.instagram}
                linkedin={manager.linkedin}
              />
              <div className='flex flex-col gap-2 max-w-[554px]'>
                <h3 className='text-neutral-main'>Deskripsi</h3>
                <p className='text-neutral-600 text-lg'>{description}</p>
                <ol className='list-disc pl-5'>
                  {division.map((item, i) => (
                    <li key={i} className='text-neutral-600 text-lg'>
                      <strong>{item.name}</strong> {item.description}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
          {division.map((item, i) => (
            <div className='flex flex-col gap-6 items-center' key={i}>
              <h3 className='text-neutral-main text-center'>{item.name}</h3>
              <div className='flex justify-center flex-wrap gap-8 pb-8 content-center place-content-center'>
                {item.members.map((member, i) => (
                  <div key={i} className='flex justify-center gap-4'>
                    <AwardeeCard
                      name={member.name}
                      position={member.position}
                      instagram='instagram.com/genbiupi'
                      linkedin='linkedin.com/in/genbiupi'
                      img='/images/secretary.png'
                      className='col-span-3 md:col-span-1 bg-white'
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
          <h3 className='text-neutral-main text-center'>
            {translateTitleDepartment(department as string)}{' '}
            <span className='text-primary-main '>Program Kerja</span>
          </h3>
          {programs.map((item, i) => (
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
                    programs.length - 2 === i
                  } && 'hidden' `}
                ></div>
              </div>
              <div className='pb-8 flex flex-col gap-2 w-full'>
                <h4 className='text-primary-main'>{item.title}</h4>
                <div>
                  <p className='text-sm text-neutral-600'>{item.description}</p>
                  <p className='text-sm text-neutral-600 italic'>{item.date}</p>
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
