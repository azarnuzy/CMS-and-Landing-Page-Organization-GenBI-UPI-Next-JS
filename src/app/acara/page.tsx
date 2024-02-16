import React, { Suspense } from 'react';

import { LoadingSpinner } from '@/components/loading-spinner';

import ContentEventSection from '@/modules/acara/content-section';
import HeaderAcaraSection from '@/modules/acara/header-section';

const AcaraPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <main className='overflow-hidden'>
        <HeaderAcaraSection />
        <ContentEventSection />
      </main>
    </Suspense>
  );
};

export default AcaraPage;
