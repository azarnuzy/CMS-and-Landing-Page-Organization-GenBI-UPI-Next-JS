import React, { Suspense } from 'react';

import { LoadingSpinner } from '@/components/loading-spinner';

import ContentGenBIBanggaSection from '@/modules/about-genbi/upi/bangga/content-section';
import HeaderGenBIBanggaSection from '@/modules/about-genbi/upi/bangga/header-upi-section';

const GenbiBanggaPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <main>
        <HeaderGenBIBanggaSection />
        <ContentGenBIBanggaSection />
      </main>
    </Suspense>
  );
};

export default GenbiBanggaPage;
