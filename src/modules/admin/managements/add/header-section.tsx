import React from 'react';

import { BreadCrumb } from '@/components/breadcrumbs';

import { breadcrumbAddManagementsData } from '@/modules/admin/managements/add/constant';

const HeaderAddManagementSection = () => {
  return (
    <div className='flex flex-col  border-b pb-5'>
      <BreadCrumb
        items={breadcrumbAddManagementsData}
        textColor='text-primary-main'
      />
      <div className='flex flex-col lg:flex-row justify-between lg:items-center gap-y-4'>
        <h3 className='text-primary-900'>Add Management</h3>
      </div>
    </div>
  );
};

export default HeaderAddManagementSection;
