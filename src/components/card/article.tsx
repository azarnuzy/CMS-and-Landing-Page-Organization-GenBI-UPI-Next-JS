import Image from 'next/image';
import Link from 'next/link';
import { IoArrowForwardOutline } from 'react-icons/io5';

import { badgeColor } from '@/lib/utils/badge-color';
import { contentTrimmed } from '@/lib/utils/general-function';

import { TBadgeVariantProps } from '@/types/components/badge';

export const ArticleCard = ({
  image,
  title,
  tags,
  description,
  link = '/berita',
}: {
  image: string;
  title: string;
  tags: string[];
  description: string;
  link?: string;
}) => {
  return (
    <Link
      href={link}
      className='w-full shadow-xl border rounded-3xl p-4 flex flex-col gap-3 group overflow-hidden relative'
    >
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
      <div className='flex gap-3 items-center flex-nowrap overflow-x-auto group-hover:-translate-y-[40px] transition-all duration-500 ease-in-out transform scrollbar-thin'>
        {tags.map((tag, i) => {
          // split tag that contain space and join with '-'
          const val = tag
            .split(' ')
            .join('-')
            .toLowerCase() as TBadgeVariantProps;

          return (
            <div
              className={`py-1.5 px-4 ${badgeColor(
                (val as string) || ''
              )} rounded-full whitespace-nowrap border text-xs`}
              key={i}
            >
              {tag}
            </div>
          );
        })}
      </div>
      <h4 className=' group-hover:-translate-y-[40px] transition-all duration-500 ease-in-out transform'>
        {title}
      </h4>
      <div
        className='group-hover:-translate-y-[40px] transition-all duration-500 ease-in-out transform '
        dangerouslySetInnerHTML={{ __html: contentTrimmed(description) }}
      ></div>

      <p className='translate-y-[calc(100%+40px)] group-hover:translate-y-[calc(100%-40px)] transition-all duration-500 ease-in-out transform  flex gap-2 text-primary-main font-bold items-center justify-end'>
        <span> Lihat Selengkapnya </span>
        <IoArrowForwardOutline />
      </p>
    </Link>
  );
};
