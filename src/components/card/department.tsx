import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';

interface TDepartmentCard {
  name: string;
  link: string;
  img: string;
  className?: string;
}

const DepartmentCard = ({ name, link, img, className }: TDepartmentCard) => {
  return (
    <div
      className={`h-[200px] w-full sm:w-[482px] ${className} rounded-3xl px-8 py-[18px] relative`}
    >
      <Image
        src={img}
        alt='department'
        width={0}
        height={0}
        sizes='50vw'
        className='absolute top-0 left-0 w-full h-full object-cover rounded-3xl bg-primary-main -z-[1]'
      />
      <div className='flex flex-col gap-2'>
        <h2 className='text-neutral-100'>{name}</h2>
        <Button
          className='border border-neutral-100 rounded-3xl text-neutral-100 hover:bg-neutral-100 hover:text-balance transition-all duration-300 ease-in-out group-hover:flex gap-1 items-center py-1 text-sm w-fit'
          variant='ghost'
          asChild
        >
          <Link className='flex gap-2 items-center' href={link}>
            <p className='text-sm'>Lihat Selengkapnya</p>
            <ArrowRight className='text-sm' />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default DepartmentCard;
