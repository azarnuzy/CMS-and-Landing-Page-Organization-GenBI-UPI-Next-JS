import Image from 'next/image';
import React from 'react';
import { IoSearch } from 'react-icons/io5';

import BaseLayout from '@/components/layouts/base';
import { Button } from '@/components/ui/button';

const NewsArticleSection = () => {
  return (
    <div className='relative w-full min-h-[40vh] '>
      <Image
        width={0}
        height={0}
        src='/svg/news-bg.svg'
        alt='news-bg'
        className='absolute -top-72 w-full h-full z-[1]'
        sizes='100vw'
      />
      <BaseLayout>
        <div className='flex flex-col relative gap-6 z-[2]'>
          <h1 className='text-center'>
            Temukan <span className='text-primary-main'>#KabarGenBI</span>
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
              placeholder='Cari Berita...'
              className='w-full bg-transparent outline-none'
            />
          </div>
          <div className='flex overflow-x-auto flex-nowrap items-center gap-4 pb-2   scrollbar-thin scrollbar-track-slate-100 scrollbar-thumb-slate-300 scrollbar-thumb-rounded'>
            <Button className='bg-warning-main text-warning-900 rounded-full hover:bg-warning-500 border border-warning-600 '>
              Semua
            </Button>
            <Button className='bg-warning-100 text-warning-900 rounded-full hover:bg-warning-200 border border-warning-500 '>
              Press Release
            </Button>
            <Button className='bg-error-100 text-error-700 rounded-full hover:bg-error-200 border border-error-400 '>
              Semua
            </Button>
            <Button
              variant='outline'
              className='text-neutral-main rounded-full'
            >
              Bank Indonesia
            </Button>
            <Button
              variant='outline'
              className='text-neutral-main rounded-full'
            >
              Bank Indonesia Jabar
            </Button>
            <Button
              variant='outline'
              className='text-neutral-main rounded-full'
            >
              Executive
            </Button>
            <Button
              variant='outline'
              className='text-neutral-main rounded-full'
            >
              Marketing
            </Button>
          </div>
        </div>
      </BaseLayout>
    </div>
  );
};

export default NewsArticleSection;
