'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef } from 'react';
import { IoSearch } from 'react-icons/io5';
import { useRecoilState } from 'recoil';

import { useGetAllPost } from '@/hooks/posts/hook';

import BadgeTag from '@/components/badge';
import { ArticleCard } from '@/components/card/article';
import BaseLayout from '@/components/layouts/base';
import Pagination from '@/components/pagination';

import { dataFilter } from '@/modules/news/constant';
import { postsDataState } from '@/recoils/news/atom';

const NewsArticleSection = () => {
  const parentRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const { data, refetch } = useGetAllPost({
    sort: 'created_at',
    type: 'desc',
    limit: 4,
    page: Number(searchParams.get('page')) || 1,
    filter: searchParams.get('filter') || '',
  });

  const [dataPost, setDataPost] = useRecoilState(postsDataState);

  const handlePageChange = async (page: number) => {
    await refetch();

    let filter = '';
    if (searchParams.get('filter')) {
      filter = `&filter=${searchParams.get('filter')}`;
    }

    router.replace(`/berita?page=${page}${filter}`, { scroll: false });

    if (parentRef.current) {
      parentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFilterChange = async (filter: string) => {
    await refetch();
    let tempFilter = '';

    if (filter.length > 0) {
      tempFilter = `&filter=${filter}`;
    }
    router.replace(`/berita?page=1${tempFilter}`, { scroll: false });

    if (parentRef.current) {
      parentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (data) {
      setDataPost(data?.data);
    }
  }, [data, setDataPost]);

  return (
    <div ref={parentRef} className='relative w-full min-h-[40vh] py-10'>
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
            {dataFilter.map((item, i) => (
              <div
                className='cursor-pointer'
                onClick={() => {
                  handleFilterChange(item.value);
                }}
                key={i}
              >
                <BadgeTag
                  size='lg'
                  title={item.name}
                  className='cursor-pointer'
                />
              </div>
            ))}
          </div>
          <div className='grid grid-cols-2 gap-5'>
            {data &&
              dataPost?.map((item, i) => (
                <div className='col-span-2 md:col-span-1' key={i}>
                  <ArticleCard
                    image={item.image_cover.file_url}
                    title={item.title}
                    tags={[item.type, item.department_name]}
                    description={item.content}
                    link={`/berita/${item.id}`}
                  />
                </div>
              ))}
          </div>
          <Pagination
            currentPage={Number(data?.pagination?.currentPage) || 1}
            totalPages={Number(data?.pagination?.totalPages) || 1}
            onPageChange={handlePageChange}
          />
        </div>
      </BaseLayout>
    </div>
  );
};

export default NewsArticleSection;
