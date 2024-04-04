import React from 'react';

import { BreadCrumb } from '@/components/breadcrumbs';

import { breadcrumbAddEventsData } from '@/modules/admin/events/add/constant';

const HeaderAddEventsSection = () => {
  return (
    <div className='flex flex-col  border-b pb-5'>
      <BreadCrumb
        items={breadcrumbAddEventsData}
        textColor='text-primary-main'
      />
      <div className='flex flex-col lg:flex-row justify-between lg:items-center gap-y-4'>
        <h3 className='text-primary-900'>Add Events</h3>
      </div>
    </div>
  );
};

export default HeaderAddEventsSection;
