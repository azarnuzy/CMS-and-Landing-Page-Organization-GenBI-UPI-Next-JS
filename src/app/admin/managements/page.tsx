import React, { Suspense } from 'react';

import { WideBaseLayout } from '@/components/layouts/base';
import { LoadingSpinner } from '@/components/loading-spinner';

import ContentManagementsSection from '@/modules/admin/managements/content-section';
import HeaderManagementSection from '@/modules/admin/managements/header-section';

const ManagementsAdminPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <main>
        <WideBaseLayout>
          <>
            <HeaderManagementSection />
            <ContentManagementsSection />
          </>
        </WideBaseLayout>
      </main>
    </Suspense>
  );
};

export default ManagementsAdminPage;
