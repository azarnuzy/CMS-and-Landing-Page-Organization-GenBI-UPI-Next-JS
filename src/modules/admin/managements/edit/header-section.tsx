import React from 'react';

import { BreadCrumb } from '@/components/breadcrumbs';

import { breadcrumbEditManagementsData } from '@/modules/admin/managements/edit/constant';

const HeaderEditManagementSection = ({ id }: { id: string }) => {
  return (
    <div className='flex flex-col  border-b pb-5'>
      <BreadCrumb
        items={breadcrumbEditManagementsData(id)}
        textColor='text-primary-main'
      />
      <div className='flex flex-col lg:flex-row justify-between lg:items-center gap-y-4'>
        <h3 className='text-primary-900'>Edit Managements</h3>
      </div>
    </div>
  );
};

export default HeaderEditManagementSection;
