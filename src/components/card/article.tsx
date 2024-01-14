import Image from 'next/image';
import Link from 'next/link';
import { IoArrowForwardOutline } from 'react-icons/io5';

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
      <div className='flex gap-3 items-center flex-nowrap overflow-x-auto group-hover:-translate-y-[40px] transition-all duration-500 ease-in-out transform'>
        {tags.map((tag, i) => (
          <div
            key={i}
            className='px-4 py-1 text-warning-500 whitespace-nowrap  bg-warning-100 rounded-3xl border border-warning-300 '
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
