'use client';

import React, { useState } from 'react';

import { useGetDepartmentById } from '@/hooks/departments/hook';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import AddDivisionModal from '@/modules/admin/departments/manage/add-division-modal';
import AwardeeSection from '@/modules/admin/departments/manage/awardee-section';
import EditDivisionModal from '@/modules/admin/departments/manage/edit-division-modal';
import ProgramDivisionSection from '@/modules/admin/departments/manage/program-section';

const ContentManageDepartmentSection = ({ id }: { id: string }) => {
  const { data } = useGetDepartmentById({ id: Number(id) });

  const [openAddDivision, setOpenAddDivision] = useState(false);

  return (
    <div className='py-5 border rounded-3xl w-full mt-10 mb-5'>
      <h4 className='px-4 text-lg text-neutral-600'>General Data</h4>
      <div className='px-3'>
        <Table>
          <TableBody>
            <TableRow className='border-hidden hover:bg-neutral-100'>
              <TableCell className='p-2 font-bold align-top'>Name</TableCell>
              <TableCell className='p-2 align-top'>:</TableCell>
              <TableCell className='p-2'>
                {data?.data?.department?.name}
              </TableCell>
            </TableRow>
            <TableRow className='border-hidden hover:bg-neutral-100'>
              <TableCell className='p-2  font-bold align-top'>
                Description
              </TableCell>
              <TableCell className='p-2 align-top'>:</TableCell>
              <TableCell className='p-2'>
                <div
                  className='content-dangerously'
                  dangerouslySetInnerHTML={{
                    __html: data?.data?.department?.description || '',
                  }}
                ></div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className='border rounded-3xl m-4'>
        <div className='p-4 flex justify-between items-center'>
          <h5 className='font-bold'>Division</h5>
          <AddDivisionModal
            open={openAddDivision}
            setOpen={setOpenAddDivision}
          />
        </div>
        <Table className='border-b'>
          <TableHeader className='bg-neutral-50 '>
            <TableRow className=''>
              <TableHead className='text-neutral-500'>No</TableHead>
              <TableHead className='text-neutral-500 min-w-[100px] max-w-[200px]'>
                Name
              </TableHead>
              <TableHead className='text-neutral-500'>Description</TableHead>
              <TableHead className='text-neutral-500'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.department?.divisions?.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className='text-ellipsis min-w-[100px] max-w-[200px]'>
                    {item.name}
                  </TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell className='flex gap-2 h-full items-center'>
                    <EditDivisionModal
                      data={{
                        department_id: data?.data?.department?.id,
                        description: item.description,
                        name: item.name,
                        id: item.id,
                      }}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      {data && (
        <>
          <ProgramDivisionSection data={data?.data} />
          <AwardeeSection data={data?.data} />
        </>
      )}
    </div>
  );
};

export default ContentManageDepartmentSection;
