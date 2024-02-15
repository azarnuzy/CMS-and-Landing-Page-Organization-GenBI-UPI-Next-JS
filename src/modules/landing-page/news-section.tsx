import Link from 'next/link';
import React from 'react';
import { IoArrowForwardOutline } from 'react-icons/io5';

import { useGetAllPost } from '@/hooks/posts/hook';

import { ArticleCard } from '@/components/card/article';
import BaseLayout from '@/components/layouts/base';

const NewsSection = () => {
  const { data } = useGetAllPost({
    sort: 'created_at',
    type: 'desc',
    limit: 4,
    page: 1,
  });

  return (
    <div
      className='w-full min-h-[60vh] py-14'
      style={{
        background:
          'radial-gradient(51.47% 51.47% at 50% 48.53%, #FBEECB 0%, #FFF 100%)',
      }}
    >
      <BaseLayout>
        <div className='flex flex-col gap-14'>
          <div className='flex justify-between'>
            <h1>
              Terbaru Dari <span className='text-primary-main'>GenBI UPI</span>
            </h1>
            <Link
              href='/berita'
              className='bg-neutral-100 border border-primary-main text-primary-main px-6 py-2 rounded-full flex gap-3 items-center hover:bg-primary-600 duration-500 transition-all ease-in-out hover:text-neutral-100'
            >
              <span className='whitespace-nowrap'>Lihat Selengkapnya</span>
              <IoArrowForwardOutline className='text-xl' />{' '}
            </Link>
          </div>
          <div className='grid grid-cols-2 gap-16'>
            <div className='col-span-2 md:col-span-1 flex flex-col gap-16 md:pt-16'>
              {data?.data
                ?.filter((_, i) => i < 2)
                .map((post) => (
                  <ArticleCard
                    key={post.id}
                    image={post.image_cover.file_url}
                    title={post.title}
                    tags={[post.type, post.department_name]}
                    description={post.content}
                    link={`/berita/${post.id}`}
                  />
                ))}
            </div>
            <div className='col-span-2 md:col-span-1 flex flex-col gap-16 md:pb-16'>
              {data?.data
                ?.filter((_, i) => i > 1 && i < 4)
                .map((post) => (
                  <ArticleCard
                    key={post.id}
                    image={post.image_cover.file_url}
                    title={post.title}
                    tags={[post.type, post.department_name]}
                    description={post.content}
                    link={`/berita/${post.id}`}
                  />
                ))}
            </div>
          </div>
        </div>
      </BaseLayout>
    </div>
  );
};

export default NewsSection;
