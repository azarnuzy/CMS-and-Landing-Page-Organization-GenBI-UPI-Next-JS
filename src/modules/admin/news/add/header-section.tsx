import React from 'react';

import { BreadCrumb } from '@/components/breadcrumbs';
import BaseLayout from '@/components/layouts/base';

import { breadcrumbAddNewsData } from '@/modules/admin/news/add/constant';

const HeaderAddNewsSection = () => {
  return (
    <BaseLayout>
      <div className='flex flex-col  border-b pb-5'>
        <BreadCrumb
          items={breadcrumbAddNewsData}
          textColor='text-primary-main'
        />
        <div className='flex flex-col lg:flex-row justify-between lg:items-center gap-y-4'>
          <h3 className='text-primary-900'>Add News</h3>
        </div>
      </div>
    </BaseLayout>
  );
};

export default HeaderAddNewsSection;
