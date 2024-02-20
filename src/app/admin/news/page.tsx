import React, { Suspense } from 'react';

import { LoadingSpinner } from '@/components/loading-spinner';

import ContentNewsManagementSection from '@/modules/admin/news/content-section';
import HeaderNewsSection from '@/modules/admin/news/header-section';

const NewsManagementPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <main>
        <HeaderNewsSection />
        <ContentNewsManagementSection />
      </main>
    </Suspense>
  );
};

export default NewsManagementPage;
