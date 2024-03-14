import React, { Suspense } from 'react';

import { WideBaseLayout } from '@/components/layouts/base';
import { LoadingSpinner } from '@/components/loading-spinner';

import ContenAppreciationsSection from '@/modules/admin/appreciations/content-section';
import HeaderAppreciationsSection from '@/modules/admin/appreciations/header-section';

const AppreciationsAdminPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <main>
        <WideBaseLayout>
          <>
            <HeaderAppreciationsSection />
            <ContenAppreciationsSection />
          </>
        </WideBaseLayout>
      </main>
    </Suspense>
  );
};

export default AppreciationsAdminPage;
