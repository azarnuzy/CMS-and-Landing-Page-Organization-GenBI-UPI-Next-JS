import React from 'react';

import { WideBaseLayout } from '@/components/layouts/base';

import FormAddAppreciationSection from '@/modules/admin/appreciations/add/form-section';
import HeaderAddAppreciationsSection from '@/modules/admin/appreciations/add/header-section';

const AddAppreciationsAdminPage = () => {
  return (
    <WideBaseLayout>
      <>
        <HeaderAddAppreciationsSection />
        <FormAddAppreciationSection />
      </>
    </WideBaseLayout>
  );
};

export default AddAppreciationsAdminPage;
