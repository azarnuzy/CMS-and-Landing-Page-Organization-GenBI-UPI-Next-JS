import Link from 'next/link';
import React from 'react';
import { BiLinkExternal } from 'react-icons/bi';
import { LuPlus } from 'react-icons/lu';
import { MdDelete } from 'react-icons/md';
import { TbEdit } from 'react-icons/tb';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { newsData } from '@/modules/admin/news/constant';

import { TBadgeVariantProps } from '@/types/components/badge';

const ContentNewsManagementSection = () => {
  return (
    <div className='pt-5 border rounded-3xl w-full mt-10 mb-5'>
      <div className='flex justify-end px-6 pb-5'>
        <Button
          asChild
          className='bg-primary-main text-neutral-100 text-sm font-semibold hover:bg-primary-600 rounded-full'
        >
          <Link className='flex gap-2 ' href='/admin/news/'>
            <LuPlus className='text-lg text-neutral-100' />
            <span>Tambah</span>
          </Link>
        </Button>
      </div>
      <Table className='border-b'>
        <TableHeader className='bg-neutral-50 '>
          <TableRow className=''>
            <TableHead className='text-neutral-500'>No</TableHead>
            <TableHead className='text-neutral-500'>Title</TableHead>
            <TableHead className='text-neutral-500'>Type</TableHead>
            <TableHead className='text-neutral-500'>Department</TableHead>
            <TableHead className='text-neutral-500'>Author</TableHead>
            <TableHead className='text-neutral-500'>Viewers</TableHead>
            <TableHead className='text-neutral-500'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {newsData.map((news, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell className='text-ellipsis max-w-[150px]'>
                {news.title}
              </TableCell>
              <TableCell>
                <Badge variant={news.type as TBadgeVariantProps}>
                  {news.type}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={news.department as TBadgeVariantProps}>
                  {news.department}
                </Badge>
              </TableCell>
              <TableCell>
                <Avatar className='w-10 h-10'>
                  <AvatarImage src='/images/avatar.jpeg' />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>120</TableCell>
              <TableCell className='flex gap-2 h-full '>
                <TbEdit className='text-warning-main text-2xl' />
                <MdDelete className='text-error-main text-2xl' />
                <BiLinkExternal className='text-primary-main text-2xl' />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className='flex justify-between items-center py-2'>
        <div className='w-full flex justify-center '>
          <p className='text-sm'>Showing 1 to 10 of 200 entries</p>
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationPrevious href='#' />
            <PaginationLink href='#'>1</PaginationLink>
            <PaginationLink href='#'>2</PaginationLink>
            <PaginationEllipsis />
            <PaginationLink href='#'>10</PaginationLink>
            <PaginationNext href='#' />
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default ContentNewsManagementSection;
