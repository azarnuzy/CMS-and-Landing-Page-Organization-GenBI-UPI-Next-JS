'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { LuCalendarCheck } from 'react-icons/lu';
import { RiMapPinLine } from 'react-icons/ri';
import { RiLinkM } from 'react-icons/ri';
import { useRecoilState } from 'recoil';

import { formatDate } from '@/lib/utils/general-function';
import { translateStatusEvent } from '@/lib/utils/translate-function';
import { useGetDetailEvent } from '@/hooks/events/hook';

import { BreadCrumb } from '@/components/breadcrumbs';
import BaseLayout from '@/components/layouts/base';

import { breadCrumbGenBIBanggaData } from '@/modules/acara/detail/constant';
import RegistrationEventModal from '@/modules/acara/detail/registration-modal';
import { eventsDetailDataState } from '@/recoils/events/atom';
const HeaderDetailAcaraSection = ({ id }: { id: string }) => {
  const { data } = useGetDetailEvent({ id: Number(id) });

  const [, setDetailEvent] = useRecoilState(eventsDetailDataState);

  useEffect(() => {
    if (data) {
      setDetailEvent(data.data);
    }
  }, [data, setDetailEvent]);

  return (
    <div className='relative overflow-hidden py-10'>
      <Image
        src='/svg/line-pattern-detail-acara.svg'
        alt='line-pattern'
        width={0}
        height={0}
        sizes='50vw'
        className='w-full  top-1/2 absolute -z-10'
      />
      <BaseLayout>
        <div className=''>
          <BreadCrumb
            items={breadCrumbGenBIBanggaData(
              `${data?.data?.event?.id}/${data?.data?.event?.slug}`,
              data?.data?.event?.title || 'Detail Event'
            )}
            textColor='text-neutral-main'
          />
          <Image
            src={
              data?.data?.event?.banner?.file_url ||
              '/images/no-photo-available.png'
            }
            width={0}
            height={0}
            alt={data?.data?.event?.banner?.alt || 'banner'}
            className='object-cover h-[320px] w-full rounded-3xl'
            sizes='100vw'
          />
          <div className='flex flex-col sm:flex-row gap-6 pt-10'>
            <div className='flex flex-col gap-2 w-full'>
              <h4>{data?.data?.event?.title}</h4>
              <div
                className='content-dangerously'
                dangerouslySetInnerHTML={{
                  __html:
                    data?.data?.event?.description ||
                    `<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, dolores.</p>`,
                }}
              ></div>
            </div>
            <div className=' min-w-[300px] flex flex-col gap-6 '>
              <div className='w-full flex flex-col rounded-3xl border gap-6 shadow-md bg-neutral-100 '>
                <Image
                  src={
                    data?.data?.event?.poster?.file_url ||
                    '/images/no-photo-available.png'
                  }
                  width={0}
                  height={0}
                  alt={data?.data?.event?.poster?.alt || 'poster'}
                  className='object-cover h-full sm:h-[200px] w-full rounded-t-3xl object-right'
                  sizes='100vw'
                />
                <div className='flex flex-col gap-6 px-6 text-neutral-main pb-6 h-fit overflow-hidden max-w-full '>
                  <div className='flex flex-col gap-3'>
                    <div
                      className={`px-4 py-1 w-fit text-sm    rounded-3xl border  ${translateStatusEvent(
                        data?.data?.event?.status || 'Finished'
                      )}`}
                    >
                      {data?.data?.event?.status || 'Finished'}
                    </div>
                    <div className='flex gap-2'>
                      <LuCalendarCheck className='text-neutral-main text-lg' />
                      <p className='text-sm '>
                        {formatDate(
                          data?.data?.event?.start_date ||
                            '1970-10-10T05:20:22.754Z'
                        )}
                      </p>
                    </div>
                    <div className='flex gap-2'>
                      <RiMapPinLine className='text-neutral-main text-lg ' />
                      <p className='text-sm '>{data?.data?.event?.location}</p>
                    </div>
                    {data?.data?.event?.location_url && (
                      <Link
                        href={data?.data?.event?.location_url || '#'}
                        className='flex gap-2 text-wrap '
                      >
                        <RiLinkM className='text-neutral-main text-lg min-w-[18px]' />
                        <p className='text-sm '>
                          {data?.data?.event?.location_url || ''}
                        </p>
                      </Link>
                    )}
                  </div>
                  <div>
                    <p className='text-[10px] text-blue-600'>
                      {new Date(
                        data?.data?.event?.end_reg_date ||
                          '2024-02-13T05:20:22.754Z'
                      ) < new Date()
                        ? 'Closed Registration '
                        : 'Open Registration '}
                    </p>
                    <p className='text-sm'>
                      {formatDate(
                        data?.data?.event?.start_reg_date ||
                          '2024-02-13T05:20:22.754Z'
                      )}{' '}
                      -{' '}
                      {formatDate(
                        data?.data?.event?.end_reg_date ||
                          '2024-02-13T05:20:22.754Z'
                      )}{' '}
                    </p>
                  </div>
                  <div className='flex flex-col gap-2'>
                    {data &&
                      (data?.data?.event?.registration_link !== null ? (
                        <Link
                          className='bg-primary-main text-white px-6 py-2 rounded-full border border-transparent  hover:bg-primary-600 hover:border-primary-main  duration-300 transition-all ease-in-out font-semibold text-sm disabled:bg-neutral-300 disabled:hover:border-neutral-300'
                          href={data?.data?.event?.registration_link || '#'}
                        >
                          Daftar Sekarang
                        </Link>
                      ) : (
                        <RegistrationEventModal data={data.data} />
                      ))}

                    <Link
                      href={data?.data?.event?.contact || '#'}
                      className='bg-neutral-100 border border-primary-main text-center text-primary-main px-6 py-2 rounded-full  hover:bg-primary-600 duration-300 transition-all ease-in-out hover:text-neutral-100 font-semibold text-sm'
                    >
                      <span>Narahubung</span>
                    </Link>
                  </div>
                </div>
              </div>
              {/* <div className=' bg-neutral-100 w-full flex flex-col rounded-3xl border gap-2 px-4 py-6 shadow-md'>
                <p className='text-neutral-main font-semibold'>
                  Total Participant
                </p>
                <div className='flex justify-between'>
                  <h2 className='text-neutral-main'>15</h2>
                  <TbUsers className='text-neutral-600 text-2xl' />
                </div>
              </div> */}
            </div>
          </div>
          {/* <div className='flex gap-2 items-center flex-wrap  pt-10 sm:pt-5'>
            {Array(4)
              .fill('_')
              .map((_, i) => (
                <Badge
                  variant='outline'
                  key={i}
                  className='text-neutral-600 py-2 px-4'
                >
                  #design
                </Badge>
              ))}
          </div> */}
        </div>
      </BaseLayout>
    </div>
  );
};

export default HeaderDetailAcaraSection;
