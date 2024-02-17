import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { contentTrimmed } from '@/lib/utils/general-function';
import { translateStatusEvent } from '@/lib/utils/translate-function';

interface AcaraCardProps {
  image: string;
  title: string;
  description: string;
  link: string;
  status: string;
}

const AcaraCard = ({
  image,
  title,
  description,
  link,
  status,
}: AcaraCardProps) => {
  return (
    <Link
      href={link}
      className='w-full  h-full p-4 flex flex-col gap-3 bg-neutral-100 shadow-md border rounded-3xl'
    >
      <Image
        src={image || '/images/no-photo-available.png'}
        alt='bg-shape-header-about'
        width={0}
        height={0}
        className='w-full  h-[265px] lg:h-[337px] object-cover rounded-3xl  group-hover:pb-[40px]  transition-all duration-500 ease-in-out'
        sizes='50vw'
      />
      <div
        className={`px-4 py-1 w-fit text-sm whitespace-nowrap   rounded-3xl border  ${translateStatusEvent(
          status
        )}`}
      >
        {status}
      </div>
      <h4>{title}</h4>

      <div
        className='content-dangerously'
        dangerouslySetInnerHTML={{ __html: contentTrimmed(description, 200) }}
      ></div>
    </Link>
  );
};

export default AcaraCard;
