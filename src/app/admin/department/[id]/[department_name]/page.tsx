import React from 'react';

import { WideBaseLayout } from '@/components/layouts/base';

import ContentManageDepartmentSection from '@/modules/admin/departments/manage/content-section';
import HeaderManageDepartmentSection from '@/modules/admin/departments/manage/header-section';

const ManageDepartmentPage = ({
  params,
}: {
  params: { id: string; department_name: string };
}) => {
  const { department_name, id } = params;
  return (
    <main>
      <WideBaseLayout>
        <>
          <HeaderManageDepartmentSection name={department_name} />
          <ContentManageDepartmentSection id={id} />
        </>
      </WideBaseLayout>
    </main>
  );
};

export default ManageDepartmentPage;
