import { ArrowDown } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
// import required modules
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// Import Swiper styles
import './index.css';

import { useGetFeaturedPhotos } from '@/hooks/landing-page/hook';

import Button from '@/components/buttons/Button';
import BaseLayout from '@/components/layouts/base';

interface Swiper {
  activeIndex: number;
  slides: { length: number };
}

const CustomPagination = ({
  currentIndex,
  totalSlides,
}: {
  currentIndex: number;
  totalSlides: number;
}) => {
  const progressPercentage = ((currentIndex + 1) / totalSlides) * 100;

  return (
    <div className='w-full bg-primary-200 rounded-xl h-2'>
      <div
        className='h-2 rounded-xl bg-primary-main transform transition-all duration-300 ease-in-out'
        style={{ width: `${progressPercentage}%` }}
      ></div>
      <div className='w-full flex justify-between'>
        <span className='text-xl font-semibold'>01</span>
        <span className='text-xl font-semibold'>{`0${totalSlides}`}</span>
      </div>
    </div>
  );
};

const HeaderSection = () => {
  const [swiper, setSwiper] = useState<Swiper | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { data } = useGetFeaturedPhotos();

  const pagination = {
    el: '.custom-pagination',
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return `<span class="${className}">${index + 1}</span>`;
    },
  };

  const handleSlideChange = () => {
    if (swiper) {
      setActiveIndex(swiper.activeIndex);
    }
  };

  return (
    <div
      className='pt-20 lg:pt-0 min-h-[60vh] md:min-h-[65vh] lg:min-h-[70vh] w-full relative'
      style={{
        background:
          'linear-gradient(101deg, #041C3F 3.31%, #11418B 39.48%, #11418B 98.43%)',
      }}
    >
      <Image
        className='absolute w-full h-[50vh] md:h-[55vh] lg:h-[60vh]  -right-64 lg:-right-96 -top-10'
        src='/images/Ellipse.svg'
        alt='ellipse bg'
        width={0}
        height={0}
        sizes='40vw'
      />
      <Image
        className='absolute w-full h-[60vh] md:h-[65vh] lg:h-[70vh] -left-[20vw] lg:-left-[38vw]'
        src='/images/line-pattern-head.svg'
        alt='ellipse bg'
        width={0}
        height={0}
        sizes='40vw'
        style={{
          transform: 'rotate(-9deg)',
        }}
      />
      <div className='h-full relative z-[2]'>
        <BaseLayout>
          <div className='min-h-[60vh] md:min-h-[65vh] lg:min-h-[70vh] grid items-center grid-cols-3'>
            <div className='col-span-3 lg:col-span-2 flex flex-col gap-3 lg:justify-start justify-center'>
              <h1 className='text-neutral-100 h0'>
                Membentuk <i>Generasi Baru</i>
              </h1>
              <div className='flex gap-4 items-center'>
                <div className='flex flex-col gap-2.5 items-center bg-neutral-100 rounded-full p-[14px]'>
                  <Image
                    alt='Logo BI'
                    src='/images/logo-bi-color.png'
                    width={36}
                    height={36}
                  />
                  <Image
                    alt='Logo GenBI'
                    src='/images/logo-genbi-color.png'
                    width={38}
                    height={38}
                  />
                </div>
                <div className='flex flex-col gap-3'>
                  <h1 className='text-neutral-100 h0'>Dengan Mencipatakan </h1>
                  <h2 className='text-neutral-100'>Energi Untuk Negeri</h2>
                </div>
              </div>
              <p className='text-lg font-medium text-neutral-100 lg:w-[490px]'>
                Kami <strong>GenBI UPI</strong> hadir untuk mewujudkan perubahan
                nyata. Temukan kisah, prestasi, dan komitmen kami di sini.
              </p>
            </div>

            <div className='col-span-3 lg:col-span-1 relative h-full flex justify-end lg:justify-normal'>
              <div
                className='max-w-[500px] lg:max-w-[700px] w-full bg-neutral-100 px-4 py-6 rounded-3xl flex flex-col gap-[14px] text-neutral-main relative lg:absolute -bottom-10 pb-10 right-0 '
                style={{
                  boxShadow: ' 0px 4px 4px 0px rgba(78, 77, 77, 0.18)',
                }}
              >
                <div className='flex justify-between'>
                  <div className='flex flex-col gap-1'>
                    <p>
                      <i>Generasi Baru Indonesia</i>
                    </p>
                    <h3>GenBI UPI 23.24</h3>
                  </div>
                  <div className='w-7 h-7 bg-error-main rounded-full'></div>
                </div>
                <div className='w-full h-[300px]'>
                  <Swiper
                    onSwiper={setSwiper}
                    onSlideChange={handleSlideChange}
                    pagination={pagination}
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: false,
                    }}
                    effect='fade'
                    modules={[Pagination, Autoplay, EffectFade]}
                    className='mySwiper w-full h-full'
                  >
                    {data &&
                      data?.data?.map((item, i) => {
                        return (
                          <div key={i}>
                            <SwiperSlide key={i}>
                              <Image
                                src={`${item?.file_url}`}
                                width={0}
                                height={0}
                                sizes='50vw'
                                className='w-full h-full object-cover rounded-3xl'
                                alt={item?.alt || 'image header'}
                              />
                            </SwiperSlide>
                          </div>
                        );
                      })}
                  </Swiper>
                </div>
                {swiper && (
                  <CustomPagination
                    currentIndex={activeIndex}
                    totalSlides={swiper.slides.length}
                  />
                )}
                <Button className='hidden sm:absolute sm:-left-[220px] bg-warning-main sm:flex gap-3 items-center rounded-r-none bottom-20 hover:bg-warning-600 z-0'>
                  <ArrowDown className='text-white' />
                  <span className='text-neutral-50 font-bold text-lg'>
                    Perjalanan Kami
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </BaseLayout>
      </div>
    </div>
  );
};

export default HeaderSection;
