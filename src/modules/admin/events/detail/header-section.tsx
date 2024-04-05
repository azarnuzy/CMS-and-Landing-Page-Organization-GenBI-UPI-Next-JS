import React from 'react';

import { BreadCrumb } from '@/components/breadcrumbs';

import { breadcrumbEditEventsData } from '@/modules/admin/events/edit/constant';

const HeaderDetailEventSection = ({ id }: { id: string }) => {
  return (
    <div className='flex flex-col  border-b pb-5'>
      <BreadCrumb
        items={breadcrumbEditEventsData(id)}
        textColor='text-primary-main'
      />
      <div className='flex flex-col lg:flex-row justify-between lg:items-center gap-y-4'>
        <h3 className='text-primary-900'>Detail Event</h3>
      </div>
    </div>
  );
};

export default HeaderDetailEventSection;
