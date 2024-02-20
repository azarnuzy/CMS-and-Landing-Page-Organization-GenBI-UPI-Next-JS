import React from 'react';

import ContentManageDepartmentSection from '@/modules/admin/departments/manage/content-section';
import HeaderManageDepartmentSection from '@/modules/admin/departments/manage/header-section';

const ManageDepartmentPage = ({
  params,
}: {
  params: { id: string; department_name: string };
}) => {
  const { department_name } = params;
  return (
    <main>
      <HeaderManageDepartmentSection name={department_name} />
      <ContentManageDepartmentSection department_name={department_name} />
    </main>
  );
};

export default ManageDepartmentPage;
