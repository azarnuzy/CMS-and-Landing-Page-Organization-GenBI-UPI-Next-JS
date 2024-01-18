import React from 'react';

import HeaderDetailAcaraSection from '@/modules/acara/detail/header-section';
import SimillarEventSection from '@/modules/acara/detail/simillar-event-section';

const AcaraDetailPage = () => {
  return (
    <main>
      <HeaderDetailAcaraSection />
      <SimillarEventSection />
    </main>
  );
};

export default AcaraDetailPage;
