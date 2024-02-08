'use client';

import { ChevronDown } from 'lucide-react';
import React from 'react';
import { IoFilterSharp, IoSearch } from 'react-icons/io5';

import { BreadCrumb } from '@/components/breadcrumbs';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Label } from '@/components/ui/label';
import { MenubarSeparator } from '@/components/ui/menubar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import {
  breadcrumbNewsData,
  departmentData,
  filterData,
} from '@/modules/admin/news/constant';
const HeaderNewsSection = () => {
  return (
    <div className='flex flex-col gap-5 border-b-[3px] pb-5'>
      <BreadCrumb items={breadcrumbNewsData} textColor='text-primary-main' />
      <div className='flex justify-between items-center'>
        <h3 className='text-primary-900'>News Management</h3>
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
              placeholder='Search...'
              className='w-full min-w-[300px] bg-transparent outline-none'
            />
          </div>
          <Popover>
            <PopoverTrigger>
              {' '}
              <div className='border border-primary-main rounded-lg p-[10px] flex items-center'>
                <IoFilterSharp className='text-2xl text-primary-main' />
              </div>
            </PopoverTrigger>
            <PopoverContent>
              {' '}
              <div className='flex flex-col gap-2 rounded-[18px] '>
                <p className='text-neutral-800 py-2 px-4 font-medium text-base'>
                  Filter
                </p>
                <RadioGroup defaultValue='all-data'>
                  {filterData.map((item, i) => (
                    <div key={i} className=' flex items-center space-x-2 px-4'>
                      <RadioGroupItem value={item.id} id={item.id} />
                      <Label
                        className='text-base text-neutral-800'
                        htmlFor={item.id}
                      >
                        {item.name}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                <MenubarSeparator />
                <Collapsible>
                  <CollapsibleTrigger className='pb-2 justify-between flex items-center w-full'>
                    <p className='text-neutral-800 py-2 px-4 font-medium text-base'>
                      Department
                    </p>
                    <ChevronDown className='text-2xl text-neutral-600' />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <RadioGroup defaultValue='all-department'>
                      {departmentData.map((item, i) => (
                        <div
                          key={i}
                          className=' flex items-center space-x-2 px-4'
                        >
                          <RadioGroupItem value={item.id} id={item.id} />
                          <Label
                            className='text-base text-neutral-800'
                            htmlFor={item.id}
                          >
                            {item.name}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default HeaderNewsSection;
