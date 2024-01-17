import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IoArrowForward } from 'react-icons/io5';

import BaseLayout from '@/components/layouts/base';
import { Button } from '@/components/ui/button';

const CardGenBIUPI = () => {
  return (
    <div className='relative min-h-[30vh] py-10'>
      <Image
        src='/svg/bg-shape-about-2.svg'
        alt='bg shape about 2'
        width={0}
        height={0}
        className='absolute top-0 left-0 w-full h-full -z-10 object-cover object-top'
        sizes='60vw'
      />
      <BaseLayout>
        <div
          className='rounded-3xl shadow-md flex justify-center px-14 h-[350px] flex-col gap-6 bg-cover bg-center bg-no-repeat relative'
          style={{
            backgroundImage:
              "url('/images/card-genbi-upi.png'), linear-gradient(264deg, #061123 3.97%, #021D47 93.81%)",
          }}
        >
          <h1 className='max-w-[334px] text-neutral-100'>
            Kenali Lebih Dekat Dengan{' '}
            <span className='text-warning-main'>GenBI UPI</span>
          </h1>
          <Button
            variant='outline'
            className='w-fit rounded-full bg-transparent'
            asChild
          >
            <Link
              href='/tentang-genbi/upi'
              className='flex gap-1 items-center text-neutral-100'
            >
              Tentang GenBI UPI <IoArrowForward />
            </Link>
          </Button>
        </div>
      </BaseLayout>
    </div>
  );
};

export default CardGenBIUPI;
