import React from 'react';

import { WideBaseLayout } from '@/components/layouts/base';

import FormEditManagementSection from '@/modules/admin/managements/edit/form-section';
import HeaderEditManagementSection from '@/modules/admin/managements/edit/header-section';

const EditManagementsPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
    <WideBaseLayout>
      <>
        <HeaderEditManagementSection id={id} />
        <FormEditManagementSection />
      </>
    </WideBaseLayout>
  );
};

export default EditManagementsPage;
