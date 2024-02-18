'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { useGetGalleries } from '@/hooks/galleries/hook';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { galleriesDataState } from '@/recoils/galleries/atom';

const HeaderGallerySection = () => {
  const searchParams = useSearchParams();
  const [, setGalleriesData] = useRecoilState(galleriesDataState);
  const router = useRouter();
  const { data, refetch } = useGetGalleries({
    limit: 9,
    page: Number(searchParams.get('page')) || 1,
    sort: 'created_at',
    type: searchParams.get('sort') || 'desc',
  });

  const handleChange = (e: string) => {
    router.replace(`/gallery?sort=${e}`, { scroll: false });
    refetch();
  };

  useEffect(() => {
    if (data) {
      setGalleriesData(data.data);
    }
  }, [data, setGalleriesData]);

  return (
    <div
      className='pt-20 lg:pt-0 min-h-[60vh] md:min-h-[65vh] lg:min-h-[70vh] w-full relative overflow-hidden'
      style={{
        background:
          'linear-gradient(101deg, #041C3F 3.31%, #11418B 39.48%, #11418B 98.43%)',
      }}
    >
      <Image
        className='absolute w-full h-[70vh] md:h-[60vh] lg:h-[65vh]  -right-[20vw] top-0'
        src='/svg/ellipse-gallery.svg'
        alt='ellipse bg'
        width={0}
        height={0}
        sizes='40vw'
      />
      <Image
        className='absolute w-full h-full transform scale-125 -left-0 rotate-[-18deg]'
        src='/svg/line-pattern-header-gallery.svg'
        alt='ellipse bg'
        width={0}
        height={0}
        sizes='40vw'
        style={{
          transform: 'rotate(-9deg)',
        }}
      />
      <div className='w-full flex flex-col gap-4 pt-[91px] justify-center text-center relative z-[2]'>
        <h1 className='text-neutral-100 h0 leading-snug'>
          Momen-Momen Berharga <br />
          Perjalanan Kami
        </h1>
        <p className='text-lg text-neutral-100'>
          Setiap gambar di sini adalah cerminan dari nilai-nilai yang kami
          junjung tinggi.
        </p>
        <div className='flex justify-center'>
          <Select
            onValueChange={(e) => {
              handleChange(e);
            }}
          >
            <SelectTrigger className='w-fit bg-transparent text-neutral-100 border-neutral-100 focus:outline-none focus:ring-0 rounded-full'>
              <SelectValue placeholder='Newest' />
            </SelectTrigger>
            <SelectContent className='text-start flex justify-start'>
              <SelectItem className='text-start' value='desc'>
                Newest
              </SelectItem>
              <SelectItem className='text-start' value='asc'>
                Oldest
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default HeaderGallerySection;
