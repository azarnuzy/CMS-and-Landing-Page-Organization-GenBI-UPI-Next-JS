import React from 'react';

import { WideBaseLayout } from '@/components/layouts/base';

import FormAddDepartmentSection from '@/modules/admin/departments/add/form-section';
import HeaderAddDepartmentSection from '@/modules/admin/departments/add/header-section';

const AddDepartmentPage = () => {
  return (
    <main>
      <WideBaseLayout>
        <>
          <HeaderAddDepartmentSection />
          <FormAddDepartmentSection />
        </>
      </WideBaseLayout>
    </main>
  );
};

export default AddDepartmentPage;
