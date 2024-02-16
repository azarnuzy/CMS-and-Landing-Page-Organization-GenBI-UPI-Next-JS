import React from 'react';

import HeaderDetailAcaraSection from '@/modules/acara/detail/header-section';
import SimillarEventSection from '@/modules/acara/detail/simillar-event-section';

const AcaraDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <main>
      <HeaderDetailAcaraSection id={id} />
      <SimillarEventSection />
    </main>
  );
};

export default AcaraDetailPage;
