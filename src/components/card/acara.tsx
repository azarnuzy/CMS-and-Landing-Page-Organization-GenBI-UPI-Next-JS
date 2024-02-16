import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { contentTrimmed } from '@/lib/utils/general-function';

interface AcaraCardProps {
  image: string;
  title: string;
  description: string;
  link: string;
  status: string;
}

const translateStatus = (status: string) => {
  switch (status) {
    case 'Coming Soon':
      return 'text-error-700 bg-error-100 border-error-300';
    case 'Open Registration':
      return 'text-warning-500 bg-warning-100 border-warning-500';
    case 'Close Registration':
      return 'text-neutral-main bg-neutral-500 border-neutral-600';
    case 'Ongoing':
      return 'text-success-900 bg-success-200 border-success-400';
    default:
      return 'text-neutral-600 bg-neutral-200 border-neutral-300';
  }
};

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
        className={`px-4 py-1 w-fit text-sm whitespace-nowrap   rounded-3xl border  ${translateStatus(
          status
        )}`}
      >
        {status}
      </div>
      <h4>{title}</h4>

      <div
        className='group-hover:-translate-y-[40px] transition-all duration-500 ease-in-out transform '
        dangerouslySetInnerHTML={{ __html: contentTrimmed(description, 200) }}
      ></div>
    </Link>
  );
};

export default AcaraCard;
