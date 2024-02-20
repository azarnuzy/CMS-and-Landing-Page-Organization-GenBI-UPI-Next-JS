import React from 'react';
import { LuChevronsUpDown } from 'react-icons/lu';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

import {
  defaultHTMLContent,
  programsDepartmentConstant,
} from '@/modules/admin/departments/manage/constant';

const ContentManageDepartmentSection = ({
  department_name,
}: {
  department_name: string;
}) => {
  return (
    <div className='pt-5 border rounded-3xl w-full mt-10 mb-5'>
      <h5 className='px-4 text-lg text-neutral-500'>General Data</h5>
      <Table>
        <TableBody>
          <TableRow className='border-hidden hover:bg-neutral-100'>
            <TableCell className='p-2 font-bold align-top'>Name</TableCell>
            <TableCell className='p-2 align-top'>:</TableCell>
            <TableCell className='p-2'>{department_name} Department</TableCell>
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
                  __html: defaultHTMLContent,
                }}
              ></div>
            </TableCell>
          </TableRow>
          <TableRow className='border-hidden hover:bg-neutral-100'>
            <TableCell className='p-2  font-bold align-top'>Program</TableCell>
            <TableCell className='p-2 align-top'>:</TableCell>
            <TableCell className='p-2'>
              <Collapsible>
                <CollapsibleTrigger className='flex gap-2 items-center text-primary-main mb-4 font-bold'>
                  See Program{' '}
                  <LuChevronsUpDown className=' text-primary-main' />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className='flex flex-col gap-3'>
                    {programsDepartmentConstant.map((item, index) => (
                      <div key={index} className='flex flex-col gap-1 w-full'>
                        <span className='text-primary-main font-semibold'>
                          {item.title}
                        </span>
                        <div>
                          <p className='text-sm text-neutral-600'>
                            {item.description}
                          </p>
                          <p className='text-sm text-neutral-600 italic'>
                            {item.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default ContentManageDepartmentSection;
