'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useRecoilState } from 'recoil';

import { contentTrimmed } from '@/lib/utils/general-function';

import BadgeTag from '@/components/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { dataFilter } from '@/modules/news/constant';
import { postDetailDataState } from '@/recoils/news/detail/atom';

const SideContentSection = () => {
  const [dataPost] = useRecoilState(postDetailDataState);

  return (
    <div className='md:col-span-2 col-span-6 flex flex-col gap-3'>
      <div className='mb-3 flex gap-3 items-center'>
        <div className='w-[64px] h-[64px]'>
          <Avatar>
            <AvatarImage
              src={
                dataPost?.post?.author?.photo.file_url ||
                '/images/profile-no-photo.png'
              }
            />
            <AvatarFallback>AN</AvatarFallback>
          </Avatar>
        </div>
        <div className='flex flex-col gap-[5px]'>
          <p className='text-cm text-neutral-600'>Diunggah oleh</p>
          <p className='font-semibold text-primary-main'>
            {dataPost?.post?.author.name || 'Admin'}
          </p>
        </div>
      </div>
      <h4>Rekomendasi Topik</h4>
      <div className='flex gap-2 flex-wrap'>
        {dataFilter.map((item, i) => (
          <Link
            href={`/berita?page=1&filter=${item.value}`}
            className='cursor-pointer'
            key={i}
          >
            <Badge className='py-2.5 px-4' variant='outline'>
              {item.name}
            </Badge>
          </Link>
        ))}
      </div>
      <h4>Berita Serupa</h4>
      {dataPost?.similarPosts.map((item, i) => (
        <div
          className='bg-neutral-100 shadow-md border rounded-3xl p-4 flex flex-col gap-2.5 relative group'
          key={i}
        >
          <div className='absolute top-0 left-0 w-full h-full hover:bg-[#011739D6] transition-all duration-300 ease-in-out flex justify-center items-center hover:z-[10] opacity-0 hover:opacity-100 rounded-3xl hover:backdrop-blur-sm'>
            <Button
              className='border border-neutral-100 rounded-3xl text-neutral-100 hover:bg-neutral-100 hover:text-balance transition-all duration-300 ease-in-out group-hover:flex gap-1 items-center py-1 text-sm hidden '
              variant='ghost'
              asChild
            >
              <Link href={`/berita/${item?.id}`}>
                <p className='text-sm'>Selengkapnya</p>
                <ArrowRight className='text-sm' />
              </Link>
            </Button>
          </div>
          <div className='flex flex-wrap gap-[5px]'>
            <div className='flex flex-col  lg:flex-row items-start lg:items-center lg:justify-between gap-y-2 '>
              <div className='flex gap-2 items-center flex-wrap'>
                <BadgeTag title={item?.type || 'Article'} size='sm' />
                <BadgeTag
                  title={item?.department_name || 'Marketing'}
                  size='sm'
                />
              </div>
            </div>
          </div>
          <h4>{item?.title || 'Lorem Ipsum Dolor Ismet Lorem'}</h4>
          <div
            className='text-neutral-600 content-dangerously'
            dangerouslySetInnerHTML={{ __html: contentTrimmed(item?.content) }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default SideContentSection;
