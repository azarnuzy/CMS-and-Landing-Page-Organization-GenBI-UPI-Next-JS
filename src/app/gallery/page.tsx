import React from 'react';

import GallerySection from '@/modules/gallery/gallery-section';
import HeaderGallerySection from '@/modules/gallery/header-section';

const GalleryPage = () => {
  return (
    <main>
      <HeaderGallerySection />
      <GallerySection />
    </main>
  );
};

export default GalleryPage;
