import Image from 'next/image';
import React from 'react';

const HeaderSection = () => {
  return (
    <div
      className='h-[50vh] md:h-[55vh] lg:h-[60vh] w-full relative'
      style={{
        background:
          'linear-gradient(101deg, #041C3F 3.31%, #11418B 39.48%, #11418B 98.43%)',
      }}
    >
      <Image
        className='absolute w-full h-[50vh] md:h-[55vh] lg:h-[60vh] -right-96 -top-10'
        src='/images/Ellipse.svg'
        alt='ellipse bg'
        width={0}
        height={0}
        sizes='40vw'
      />
      <Image
        className='absolute w-full h-[60vh] md:h-[65vh] lg:h-[70vh] -left-[38vw] '
        src='/images/line-pattern-head.svg'
        alt='ellipse bg'
        width={0}
        height={0}
        sizes='40vw'
        style={{
          transform: 'rotate(-9deg)',
        }}
      />
    </div>
  );
};

export default HeaderSection;
