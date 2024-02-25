'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react';
import { IoSearch } from 'react-icons/io5';
import { useRecoilState } from 'recoil';

import { useGetOptionDepartments } from '@/hooks/departments/hook';
import { useGetOptionManagements } from '@/hooks/managements/hook';

import { BreadCrumb } from '@/components/breadcrumbs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { breadcrumbAwardeeData } from '@/modules/admin/awardee/constant';
import {
  filterAdminAwardeeDepartmentState,
  filterAdminAwardeeManagementState,
  parentRefAdminAwardeesState,
  searchAdminAwardeeState,
} from '@/recoils/admin/awardees/atom';

const HeaderAwardeetSection = () => {
  const { data: dataManagement } = useGetOptionManagements();
  const { data: dataDepartment } = useGetOptionDepartments();
  const queryClient = useQueryClient();

  const router = useRouter();

  const [inputSearch, setInputSearch] = useRecoilState(searchAdminAwardeeState);
  const [department, setDepartment] = useRecoilState(
    filterAdminAwardeeDepartmentState
  );
  const [management, setManagement] = useRecoilState(
    filterAdminAwardeeManagementState
  );

  const [parentRef] = useRecoilState(parentRefAdminAwardeesState);

  const handleFilterDepartmentChange = async (filter: string) => {
    let tempSearch = '';
    let tempManagement = '';
    let tempDepartment = '';

    if (inputSearch.length > 0) {
      tempSearch = `&search=${inputSearch}`;
    }

    if (management.length > 0 && management !== '0') {
      tempManagement = `&management=${management}`;
    }

    if (filter !== '0') {
      tempDepartment = `&department=${filter}`;
    }

    router.replace(
      `/admin/awardee?${tempDepartment}${tempSearch}${tempManagement}`,
      { scroll: false }
    );
    queryClient.invalidateQueries({ queryKey: ['all-awardees'] });
    if (parentRef?.current) {
      parentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    setDepartment(filter);
  };

  const handleFilterManagementChange = async (filter: string) => {
    let tempSearch = '';
    let tempDepartment = '';
    let tempManagement = '';

    if (inputSearch.length > 0) {
      tempSearch = `&search=${inputSearch}`;
    }

    if (department.length > 0) {
      tempDepartment = `&department=${department}`;
    }

    if (filter !== '0') {
      tempManagement = `&management=${filter}`;
    }

    router.replace(
      `/admin/awardee?${tempDepartment}${tempSearch}${tempManagement}`,
      { scroll: false }
    );
    queryClient.invalidateQueries({ queryKey: ['all-awardees'] });
    if (parentRef?.current) {
      parentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    setManagement(filter);
  };

  const handleKeyDownSearch = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      let tempManagement = '';
      let tempDepartment = '';
      let tempSearch = '';
      if (management.length > 0) {
        tempManagement = `&management=${management}`;
      }

      if (department.length > 0) {
        tempDepartment = `&department=${department}`;
      }

      if (inputSearch.length > 0) {
        tempSearch = `&search=${inputSearch}`;
      }
      router.replace(
        `/admin/awardee?${tempDepartment}${tempSearch}${tempManagement}`,
        { scroll: false }
      );

      queryClient.invalidateQueries({ queryKey: ['all-awardees'] });
      if (parentRef?.current) {
        parentRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className='flex flex-col  border-b pb-5'>
      <BreadCrumb items={breadcrumbAwardeeData} textColor='text-primary-main' />
      <div className='flex flex-col xl:flex-row justify-between xl:items-center gap-y-4'>
        <h3 className='text-primary-900'>Awardee Management </h3>
        <div className='flex gap-4  lg:flex-row flex-col '>
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
              placeholder='Search Name of Awardee and Press Enter...'
              value={inputSearch}
              onChange={(e) => setInputSearch(e.target.value)}
              onKeyDown={handleKeyDownSearch}
              className='w-full min-w-[300px] bg-transparent outline-none'
            />
          </div>
          <div className='flex gap-4 items-center'>
            <Select
              onValueChange={(e) => {
                handleFilterManagementChange(e);
              }}
            >
              <SelectTrigger className='min-w-fit bg-primary-main text-neutral-100 border-primary-main focus:outline-none focus:ring-0'>
                <SelectValue placeholder='Select Period' />
              </SelectTrigger>
              <SelectContent>
                {[
                  {
                    id: '0',
                    name: 'All Managements',
                  },
                  ...(dataManagement?.data || []),
                ].map((item, i) => (
                  <SelectItem key={i} value={String(item.id) || ''}>
                    {item.name || '-'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              onValueChange={(e) => {
                handleFilterDepartmentChange(e);
              }}
            >
              <SelectTrigger className='min-w-fit bg-primary-main text-neutral-100 border-primary-main focus:outline-none focus:ring-0'>
                <SelectValue placeholder='Select Department' />
              </SelectTrigger>
              <SelectContent>
                {[
                  {
                    id: '0',
                    name: 'All Departments',
                  },
                  ...(dataDepartment?.data || []),
                ].map((item, i) => (
                  <SelectItem key={i} value={String(item.id) || ''}>
                    {item.name || '-'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderAwardeetSection;
