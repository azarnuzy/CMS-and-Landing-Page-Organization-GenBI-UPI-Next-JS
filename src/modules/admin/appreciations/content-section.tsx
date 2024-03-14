'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { BiLinkExternal } from 'react-icons/bi';
import { LuPlus } from 'react-icons/lu';
import { MdDelete } from 'react-icons/md';
import { TbEdit } from 'react-icons/tb';
import { useRecoilState } from 'recoil';

import { contentTrimmed } from '@/lib/utils/general-function';
import { useGetAppreciations } from '@/hooks/appreciations/hook';

import Pagination from '@/components/pagination';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { parentRefAdminAppreciationsState } from '@/recoils/admin/appreciations/atom';

// import { departmentData } from '@/modules/admin/news/constant';

const ContenAppreciationsSection = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { data, refetch } = useGetAppreciations({
    sort: 'created_at',
    type: 'desc',
    limit: 10,
    page: Number(searchParams.get('page')) || 1,
  });

  const [parentRef] = useRecoilState(parentRefAdminAppreciationsState);

  const handlePageChange = async (page: number) => {
    await refetch();

    if (parentRef?.current) {
      parentRef?.current.scrollIntoView({ behavior: 'smooth' });
    }

    router.replace(`/admin/appreciations?page=${page}`);
  };

  return (
    <div className='pt-5 border rounded-3xl w-full mt-10 mb-5'>
      <div className='flex justify-end px-6 pb-5'>
        <Button
          asChild
          className='bg-primary-main text-neutral-100 text-sm font-semibold hover:bg-primary-600 rounded-full'
        >
          <Link className='flex gap-2 ' href='/admin/department/add'>
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
              Title
            </TableHead>
            <TableHead className='text-neutral-500'>Cover</TableHead>
            <TableHead className='text-neutral-500'>Given Date</TableHead>
            <TableHead className='text-neutral-500'>Caption</TableHead>
            <TableHead className='text-neutral-500'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((item, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className='text-ellipsis min-w-[100px] max-w-[200px]'>
                  {item.title}
                </TableCell>
                <TableCell className='max-w-[100px]'>
                  <div className='max-h-[100px] w-full'>
                    <Image
                      src={item?.cover?.file_url}
                      alt={item?.cover?.alt}
                      width={0}
                      height={0}
                      sizes='30vw'
                      className='object-cover w-full h-full'
                    />
                  </div>
                </TableCell>
                <TableCell>{item.given_date}</TableCell>
                <TableCell>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: contentTrimmed(item?.caption, 120),
                    }}
                  ></div>{' '}
                </TableCell>

                <TableCell className='flex gap-2 h-full items-center'>
                  <Link href={`/admin/appreciations/edit/${item.id}`}>
                    <TbEdit className='text-warning-main text-2xl' />
                  </Link>
                  <MdDelete className='text-error-main text-2xl' />
                  <Link target='_blank' href={item?.instagram_url}>
                    <BiLinkExternal className='text-primary-main text-2xl' />
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className='flex flex-col sm:flex-row justify-between items-center py-2'>
        <div className='w-full flex justify-center '>
          <p className='text-sm'>
            Showing {((data?.pagination?.currentPage || 1) - 1) * 10 + 1} to{' '}
            {(data?.pagination?.currentPage || 0) * 10 >
            (data?.pagination?.totalRows || 0)
              ? data?.pagination?.totalRows || 0
              : (data?.pagination?.currentPage || 0) * 10}
          </p>
        </div>
        <div className='w-full'>
          <Pagination
            currentPage={data?.pagination?.currentPage || 1}
            totalPages={data?.pagination?.totalPages || 1}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ContenAppreciationsSection;
