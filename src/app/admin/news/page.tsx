import React from 'react';

import ContentNewsManagementSection from '@/modules/admin/news/content-section';
import HeaderNewsSection from '@/modules/admin/news/header-section';

const NewsManagementPage = () => {
  return (
    <main>
      <HeaderNewsSection />
      <ContentNewsManagementSection />
    </main>
  );
};

export default NewsManagementPage;
