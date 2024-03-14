import React from 'react';

import { WideBaseLayout } from '@/components/layouts/base';

import AddAwardeeFormSection from '@/modules/admin/awardee/add/form-section';
import HeaderAddAwardeeSection from '@/modules/admin/awardee/add/header-section';

const AddAwardeePage = () => {
  return (
    <WideBaseLayout>
      <>
        <HeaderAddAwardeeSection />
        <AddAwardeeFormSection />
      </>
    </WideBaseLayout>
  );
};

export default AddAwardeePage;
