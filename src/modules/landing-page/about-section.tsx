'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BsTrophy } from 'react-icons/bs';
import { GrAnnounce } from 'react-icons/gr';
import { HiMiniUsers } from 'react-icons/hi2';
import { IoArrowForwardOutline } from 'react-icons/io5';

import { useGetHomeSummary } from '@/hooks/landing-page/hook';

import BaseLayout from '@/components/layouts/base';

import Zap from '~/images/zap-fast.svg';

export const misiData = [
  {
    icon: <Zap className='2-6 h-6 text-neutral-100' />,
    description:
      'Menciptakan lingkungan GenBI yang supportif terhadap gagasan baru.',
    color: 'bg-warning-main',
  },
  {
    icon: <BsTrophy className='w-6 h-6 text-neutral-100' />,
    description: 'Mempererat hubungan antar anggota.',
    color: 'bg-error-main',
  },
  {
    icon: <HiMiniUsers className='w-6 h-6 text-neutral-100' />,
    description:
      'Bergerak adaptif dan optimal dalam memanfaatkan potensi perkembangan zaman.',
    color: 'bg-primary-main',
  },
  {
    icon: <GrAnnounce className='w-6 h-6 text-neutral-100' />,
    description:
      'Siap dan selaras menyuarakan kebijakan Bank Indonesia kepada masyarakat.',
    color: 'bg-blue-300',
  },
];

const AboutSection = () => {
  const { data } = useGetHomeSummary();

  return (
    <div className='min-h-screen w-full pt-40 relative'>
      <div className='h-full relative'>
        <Image
          src='/images/line-pattern-about.svg'
          alt='line pattern'
          width={0}
          height={0}
          sizes='50vw'
          className='w-full rotate-[-22deg] top-0 absolute -z-10'
        />
      </div>
      <BaseLayout>
        <>
          <div className='flex flex-col gap-12 mb-28'>
            <div className='flex flex-col gap-6'>
              <h1>
                Kenali Lebih Dekat Tentang{' '}
                <span className='text-primary-main'>GenBI UPI</span>
              </h1>
              <p className='text-neutral-600 sm:w-1/2'>
                GenBI UPI merupakan komunitas penerima beasiswa Bank Indonesia
                di Universitas Pendidikan Indonesia yang telah aktif sejak 2019.
                Kami mencakup beragam bidang seperti ekonomi, pendidikan,
                kesehatan, dan sosial lingkungan.
              </p>
              <div className='flex flex-col sm:flex-row items-start sm:items-center gap-6'>
                <Link
                  href='/tentang-genbi/upi'
                  className='bg-primary-main text-white px-6 py-2 rounded-full border border-transparent flex gap-3 items-center hover:bg-primary-600 hover:border-primary-main  duration-300 transition-all ease-in-out'
                >
                  <span>Tentang GenBI UPI</span>
                  <IoArrowForwardOutline className='text-xl' />{' '}
                </Link>
                <Link
                  href='/tentang-genbi'
                  className='bg-neutral-100 border border-primary-main text-primary-main px-6 py-2 rounded-full flex gap-3 items-center hover:bg-primary-600 duration-300 transition-all ease-in-out hover:text-neutral-100'
                >
                  <span>Tentang Generasi Baru Indonesia</span>
                  <IoArrowForwardOutline className='text-xl' />{' '}
                </Link>
              </div>
            </div>
            <div className='flex flex-col sm:flex-row gap-6'>
              <div className='sm:w-[160px] flex flex-row flex-wrap  sm:flex-col gap-3'>
                <div className=' px-3 py-2'>
                  <h2 className='border-l-2  border-primary-main px-3'>
                    {data?.data?.events || 0}
                  </h2>
                  <p className='text-neutral-600 px-5'>Kegiatan</p>
                </div>
                <div className=' px-3 py-2'>
                  <h2 className='border-l-2  border-primary-main px-3'>
                    {data?.data?.posts || 0}
                  </h2>
                  <p className='text-neutral-600 px-5'>Berita</p>
                </div>
                <div className=' px-3 py-2'>
                  <h2 className='border-l-2  border-primary-main px-3'>
                    {data?.data?.years || 0}
                  </h2>
                  <p className='text-neutral-600 px-5'>Tahun</p>
                </div>
                <div className=' px-3 py-2'>
                  <h2 className='border-l-2  border-primary-main px-3'>
                    {data?.data?.visitors || 0}
                  </h2>
                  <p className='text-neutral-600 px-5'>Pengunjung</p>
                </div>
                <div className=' px-3 py-2'>
                  <h2 className='border-l-2  border-primary-main px-3'>
                    {data?.data?.awardees || 0}
                  </h2>
                  <p className='text-neutral-600 px-5'>Penerima</p>
                </div>
              </div>
              <div className='w-full sm:w-[calc(100%-160px-24px)] '>
                <video
                  src='/images/genbi-video.mp4'
                  loop
                  playsInline
                  controls
                  className='w-full rounded-lg sm:max-h-[550px] '
                ></video>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-4'>
            <h1 className='text-center text-neutral-main'>
              Visi & Misi <span className='text-primary-main'>GenBI UPI</span>{' '}
            </h1>
            <div className='rounded-3xl p-6 flex gap-4 items-center bg-neutral-100 text-neutral-600'>
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
                  GenBI sebagai wadah eksplorasi diri serta menjadi mediator BI
                  untuk menyebarkan kebermanfaatan kepada masyarakat.
                </p>
              </div>
            </div>
            <div className='rounded-t-3xl p-6 flex flex-col gap-4 justify-center bg-neutral-100 text-neutral-600'>
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
        </>
      </BaseLayout>
      <Image
        src='/images/about-section-bg.webp'
        alt='about section bg'
        width={0}
        height={0}
        sizes='50vw'
        className='w-full h-1/2 absolute bottom-0 left-0 -z-10 object-cover object-top'
      />
    </div>
  );
};

export default AboutSection;
