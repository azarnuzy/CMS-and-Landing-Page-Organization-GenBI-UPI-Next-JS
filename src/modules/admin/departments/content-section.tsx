import Link from 'next/link';
import React from 'react';
import { BiLinkExternal } from 'react-icons/bi';
import { LuPlus } from 'react-icons/lu';
import { MdDelete } from 'react-icons/md';
import { TbEdit } from 'react-icons/tb';

import BadgeTag from '@/components/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { departmentData } from '@/modules/admin/departments/constant';

// import { departmentData } from '@/modules/admin/news/constant';

const ContentDepartmentManagementSection = () => {
  return (
    <div className='pt-5 border rounded-3xl w-full mt-10 mb-5'>
      <div className='flex justify-end px-6 pb-5'>
        <Button
          asChild
          className='bg-primary-main text-neutral-100 text-sm font-semibold hover:bg-primary-600 rounded-full'
        >
          <Link className='flex gap-2 ' href='/admin/news/add'>
            <LuPlus className='text-lg text-neutral-100' />
            <span>Tambah</span>
          </Link>
        </Button>
      </div>
      <Table className='border-b'>
        <TableHeader className='bg-neutral-50 '>
          <TableRow className=''>
            <TableHead className='text-neutral-500'>No</TableHead>
            <TableHead className='text-neutral-500 min-w-[100px] max-w-[200px]'>
              Name
            </TableHead>
            <TableHead className='text-neutral-500'>Divisions</TableHead>
            <TableHead className='text-neutral-500'>Awardees</TableHead>
            <TableHead className='text-neutral-500'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {departmentData.map((item, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className='text-ellipsis min-w-[100px] max-w-[200px]'>
                  {item.name}
                </TableCell>
                <TableCell>
                  <div className='flex gap-2 items-center'>
                    {item.division.map((item2, i) => (
                      <BadgeTag size='sm' key={i} title={item2} />
                    ))}
                  </div>
                </TableCell>
                <TableCell>{item.awardees}</TableCell>

                <TableCell className='flex gap-2 h-full '>
                  <Link href={`/admin/department/edit/${item.id}`}>
                    <TbEdit className='text-warning-main text-2xl' />
                  </Link>
                  <MdDelete className='text-error-main text-2xl' />
                  <Link target='_blank' href={`/tentang-genbi/upi/${item.id}`}>
                    <BiLinkExternal className='text-primary-main text-2xl' />
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ContentDepartmentManagementSection;
