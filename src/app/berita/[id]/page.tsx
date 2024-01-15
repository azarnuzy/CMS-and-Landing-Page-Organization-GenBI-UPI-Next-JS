import React from 'react';

import BaseLayout from '@/components/layouts/base';

import ContentSection from '@/modules/news/detail/content-section';
import SideContentSection from '@/modules/news/detail/side-content-section';

const DetailNewsPage = () => {
  return (
    <main>
      <BaseLayout>
        <div className='py-9 grid grid-cols-6 gap-14'>
          <ContentSection />
          <SideContentSection />
        </div>
      </BaseLayout>
    </main>
  );
};

export default DetailNewsPage;
