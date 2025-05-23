import React from 'react';

import { BreadCrumb } from '@/components/breadcrumbs';

import { breadcrumbAddDepartmentData } from '@/modules/admin/departments/add/constant';

const HeaderAddDepartmentSection = () => {
  return (
    <div className='flex flex-col  border-b pb-5'>
      <BreadCrumb
        items={breadcrumbAddDepartmentData}
        textColor='text-primary-main'
      />
      <div className='flex flex-col lg:flex-row justify-between lg:items-center gap-y-4'>
        <h3 className='text-primary-900'>Add New Department</h3>
      </div>
    </div>
  );
};

export default HeaderAddDepartmentSection;
