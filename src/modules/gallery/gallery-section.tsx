'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import SwiperCore from 'swiper';
// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import { useGetGalleries } from '@/hooks/galleries/hook';

import BaseLayout from '@/components/layouts/base';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

import { TGalleriesData } from '@/types/galleries';

const GallerySection = () => {
  const searchParams = useSearchParams();

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore>();

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
    <div className='-mt-[50px] sm:-mt-[75px] lg:-mt-[200px]  pb-10'>
      <BaseLayout>
        <Dialog>
          <DialogTrigger>
            {' '}
            <Swiper
              loop={true}
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs]}
              className='mySwiper2'
              slidesPerView={3}
            >
              {galleriesData?.map((gallery, index) => {
                return (
                  <div className='object-cover rounded-lg w-full' key={index}>
                    <SwiperSlide key={index}>
                      <Image
                        width={0}
                        className='object-cover rounded-lg w-[200px] '
                        height={0}
                        src={gallery?.file_url}
                        alt={gallery.alt}
                        sizes='70vw'
                      />
                    </SwiperSlide>
                  </div>
                );
              })}
            </Swiper>
          </DialogTrigger>
          <DialogContent>
            <Swiper
              onSwiper={setThumbsSwiper}
              loop={true}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className='mySwiper'
            >
              {galleriesData?.map((gallery, index) => (
                <div key={index}>
                  <SwiperSlide key={index}>
                    <Image
                      width={0}
                      height={0}
                      className='object-cover rounded-lg w-[200px] col-span-3 md:col-span-1'
                      src={gallery?.file_url}
                      alt={gallery.alt}
                      sizes='70vw'
                    />
                  </SwiperSlide>
                </div>
              ))}
            </Swiper>
          </DialogContent>
        </Dialog>
      </BaseLayout>
    </div>
  );
};

export default GallerySection;
