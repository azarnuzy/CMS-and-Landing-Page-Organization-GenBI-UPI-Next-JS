import React from 'react';

import ContentDepartmentManagementSection from '@/modules/admin/departments/content-section';
import HeaderDepartmentManagementSection from '@/modules/admin/departments/header-section';

const DepartmentAdminPage = () => {
  return (
    <main>
      <HeaderDepartmentManagementSection />
      <ContentDepartmentManagementSection />
    </main>
  );
};

export default DepartmentAdminPage;
