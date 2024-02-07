import Image from 'next/image';
import React from 'react';

const HeaderGallerySection = () => {
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
      </div>
    </div>
  );
};

export default HeaderGallerySection;
