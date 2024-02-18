'use client';

import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';

import { formatDate } from '@/lib/utils/general-function';
import { useGetGalleries } from '@/hooks/galleries/hook';

import BaseLayout from '@/components/layouts/base';
import Pagination from '@/components/pagination';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';

import { galleriesDataState } from '@/recoils/galleries/atom';

const GallerySection = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const parentRef = useRef<HTMLDivElement>(null);

  const [galleriesData, setGalleriesData] = useRecoilState(galleriesDataState);

  const { data, refetch } = useGetGalleries({
    limit: 9,
    page: Number(searchParams.get('page')) || 1,
    sort: 'created_at',
    type: searchParams.get('sort') || 'desc',
  });

  const handlePageChange = async (page: number) => {
    let sort = '';

    if (searchParams.get('sort')) {
      sort = `&sort=${searchParams.get('sort')}`;
    }

    if (parentRef.current) {
      parentRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    router.replace(`/gallery?page=${page}${sort}`, { scroll: false });
    await refetch();
  };

  useEffect(() => {
    if (data && searchParams.get('page')) {
      setGalleriesData(data?.data);
    }
  }, [data, galleriesData, searchParams, setGalleriesData]);

  return (
    <div className='-mt-[50px] sm:-mt-[75px] lg:-mt-[200px]  pb-10 relative z-10'>
      <BaseLayout>
        <>
          <div ref={parentRef} className='grid grid-cols-3 gap-4 mx-auto'>
            {galleriesData?.map((gallery, i) => (
              <div
                key={i}
                className='min-h-[400px]  md:min-h-[250px] w-full col-span-3 md:col-span-1'
              >
                <div className='flex justify-center w-full h-full'>
                  <Dialog>
                    <DialogTrigger className='group relative overflow-hidden'>
                      <Image
                        width={0}
                        height={0}
                        src={
                          gallery.file_url || '/images/no-photo-available.png'
                        }
                        alt={gallery.alt || 'no photo available'}
                        sizes='70vw'
                        className='object-cover rounded-lg w-full h-full'
                      />
                      <div className='absolute transform translate-y-60 duration-300 ease-in-out transition-all group-hover:translate-y-0 bottom-0 bg-[#0C0505C7]  text-neutral-100 w-full p-4 text-start'>
                        <p className='text-neutral-300'>
                          {formatDate(gallery?.created_at)}
                        </p>
                        <h4>{gallery?.caption}</h4>
                      </div>
                    </DialogTrigger>
                    <DialogContent className='max-h-[90vh] flex items-center  '>
                      <DialogHeader>
                        <DialogTitle>{gallery.caption}</DialogTitle>
                        <DialogDescription>
                          <Image
                            width={0}
                            height={0}
                            src={gallery.file_url}
                            alt={gallery.alt}
                            sizes='70vw'
                            className='object-contain max-h-[90vh] rounded-lg w-full h-full'
                          />
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))}
          </div>
          <Pagination
            currentPage={Number(data?.pagination?.currentPage) || 1}
            totalPages={Number(data?.pagination?.totalPages) || 1}
            onPageChange={handlePageChange}
          />
        </>
      </BaseLayout>
    </div>
  );
};

export default GallerySection;
