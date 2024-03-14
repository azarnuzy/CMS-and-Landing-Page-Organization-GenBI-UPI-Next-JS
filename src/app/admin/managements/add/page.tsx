import React from 'react';

import { WideBaseLayout } from '@/components/layouts/base';

import FormAddManagementSection from '@/modules/admin/managements/add/form-section';
import HeaderAddManagementSection from '@/modules/admin/managements/add/header-section';

const AddManagementsAdminPage = () => {
  return (
    <WideBaseLayout>
      <>
        <HeaderAddManagementSection />
        <FormAddManagementSection />
      </>
    </WideBaseLayout>
  );
};

export default AddManagementsAdminPage;
