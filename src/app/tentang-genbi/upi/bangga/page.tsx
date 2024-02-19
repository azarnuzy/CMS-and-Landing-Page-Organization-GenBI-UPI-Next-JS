import { Metadata } from 'next';
import React, { Suspense } from 'react';

import { LoadingSpinner } from '@/components/loading-spinner';

import ContentGenBIBanggaSection from '@/modules/about-genbi/upi/bangga/content-section';
import HeaderGenBIBanggaSection from '@/modules/about-genbi/upi/bangga/header-upi-section';

export const metadata: Metadata = {
  title: 'GenBI Bangga',
  description:
    'GenBI UPI selalu mengapresiasi karya dan pencapaian anggotanya. Berikut adalah beberapa karya dan pencapaian anggota GenBI UPI.',
};

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
