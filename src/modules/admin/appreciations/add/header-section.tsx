import React from 'react';

import { BreadCrumb } from '@/components/breadcrumbs';

import { breadcrumbAddAppreciationsData } from '@/modules/admin/appreciations/add/constant';

const HeaderAddAppreciationsSection = () => {
  return (
    <div className='flex flex-col  border-b pb-5'>
      <BreadCrumb
        items={breadcrumbAddAppreciationsData}
        textColor='text-primary-main'
      />
      <div className='flex flex-col lg:flex-row justify-between lg:items-center gap-y-4'>
        <h3 className='text-primary-900'>Add Appreciations</h3>
      </div>
    </div>
  );
};

export default HeaderAddAppreciationsSection;
