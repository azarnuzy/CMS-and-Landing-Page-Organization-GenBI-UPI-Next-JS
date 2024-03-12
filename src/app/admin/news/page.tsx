import React, { Suspense } from 'react';

import BaseLayout from '@/components/layouts/base';
import { LoadingSpinner } from '@/components/loading-spinner';

import ContentNewsManagementSection from '@/modules/admin/news/content-section';
import HeaderNewsSection from '@/modules/admin/news/header-section';

const NewsManagementPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <main>
        <BaseLayout>
          <>
            <HeaderNewsSection />
            <ContentNewsManagementSection />
          </>
        </BaseLayout>
      </main>
    </Suspense>
  );
};

export default NewsManagementPage;
