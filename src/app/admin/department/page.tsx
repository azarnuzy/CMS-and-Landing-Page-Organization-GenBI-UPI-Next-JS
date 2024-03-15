import React, { Suspense } from 'react';

import { WideBaseLayout } from '@/components/layouts/base';
import { LoadingSpinner } from '@/components/loading-spinner';

import ContentDepartmentManagementSection from '@/modules/admin/departments/content-section';
import HeaderDepartmentManagementSection from '@/modules/admin/departments/header-section';

const DepartmentAdminPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <main>
        <WideBaseLayout>
          <>
            <HeaderDepartmentManagementSection />
            <ContentDepartmentManagementSection />
          </>
        </WideBaseLayout>
      </main>
    </Suspense>
  );
};

export default DepartmentAdminPage;
