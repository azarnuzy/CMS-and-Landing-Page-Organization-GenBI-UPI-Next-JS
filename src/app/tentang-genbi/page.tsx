import React from 'react';

import CardGenBIUPI from '@/modules/about-genbi/card-genbi-upi';
import HeaderAboutGenBISection from '@/modules/about-genbi/header-section';
import VisiSection from '@/modules/about-genbi/visi-section';

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
