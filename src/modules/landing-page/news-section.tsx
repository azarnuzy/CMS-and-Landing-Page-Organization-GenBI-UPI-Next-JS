import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IoArrowForwardOutline } from 'react-icons/io5';

import BaseLayout from '@/components/layouts/base';

const NewsSection = () => {
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
            <button className='bg-neutral-100 border border-primary-main text-primary-main px-6 py-2 rounded-full flex gap-3 items-center hover:bg-primary-600 duration-500 transition-all ease-in-out hover:text-neutral-100'>
              <span className='whitespace-nowrap'>Lihat Selengkapnya</span>
              <IoArrowForwardOutline className='text-xl' />{' '}
            </button>
          </div>
          <div className='grid grid-cols-2 gap-16'>
            <div className='col-span-2 md:col-span-1 flex flex-col gap-16 md:pt-16'>
              <ArticleCard
                image='/images/article-temp-2.webp'
                title='Lorem ipsum dolor sit amet.'
                tags={['Press Release', 'Social Environment']}
                description='lorem ipsum dolor sit amet consectetur adipisicing elit. Vel provident ipsa aut iure veritatis sapiente nulla distinctio aliquam et cumque?'
                link='/'
              />
              <ArticleCard
                image='/images/article-temp-1.webp'
                title='Lorem ipsum dolor sit amet.'
                tags={['Press Release', 'Social Environment']}
                description='lorem ipsum dolor sit amet consectetur adipisicing elit. Vel provident ipsa aut iure veritatis sapiente nulla distinctio aliquam et cumque?'
                link='/'
              />
            </div>
            <div className='col-span-2 md:col-span-1 flex flex-col gap-16 md:pb-16'>
              <ArticleCard
                image='/images/article-temp-1.webp'
                title='Lorem ipsum dolor sit amet.'
                tags={['Press Release', 'Social Environment']}
                description='lorem ipsum dolor sit amet consectetur adipisicing elit. Vel provident ipsa aut iure veritatis sapiente nulla distinctio aliquam et cumque?'
                link='/'
              />
              <ArticleCard
                image='/images/article-temp-2.webp'
                title='Lorem ipsum dolor sit amet.'
                tags={['Press Release', 'Social Environment']}
                description='lorem ipsum dolor sit amet consectetur adipisicing elit. Vel provident ipsa aut iure veritatis sapiente nulla distinctio aliquam et cumque?'
                link='/'
              />
            </div>
          </div>
        </div>
      </BaseLayout>
    </div>
  );
};

export const ArticleCard = ({
  image,
  title,
  tags,
  description,
}: {
  image: string;
  title: string;
  tags: string[];
  description: string;
  // link is optional
  link?: string;
}) => {
  /* func to create max length desc 50 character  */
  const maxLength = 100;
  const trimmedString = description.substr(0, maxLength);
  const descriptionTrimmed =
    trimmedString.substr(
      0,
      Math.min(trimmedString.length, trimmedString.lastIndexOf(' '))
    ) + '...';

  return (
    <div className='w-full shadow-xl border rounded-3xl p-4 flex flex-col gap-3 group overflow-hidden relative'>
      <Image
        src={image}
        alt='article'
        width={0}
        height={0}
        sizes='40vw'
        className='w-full  h-[265px] lg:h-[300px] object-cover rounded-3xl  group-hover:pb-[40px]  transition-all duration-500 ease-in-out '
      />
      <Image
        src='/images/ellipse-article.svg'
        width={182}
        height={182}
        alt='ellipse-article'
        className='opacity-0 group-hover:opacity-100 absolute -left-5 -bottom-5 transition-all duration-500 ease-in-out '
      />
      <div className='flex gap-3 items-center '>
        {tags.map((tag, i) => (
          <div
            key={i}
            className='px-4 py-2 text-warning-500 bg-warning-100 rounded-3xl border border-warning-300 group-hover:-translate-y-[40px] transition-all duration-500 ease-in-out transform'
          >
            {tag}
          </div>
        ))}
      </div>
      <h4 className=' group-hover:-translate-y-[40px] transition-all duration-500 ease-in-out transform'>
        {title}
      </h4>
      <p className=' group-hover:-translate-y-[40px] transition-all duration-500 ease-in-out transform '>
        {/* max length description 50 character */}
        {descriptionTrimmed}
      </p>
      <Link
        href='/'
        className='translate-y-[calc(100%+40px)] group-hover:translate-y-[calc(100%-40px)] transition-all duration-500 ease-in-out transform  flex gap-2 text-primary-main font-bold items-center justify-end'
      >
        <span> Lihat Selengkapnya </span>
        <IoArrowForwardOutline />
      </Link>
    </div>
  );
};

export default NewsSection;
