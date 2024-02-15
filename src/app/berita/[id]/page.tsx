import { useParams } from 'next/navigation';
import React from 'react';

import BaseLayout from '@/components/layouts/base';

import ContentSection from '@/modules/news/detail/content-section';
import SideContentSection from '@/modules/news/detail/side-content-section';

const DetailNewsPage = () => {
  const params = useParams();
  const { id } = params;
  return (
    <main>
      <BaseLayout>
        <div className='py-9 grid grid-cols-6 gap-14'>
          <ContentSection id={Number(id)} />
          <SideContentSection />
        </div>
      </BaseLayout>
    </main>
  );
};

export default DetailNewsPage;
