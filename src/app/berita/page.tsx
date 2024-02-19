import { Metadata } from 'next';
import React, { Suspense } from 'react';

import { LoadingSpinner } from '@/components/loading-spinner';

import HiglightSection from '@/modules/news/highlight-section';
import NewsSection from '@/modules/news/news-section';

export const metadata: Metadata = {
  title: 'Berita',
  description:
    'Berita yang pasti menarik dan informatif dari GenBI UPI baik itu berupa info beasiswa, kegiatan, kebijakan Bank Indonesia, dan lainnya.',
};

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
