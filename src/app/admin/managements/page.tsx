import React, { Suspense } from 'react';

import { WideBaseLayout } from '@/components/layouts/base';
import { LoadingSpinner } from '@/components/loading-spinner';

const ManagementsAdminPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <main>
        <WideBaseLayout>
          <></>
        </WideBaseLayout>
      </main>
    </Suspense>
  );
};

export default ManagementsAdminPage;
