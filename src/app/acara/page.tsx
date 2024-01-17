import React from 'react';

import ContentEventSection from '@/modules/acara/content-section';
import HeaderAcaraSection from '@/modules/acara/header-section';

const AcaraPage = () => {
  return (
    <main className='overflow-hidden'>
      <HeaderAcaraSection />
      <ContentEventSection />
    </main>
  );
};

export default AcaraPage;
