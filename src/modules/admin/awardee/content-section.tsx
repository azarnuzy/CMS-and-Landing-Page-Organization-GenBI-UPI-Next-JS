import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
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

import { awardeeData } from '@/modules/admin/awardee/constant';

// import { departmentData } from '@/modules/admin/news/constant';

const ContentAwardeeSection = () => {
  return (
    <div className='pt-5 border rounded-3xl w-full mt-10 mb-5'>
      <div className='flex justify-end px-6 pb-5'>
        <Button
          asChild
          className='bg-primary-main text-neutral-100 text-sm font-semibold hover:bg-primary-600 rounded-full'
        >
          <Link className='flex gap-2 ' href='/admin/awardee/add'>
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
            <TableHead className='text-neutral-500'>Department</TableHead>
            <TableHead className='text-neutral-500'>Year</TableHead>

            <TableHead className='text-neutral-500'>Study Program</TableHead>
            <TableHead className='text-neutral-500'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {awardeeData.map((item, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className='text-ellipsis min-w-[100px] max-w-[200px]'>
                  <div className='flex gap-2 items-center'>
                    <Image
                      src={item.photo}
                      width={36}
                      className='rounded-full'
                      height={36}
                      alt='image-avatar'
                    />
                    {item.name}
                  </div>
                </TableCell>
                <TableCell>
                  <div className='w-fit'>
                    <BadgeTag size='sm' title={item.department} />
                  </div>
                </TableCell>
                <TableCell>{item.year}</TableCell>
                <TableCell>{item.prodi}</TableCell>

                <TableCell className='flex gap-2 h-full items-center'>
                  <Link href={`/admin/awardee/edit/${item.id}`}>
                    <TbEdit className='text-warning-main text-2xl' />
                  </Link>
                  <MdDelete className='text-error-main text-2xl' />
                  <Link target='_blank' href={`/awardee/${item.id}`}>
                    <Button
                      asChild
                      size='sm'
                      className='bg-neutral-100 text-primary-main rounded-full text-sm font-semibold border-primary-main border hover:bg-neutral-100'
                    >
                      <Link href={`/admin/awardee/${item.id}/${item.name}`}>
                        <span>Detail</span>
                      </Link>
                    </Button>
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

export default ContentAwardeeSection;
