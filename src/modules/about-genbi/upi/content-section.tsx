'use client';

import Image from 'next/image';
import React from 'react';

import BaseLayout from '@/components/layouts/base';

import { misiData } from '@/modules/landing-page/about-section';

const ContentSection = () => {
  return (
    <div className='py-10 relative'>
      <Image
        src='/svg/line-pattern-about-genbi-upi.svg'
        width={0}
        height={0}
        sizes='50vw'
        alt='line pattern'
        className='w-full top-[30%] absolute -z-10 object-cover'
      />
      <BaseLayout>
        <div className='flex flex-none flex-col sm:flex-row gap-4  sm:gap-14'>
          <div className='relative w-fit h-full bg-neutral-100 shadow-md border p-4 rounded-3xl'>
            <Image
              src='/images/video-genbi-upi.png'
              alt='video genbi upi'
              width={0}
              height={0}
              sizes='50vw'
              className='w-[390px] rounded-3xl h-full'
            />
          </div>
          <div className='flex flex-col gap-14 w-fit'>
            <div className='flex flex-col gap-6'>
              <h1 className='text-neutral-main'>
                Kenali <span className='text-primary-main'>GenBI UPI</span>
              </h1>
              <p className='text-neutral-600'>
                Pada tanggal ............. didirikan Komunitas Generasi Baru
                Indonesia (GenBI) UPI, sebuah organisasi yang diperuntukkan bagi
                mahasiswa yang menerima beasiswa dari Bank Indonesia di
                Universitas Pendidikan Indonesia. GenBI berperan sebagai
                platform untuk mengembangkan potensi intelektual, bakat,
                kepemimpinan, serta keterampilan presentasi dan penulisan.{' '}
                <br />
                <br /> GenBI memberikan peluang magang di Bank Indonesia dan
                berbagai perusahaan serta perusahaan multinasional. Selain itu,
                GenBI berfungsi sebagai tempat bagi anggotanya untuk
                berkontribusi dalam pengabdian masyarakat, baik melalui kegiatan
                sosial maupun melalui keterlibatan langsung dengan Bank
                Indonesia.
              </p>
            </div>
            <div className='flex flex-col gap-6'>
              <h1 className='text-end text-neutral-main'>Visi & Misi</h1>
              <div className='rounded-3xl p-6 flex gap-4 items-center bg-neutral-100 text-neutral-600 shadow-md border'>
                <Image
                  src='/images/icon-visi.png'
                  width={56}
                  height={56}
                  sizes='50vw'
                  alt='icon visi w-14 h-14'
                />
                <div className='flex flex-col gap-2 w-fit'>
                  <h2>Visi</h2>
                  <p>
                    GenBI sebagai wadah eksplorasi diri serta menjadi mediator
                    BI untuk menyebarkan kebermanfaatan kepada masyarakat.
                  </p>
                </div>
              </div>
              <div className='rounded-3xl p-6 flex flex-col gap-4 justify-center bg-neutral-100 text-neutral-600 shadow-md border'>
                <h2 className='text-start'>Misi</h2>
                <div className='flex flex-col gap-4 w-full'>
                  {misiData.map((item, index) => (
                    <div
                      className='rounded-2xl bg-neutral-100 border border-neutral-300 p-4 flex gap-4 items-center w-full'
                      key={index}
                    >
                      <div className={`p-1.5 ${item.color} rounded-md`}>
                        {item.icon}
                      </div>
                      <p className='text-neutral-600'>{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </BaseLayout>
    </div>
  );
};

export default ContentSection;
