import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IoArrowForwardOutline } from 'react-icons/io5';

import { useGetGalleries } from '@/hooks/galleries/hook';

import BaseLayout from '@/components/layouts/base';

const GallerySection = () => {
  const { data } = useGetGalleries({
    limit: 8,
    page: 1,
    sort: 'created_at',
    type: 'desc',
  });
  return (
    <div
      className='w-full min-h-[40vh] py-14'
      style={{
        background: 'linear-gradient(180deg, #11418B 0%, #021D47 98%)',
      }}
    >
      <BaseLayout>
        <div className='gap-6 flex flex-col justify-center items-center'>
          <div className='flex flex-nowrap gap-6 justify-center'>
            {data?.data?.map((item, i) => (
              <div
                key={i}
                className='w-[94px] h-[324px] rounded-xl bg-white shadow-md hover:w-[254px] transition-all duration-300 ease-in-out'
              >
                <Image
                  src={item?.file_url || '/images/no-photo-available.png'}
                  width={0}
                  height={0}
                  alt={item?.alt || 'no photo available'}
                  className='rounded-lg object-cover w-full h-full'
                  sizes='40vw'
                />
              </div>
            ))}
          </div>
          <Link
            href='/gallery'
            className='text-white px-4 py-2 bg-transparent flex gap-1 border items-center border-neutral-100 w-fit rounded-full hover:bg-neutral-100 hover:text-primary-main transition-all duration-300 ease-in-out font-medium'
          >
            <span>View GenBI Gallery</span> <IoArrowForwardOutline />{' '}
          </Link>
        </div>
      </BaseLayout>
    </div>
  );
};

export default GallerySection;
