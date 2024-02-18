'use client';

import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import 'react-image-lightbox/style.css';
import './index.css';

import { formatDate } from '@/lib/utils/general-function';
import { useGetGalleries } from '@/hooks/galleries/hook';

import BaseLayout from '@/components/layouts/base';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';

import { TGalleriesData } from '@/types/galleries';

const GallerySection = () => {
  const searchParams = useSearchParams();

  const [galleriesData, setGalleriesData] = useState<Array<TGalleriesData>>([
    {
      alt: '',
      id: 0,
      caption: '',
      category: '',
      created_at: '',
      file_url: '',
      mimetype: '',
      post_id: 0,
      updated_at: '',
    },
  ]);

  const { data } = useGetGalleries({
    limit: 9,
    page: Number(searchParams.get('page')) || 1,
    sort: 'created_at',
    type: searchParams.get('type') || 'desc',
  });

  useEffect(() => {
    if (data) {
      setGalleriesData(data.data);
    }
  }, [data]);

  return (
    <div className='-mt-[50px] sm:-mt-[75px] lg:-mt-[200px]  pb-10 relative z-10'>
      <BaseLayout>
        <div className='grid grid-cols-3 gap-4 mx-auto'>
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
                      src={gallery.file_url || '/images/no-photo-available.png'}
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
                  <DialogContent className='transform scale-105 md:scale-150 '>
                    <DialogHeader>
                      <DialogTitle>{gallery.caption}</DialogTitle>
                      <DialogDescription>
                        <Image
                          width={0}
                          height={0}
                          src={gallery.file_url}
                          alt={gallery.alt}
                          sizes='70vw'
                          className='object-fill rounded-lg w-full h-full'
                        />
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </div>
      </BaseLayout>
    </div>
  );
};

export default GallerySection;
