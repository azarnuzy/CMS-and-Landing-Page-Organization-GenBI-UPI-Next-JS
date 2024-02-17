import React, { Suspense } from 'react';

import { LoadingSpinner } from '@/components/loading-spinner';

import ContentSection from '@/modules/about-genbi/upi/content-section';
import DivisorSection from '@/modules/about-genbi/upi/divisor-section';
import GenbiBanggaSection from '@/modules/about-genbi/upi/genbi-bangga-section';
import HeaderUpiSection from '@/modules/about-genbi/upi/header-upi-section';
import StructureGenbiSection from '@/modules/about-genbi/upi/structur-genbi-section';

const TentangGenBIUPIPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <main className=' w-full overflow-hidden'>
        <HeaderUpiSection />
        <ContentSection />
        <DivisorSection />
        <StructureGenbiSection />
        <GenbiBanggaSection />
      </main>
    </Suspense>
  );
};

export default TentangGenBIUPIPage;
