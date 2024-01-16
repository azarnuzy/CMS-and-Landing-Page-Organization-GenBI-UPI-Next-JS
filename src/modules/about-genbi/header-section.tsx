import Image from 'next/image';
import React from 'react';

import BaseLayout from '@/components/layouts/base';

const HeaderAboutGenBISection = () => {
  return (
    <div className='min-h-[50vh] relative'>
      <Image
        src='/images/about-header-bg-1.png'
        width={0}
        height={0}
        alt='bg-shape-header-about'
        className='absolute top-0 -left-0 object-fill w-full h-full z-0'
        sizes='100vw'
      />
      <BaseLayout>
        <div className=' grid grid-cols-5 gap-4 pt-10 '>
          <div className='flex flex-col gap-4 relative z-[1] md:col-span-3 col-span-4 justify-center'>
            <h1 className='h0 text-neutral-100'>Generasi Baru Indonesia</h1>
            <div className='pl-4 text-neutral-100 text-xl md:max-w-2xl border-l border-neutral-100'>
              <p>
                Generasi Baru Indonesia, atau yang sering dikenal dengan nama
                GenBI merupakan sebuah komunitas yang terdiri dari mahasiswa
                terpilih yang berasal dari berbagai universitas dengan beragam
                latar disiplin ilmu dan keahlian. GenBI diharapkan mampu menjadi
                energi baru dalam memberikan kontribusi bagi negara. GenBI ini
                berada langsung dibawah pimpinan oleh pihak Bank Indonesia
                sendiri.
              </p>
            </div>
          </div>
          <div className='p-4 rounded-3xl w-full h-full bg-neutral-100 shadow-md relative z-[1] md:col-span-2 col-span-5'>
            <Image
              src='/images/bg-header-about-genbi.png'
              width={0}
              height={0}
              alt='about header'
              className='w-full h-full object-cover rounded-3xl'
              sizes='50vw'
            />
          </div>
        </div>
      </BaseLayout>
    </div>
  );
};

export default HeaderAboutGenBISection;
