import Image from 'next/image';
import React from 'react';

import GalleryComponent from '@/components/gallery';
import { Badge } from '@/components/ui/badge';

import { contentHtml } from '@/modules/news/detail/constant';

const images = [
  { src: '/images/peran-1.webp' },
  { src: '/images/gallery-1.webp' },
  { src: '/images/peran-3.webp' },
  // { src: '/images/gallery-2.jpeg' },
  // { src: '/images/peran-3.webp' },
];

const ContentSection = () => {
  return (
    <div className='md:col-span-4 col-span-6'>
      <div className='flex flex-col gap-6'>
        <div className='flex flex-col gap-3'>
          <div className='w-full h-[492px] rounded-2xl'>
            <Image
              src='/images/article-temp-1.webp'
              alt='article'
              className='rounded-2xl object-cover object-center w-full h-full'
              width={0}
              height={0}
              sizes='60vw'
            />
          </div>
          <p className='text-end italic text-sm text-neutral-600'>
            Kegiatan GenBI Lorem Ipsum dolor sit amet{' '}
          </p>
        </div>
        <div className='flex items-start sm:justify-between flex-col sm:flex-row gap-2'>
          <div className='flex gap-4 items-center'>
            <Badge
              variant='outline'
              className='bg-warning-100 border py-1.5 px-3 border-warning-300 text-warning-600 '
            >
              Press Release
            </Badge>
            <Badge variant='outline' className='bg-neutral-100 py-1.5 px-3'>
              Education
            </Badge>
          </div>
          <div className='flex items-center gap-4'>
            <div className='flex gap-1.5 items-center text-neutral-main'>
              <Image
                src='/svg/calendar.svg'
                alt='calendar'
                width={24}
                height={24}
              />
              <p>4 Desember, 2024</p>
            </div>
            <div className='flex gap-1.5 items-center text-neutral-main'>
              <Image src='/svg/eye.svg' alt='eye' width={24} height={24} />
              <p>232</p>
            </div>
            <div className='flex gap-1.5 items-center text-neutral-main'>
              <Image
                src='/svg/message-chat.svg'
                alt='message-chat'
                width={24}
                height={24}
              />
              <p>5</p>
            </div>
            <div className='flex gap-1.5 items-center text-neutral-main'>
              <Image
                src='/svg/share.svg'
                alt='message-chat'
                width={24}
                height={24}
              />
            </div>
          </div>
        </div>
        <div
          className='flex flex-col gap-2'
          dangerouslySetInnerHTML={{ __html: contentHtml() }}
        ></div>
        <GalleryComponent images={images} />
        <div className='flex gap-2 items-center flex-wrap'>
          {Array(4)
            .fill('_')
            .map((_, i) => (
              <Badge
                variant='outline'
                key={i}
                className='text-neutral-600 py-2 px-4'
              >
                #tagline
              </Badge>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ContentSection;
