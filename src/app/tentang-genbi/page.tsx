import { Metadata } from 'next';
import React from 'react';

import CardGenBIUPI from '@/modules/about-genbi/card-genbi-upi';
import HeaderAboutGenBISection from '@/modules/about-genbi/header-section';
import VisiSection from '@/modules/about-genbi/visi-section';

export const metadata: Metadata = {
  title: 'Tentang GenBI',
  description:
    'Generasi Baru Indonesia, atau yang sering dikenal dengan nama GenBI merupakan sebuah komunitas yang terdiri dari mahasiswa terpilih yang berasal dari berbagai universitas dengan beragam latar disiplin ilmu dan keahlian. GenBI diharapkan mampu menjadi energi baru dalam memberikan kontribusi bagi negara. GenBI ini berada langsung dibawah pimpinan oleh pihak Bank Indonesia sendiri.',
};

const AboutGenbiPage = () => {
  return (
    <main className='min-h-60 w-full overflow-hidden'>
      <HeaderAboutGenBISection />
      <VisiSection />
      <CardGenBIUPI />
    </main>
  );
};

export default AboutGenbiPage;
