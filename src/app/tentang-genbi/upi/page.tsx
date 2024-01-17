import React from 'react';

import ContentSection from '@/modules/about-genbi/upi/content-section';
import DivisorSection from '@/modules/about-genbi/upi/divisor-section';
import HeaderUpiSection from '@/modules/about-genbi/upi/header-upi-section';
import StructureGenbiSection from '@/modules/about-genbi/upi/structur-genbi-section';

const TentangGenBIUPIPage = () => {
  return (
    <main className=' w-full overflow-hidden'>
      <HeaderUpiSection />
      <ContentSection />
      <DivisorSection />
      <StructureGenbiSection />
    </main>
  );
};

export default TentangGenBIUPIPage;
