import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

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
      target='_blank'
      className='w-[270px] h-full p-4 flex flex-col gap-3 bg-neutral-100 shadow-md border'
    >
      <Image
        src={image}
        alt='bg-shape-header-about'
        width={0}
        height={0}
        className='w-[270px] h-[337px] object-cover'
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

      <p>{description}</p>
    </Link>
  );
};

export default AcaraCard;
