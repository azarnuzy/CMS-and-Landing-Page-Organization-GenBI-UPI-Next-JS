import React, { Suspense } from 'react';

import { LoadingSpinner } from '@/components/loading-spinner';

import GallerySection from '@/modules/gallery/gallery-section';
import HeaderGallerySection from '@/modules/gallery/header-section';

const GalleryPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <main>
        <HeaderGallerySection />
        <GallerySection />
      </main>
    </Suspense>
  );
};

export default GalleryPage;
