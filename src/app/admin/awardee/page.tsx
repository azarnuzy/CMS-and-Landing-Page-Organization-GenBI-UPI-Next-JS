import React, { Suspense } from 'react';

import BaseLayout from '@/components/layouts/base';
import { LoadingSpinner } from '@/components/loading-spinner';

import ContentAwardeeSection from '@/modules/admin/awardee/content-section';
import HeaderAwardeetSection from '@/modules/admin/awardee/header-section';

const AwardeeAdminPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <main>
        <BaseLayout>
          <>
            <HeaderAwardeetSection />
            <ContentAwardeeSection />
          </>
        </BaseLayout>
      </main>
    </Suspense>
  );
};

export default AwardeeAdminPage;
