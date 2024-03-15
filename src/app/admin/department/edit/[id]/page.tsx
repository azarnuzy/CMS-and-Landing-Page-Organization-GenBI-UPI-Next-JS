import React from 'react';

import { WideBaseLayout } from '@/components/layouts/base';

import FormEditDepartmentSection from '@/modules/admin/departments/edit/form-section';
import HeaderEditDepartmentSection from '@/modules/admin/departments/edit/header-section';

const EditDepartmentPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <WideBaseLayout>
      <>
        <HeaderEditDepartmentSection id={id} />
        <FormEditDepartmentSection />
      </>
    </WideBaseLayout>
  );
};

export default EditDepartmentPage;
