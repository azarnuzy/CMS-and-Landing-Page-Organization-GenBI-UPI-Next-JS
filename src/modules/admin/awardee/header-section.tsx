import React from 'react';
import { IoSearch } from 'react-icons/io5';

import { BreadCrumb } from '@/components/breadcrumbs';

import { breadcrumbAwardeeData } from '@/modules/admin/awardee/constant';

const HeaderAwardeetSection = () => {
  return (
    <div className='flex flex-col  border-b pb-5'>
      <BreadCrumb items={breadcrumbAwardeeData} textColor='text-primary-main' />
      <div className='flex flex-col lg:flex-row justify-between lg:items-center gap-y-4'>
        <h3 className='text-primary-900'>Awardee Management </h3>
        <div className='flex gap-4 items-center'>
          <div className='rounded-full border border-neutral-300 py-2.5 px-6 flex gap-2'>
            <label
              className=' rounded-full  flex items-center justify-center'
              htmlFor='search'
            >
              <IoSearch className='text-neutral-main text-xl' />
            </label>
            <input
              type='text'
              id='search'
              placeholder='Cari Berita dan Tekan Enter...'
              // value={inputSearch}
              // onChange={(e) => setInputSearch(e.target.value)}
              // onKeyDown={handleKeyDownSearch}
              className='w-full min-w-[300px] bg-transparent outline-none'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderAwardeetSection;
