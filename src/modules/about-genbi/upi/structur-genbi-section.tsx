import React from 'react';

import BaseLayout from '@/components/layouts/base';

const StructureGenbiSection = () => {
  return (
    <div className='py-10'>
      <BaseLayout>
        <div className='flex flex-col gap-9'>
          <h1 className='text-neutral-main text-center'>Executive</h1>
          <div className='flex gap-8 sm:gap-10 md:gap-12 lg:gap-14'></div>
        </div>
      </BaseLayout>
    </div>
  );
};

export default StructureGenbiSection;
