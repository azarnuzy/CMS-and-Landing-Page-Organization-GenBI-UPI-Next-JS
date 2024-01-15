'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const SideContentSection = () => {
  return (
    <div className='md:col-span-2 col-span-6 flex flex-col gap-3'>
      <div className='mb-3 flex gap-3 items-center'>
        <div className='w-[64px] h-[64px]'>
          <Avatar>
            <AvatarImage src='/images/avatar.jpeg' />
            <AvatarFallback>AN</AvatarFallback>
          </Avatar>
        </div>
        <div className='flex flex-col gap-[5px]'>
          <p className='text-cm text-neutral-600'>Diunggah oleh</p>
          <p className='font-semibold text-primary-main'>
            Public Relations Admin
          </p>
        </div>
      </div>
      <h4>Rekomendasi Topik</h4>
      <div className='flex gap-2 flex-wrap'>
        <Badge className='py-2.5 px-4' variant='outline'>
          Executive
        </Badge>
        <Badge className='py-2.5 px-4' variant='outline'>
          Humans Relations
        </Badge>
        <Badge className='py-2.5 px-4' variant='outline'>
          Education
        </Badge>
        <Badge className='py-2.5 px-4' variant='outline'>
          Bank Indonesia
        </Badge>
        <Badge className='py-2.5 px-4' variant='outline'>
          Healthcare
        </Badge>
        <Badge className='py-2.5 px-4' variant='outline'>
          Marketing
        </Badge>
        <Badge className='py-2.5 px-4' variant='outline'>
          Social & Environment
        </Badge>
      </div>
      <h4>Berita Serupa</h4>
      {Array(4)
        .fill('_')
        .map((_, i) => (
          <div
            className='bg-neutral-100 shadow-md border rounded-3xl p-4 flex flex-col gap-2.5 relative group'
            key={i}
          >
            <div className='absolute top-0 left-0 w-full h-full hover:bg-[#011739D6] transition-all duration-300 ease-in-out flex justify-center items-center hover:z-[10] opacity-0 hover:opacity-100 rounded-3xl hover:backdrop-blur-sm'>
              <Button
                className='border border-neutral-100 rounded-3xl text-neutral-100 hover:bg-neutral-100 hover:text-balance transition-all duration-300 ease-in-out group-hover:flex gap-1 items-center py-1 text-sm hidden '
                variant='ghost'
                asChild
              >
                <Link href='/'>
                  <p className='text-sm'>Selengkapnya</p>
                  <ArrowRight className='text-sm' />
                </Link>
              </Button>
            </div>
            <div className='flex flex-wrap gap-[5px]'>
              <Badge variant='destructive'>Executive</Badge>
              <Badge
                variant='default'
                className='bg-purple-100 text-purple-500 border-purple-300'
              >
                Economic
              </Badge>
            </div>
            <h4>Lorem ipsum dolor sit amet.</h4>
            <p className='text-neutral-600'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam,
              aliquam...
            </p>
          </div>
        ))}
    </div>
  );
};

export default SideContentSection;
