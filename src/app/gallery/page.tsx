import { Metadata } from 'next';
import React, { Suspense } from 'react';

import { LoadingSpinner } from '@/components/loading-spinner';

import GallerySection from '@/modules/gallery/gallery-section';
import HeaderGallerySection from '@/modules/gallery/header-section';

export const metadata: Metadata = {
  title: 'Galeri',
  description: 'Galeri foto kegiatan GenBI UPI yang menarik dan informatif.',
};

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
