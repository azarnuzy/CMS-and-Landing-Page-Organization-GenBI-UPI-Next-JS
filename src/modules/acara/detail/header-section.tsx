import Image from 'next/image';
import React from 'react';
import { LuCalendarCheck } from 'react-icons/lu';
import { RiMapPinLine } from 'react-icons/ri';
import { RiLinkM } from 'react-icons/ri';
import { TbUsers } from 'react-icons/tb';

import { BreadCrumb } from '@/components/breadcrumbs';
import BaseLayout from '@/components/layouts/base';
import { Badge } from '@/components/ui/badge';

import { breadCrumbGenBIBanggaData } from '@/modules/acara/detail/constant';
const HeaderDetailAcaraSection = () => {
  return (
    <div className='relative py-10'>
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
            items={breadCrumbGenBIBanggaData}
            textColor='text-neutral-main'
          />
          <Image
            src='/images/marketing.png'
            width={0}
            height={0}
            alt='banner'
            className='object-cover h-[320px] w-full rounded-3xl'
            sizes='100vw'
          />
          <div className='flex flex-col sm:flex-row gap-6 pt-10'>
            <div className='flex flex-col gap-2 w-fit'>
              <h4>Pelatihan Desain Grafis Untuk Sosial Media</h4>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Architecto earum qui facilis maxime dignissimos delectus ab aut,
                voluptates exercitationem aliquid, culpa sunt harum ea
                necessitatibus expedita similique, blanditiis eius nemo nam.
                Blanditiis quae repellendus dolorem enim quas amet, quidem
                deserunt quod ullam maiores eveniet quo neque, incidunt optio
                soluta iste assumenda animi expedita repellat voluptate. Earum
                tempora veniam aut totam, iusto voluptatem nulla quisquam fugiat
                eius quas eaque
              </p>
              <p>
                perferendis, dolore corporis voluptas commodi sit quae
                accusantium possimus consequuntur perspiciatis ea. Repudiandae
                sequi incidunt, explicabo quasi qui corrupti ad soluta, aut
                maiores optio maxime! Nesciunt laboriosam iste libero ipsam, nam
                quidem impedit quia obcaecati. Accusamus libero, iure hic est
                quia debitis. Vero perspiciatis incidunt ex expedita numquam
                ipsa et quae magni dolor eveniet aut, explicabo dolorem dolore?
                Dolor aliquid ratione dolorum, velit deserunt repellat, a
                tenetur{' '}
              </p>
              <p>
                perspiciatis consequuntur harum blanditiis perferendis qui ex
                eius libero recusandae quod dignissimos earum quaerat minus
                aspernatur at pariatur maiores! Dolores commodi est consequuntur
                assumenda recusandae libero, rerum cumque ea nesciunt tempora
                excepturi eligendi, similique voluptatum sapiente a ipsam
                consectetur sunt quia exercitationem animi, autem veniam
                laudantium culpa. Ut voluptatem, dolorem, laboriosam quidem
                minus voluptas nemo amet, cum corrupti adipisci ratione
                blanditiis? Ipsam ullam debitis a.
              </p>
            </div>
            <div className='min-w-[270px] flex flex-col gap-6 '>
              <div className='w-full flex flex-col rounded-3xl border gap-6 shadow-md bg-neutral-100 '>
                <Image
                  src='/images/marketing.png'
                  width={0}
                  height={0}
                  alt='banner'
                  className='object-cover h-full sm:h-[179px] w-full rounded-t-3xl object-right'
                  sizes='100vw'
                />
                <div className='flex flex-col gap-6 px-6 text-neutral-main pb-6 h-fit'>
                  <div className='flex flex-col gap-3'>
                    <Badge
                      variant='default'
                      className='text-warning-900 bg-warning-100 border-warning-600 rounded-full w-fit py-1'
                    >
                      Open Registration
                    </Badge>
                    <div className='flex gap-2'>
                      <LuCalendarCheck className='text-neutral-main text-lg' />
                      <p className='text-sm '>13 April 2024</p>
                    </div>
                    <div className='flex gap-2'>
                      <RiMapPinLine className='text-neutral-main text-lg' />
                      <p className='text-sm '>Online, YouTube GenBI UPI</p>
                    </div>
                    <div className='flex gap-2'>
                      <RiLinkM className='text-neutral-main text-lg' />
                      <p className='text-sm '>www.linkstream.com</p>
                    </div>
                  </div>
                  <div>
                    <p className='text-[10px] text-blue-600'>Open Registrasi</p>
                    <p className='text-sm'>8 - 12 April 2024</p>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <button className='bg-primary-main text-white px-6 py-2 rounded-full border border-transparent  hover:bg-primary-600 hover:border-primary-main  duration-300 transition-all ease-in-out font-semibold text-sm'>
                      <span>Daftar Sekarang</span>
                    </button>
                    <button className='bg-neutral-100 border border-primary-main text-primary-main px-6 py-2 rounded-full  hover:bg-primary-600 duration-300 transition-all ease-in-out hover:text-neutral-100 font-semibold text-sm'>
                      <span>Narahubung</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className=' bg-neutral-100 w-full flex flex-col rounded-3xl border gap-2 px-4 py-6 shadow-md'>
                <p className='text-neutral-main font-semibold'>
                  Total Participant
                </p>
                <div className='flex justify-between'>
                  <h2 className='text-neutral-main'>15</h2>
                  <TbUsers className='text-neutral-600 text-2xl' />
                </div>
              </div>
            </div>
          </div>
          <div className='flex gap-2 items-center flex-wrap  pt-10 sm:pt-5'>
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
          </div>
        </div>
      </BaseLayout>
    </div>
  );
};

export default HeaderDetailAcaraSection;
