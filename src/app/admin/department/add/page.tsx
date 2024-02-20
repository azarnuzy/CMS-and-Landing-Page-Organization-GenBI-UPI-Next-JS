import React from 'react';

import FormAddDepartmentSection from '@/modules/admin/departments/add/form-section';
import HeaderAddDepartmentSection from '@/modules/admin/departments/add/header-section';

const AddDepartmentPage = () => {
  return (
    <main>
      <HeaderAddDepartmentSection />
      <FormAddDepartmentSection />
    </main>
  );
};

export default AddDepartmentPage;
