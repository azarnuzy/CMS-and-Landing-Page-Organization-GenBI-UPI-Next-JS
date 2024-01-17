import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface BanggaCardProps {
  image: string;
  title: string;
  description: string;
  link: string;
}

const BanggaCard = ({ image, title, description, link }: BanggaCardProps) => {
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
      <h4>{title}</h4>

      <p>{description}</p>
    </Link>
  );
};

export default BanggaCard;
