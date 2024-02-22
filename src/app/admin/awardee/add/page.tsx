import React from 'react';

import AddAwardeeFormSection from '@/modules/admin/awardee/add/form-section';
import HeaderAddAwardeeSection from '@/modules/admin/awardee/add/header-section';

const AddAwardeePage = () => {
  return (
    <div>
      <HeaderAddAwardeeSection />
      <AddAwardeeFormSection />
    </div>
  );
};

export default AddAwardeePage;
