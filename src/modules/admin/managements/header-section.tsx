import React from 'react';

import { BreadCrumb } from '@/components/breadcrumbs';

import { breadcrumbManagementsData } from '@/modules/admin/managements/constant';

const HeaderAppreciationsSection = () => {
  return (
    <div className='flex flex-col  border-b pb-5'>
      <BreadCrumb
        items={breadcrumbManagementsData}
        textColor='text-primary-main'
      />
      <div className='flex flex-col lg:flex-row justify-between lg:items-center gap-y-4'>
        <h3 className='text-primary-900'>Managements Management</h3>
        <div className='flex gap-4 items-center'></div>
      </div>
    </div>
  );
};

export default HeaderAppreciationsSection;
