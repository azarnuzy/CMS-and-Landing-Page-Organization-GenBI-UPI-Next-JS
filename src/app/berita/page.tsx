import React, { Suspense } from 'react';

import { LoadingSpinner } from '@/components/loading-spinner';

import HiglightSection from '@/modules/news/highlight-section';
import NewsSection from '@/modules/news/news-section';

const NewsPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <main>
        <HiglightSection />
        <NewsSection />
      </main>
    </Suspense>
  );
};

export default NewsPage;
