import Image from 'next/image';
import React from 'react';
import { IoSearch } from 'react-icons/io5';

import AcaraCard from '@/components/card/acara';
import BaseLayout from '@/components/layouts/base';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

import { dataEvents } from '@/modules/acara/constant';
const ContentEventSection = () => {
  return (
    <div className='relative w-full min-h-[40vh] py-10 bg-neutral-100'>
      <Image
        width={0}
        height={0}
        src='/svg/news-bg.svg'
        alt='news-bg'
        className='absolute -top-52 sm:-top-72 w-full h-[400px] z-[1]'
        sizes='100vw'
      />
      <BaseLayout>
        <div className='flex flex-col relative gap-6 z-[2]'>
          <h1 className='text-center'>
            Daftar Acara <span className='text-primary-main'>GenBI UPI</span>
          </h1>
          <div className='rounded-full border border-neutral-300 py-4 px-6 flex gap-2'>
            <label
              className=' rounded-full  flex items-center justify-center'
              htmlFor='search'
            >
              <IoSearch className='text-neutral-main text-xl' />
            </label>
            <input
              type='text'
              id='search'
              placeholder='Cari Acara GenBI UPI...'
              className='w-full bg-transparent outline-none'
            />
          </div>
          <div className='flex overflow-x-auto flex-nowrap items-center gap-4 pb-2   scrollbar-thin scrollbar-track-slate-100 scrollbar-thumb-slate-300 scrollbar-thumb-rounded'>
            <Button className='bg-warning-main text-warning-900 rounded-full hover:bg-warning-500 border border-warning-600 '>
              Semua
            </Button>
            <Button
              variant='outline'
              className='text-neutral-main rounded-full'
            >
              Coming Soon
            </Button>
            <Button
              variant='outline'
              className='text-neutral-main rounded-full'
            >
              Open Registration
            </Button>
            <Button
              variant='outline'
              className='text-neutral-main rounded-full'
            >
              Ongoing
            </Button>
            <Button
              variant='outline'
              className='text-neutral-main rounded-full'
            >
              Close Registration
            </Button>
            <Button
              variant='outline'
              className='text-neutral-main rounded-full'
            >
              Finished
            </Button>
          </div>
          <div className=' flex-wrap flex justify-center gap-10'>
            {dataEvents.map((item, i) => (
              <AcaraCard key={i} {...item} />
            ))}
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationPrevious href='#' />
              <PaginationLink href='#'>1</PaginationLink>
              <PaginationLink href='#'>2</PaginationLink>
              <PaginationEllipsis />
              <PaginationLink href='#'>10</PaginationLink>
              <PaginationNext href='#' />
            </PaginationContent>
          </Pagination>
        </div>
      </BaseLayout>
    </div>
  );
};

export default ContentEventSection;
