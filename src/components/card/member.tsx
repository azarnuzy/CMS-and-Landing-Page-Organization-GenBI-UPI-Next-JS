import { Instagram } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BsLinkedin } from 'react-icons/bs';

interface Member {
  name: string;
  position: string;
  instagram: string;
  linkedin: string;
  img: string;
  className?: string;
}

const AwardeeCard = ({
  name,
  position,
  instagram,
  linkedin,
  img = '/images/ceo.png',
  className,
}: Member) => {
  // separate name first and last
  const splitName = name?.split(' ');
  const firstName = splitName?.slice(0, 1);
  // join the array
  const lastName = splitName.slice(1).join(' ');
  return (
    <div
      className={`shadow-md  w-[232px] h-[250px] relative rounded-[14px] p-6  group ${className} overflow-hidden`}
    >
      <Image
        src='/svg/ellipse-blue.svg'
        width={0}
        height={0}
        alt='ellipse'
        className='absolute z-0 bottom-0 -left-10 w-[300px] h-[300px]'
        sizes='40vw'
      />
      <Image
        src='/svg/ellipse-red.svg'
        width={0}
        height={0}
        alt='ellipse'
        className='absolute top-0 -right-10 w-[300px] h-[300px] z-0'
        sizes='40vw'
      />
      <Image
        src={img}
        className='w-[232px] h-[248px] absolute right-0 top-0  z-[2] '
        alt='profile'
        width={0}
        height={0}
        sizes='50vw'
      />
      <div className='relative z-[3]'>
        <h4 className='text-neutral-600'>
          <span className='text-primary-main'> {firstName}</span> {lastName}
        </h4>
        <p className='text-neutral-600 italic text-[10px]'>{position}</p>
      </div>
      <div className='flex gap-2 items-center absolute left-5 top-1/2 sm:translate-y-0 transition-all transform sm:-translate-x-24 translate-x-0 translate-y-16  z-[2] group-hover:translate-x-0 group-hover:translate-y-20 duration-500'>
        <Link
          target='_blank'
          href={instagram}
          className='bg-primary-main text-neutral-100 p-2 rounded-full'
        >
          <Instagram size={18} />
        </Link>
        <Link
          target='_blank'
          href={linkedin}
          className='bg-primary-main text-neutral-100 p-2 rounded-full'
        >
          <BsLinkedin size={18} />
        </Link>
      </div>
    </div>
  );
};

export default AwardeeCard;
