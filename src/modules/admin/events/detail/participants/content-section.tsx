'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { useRecoilState } from 'recoil';

import { useGetEventParticipants } from '@/hooks/events/hook';

import Pagination from '@/components/pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { parentRefAdminAwardeesState } from '@/recoils/admin/awardees/atom';

const ContentParticipantSection = ({ id }: { id: number }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data, refetch } = useGetEventParticipants({
    id,
    params: {
      sort: 'created_at',
      type: 'desc',
      limit: 10,
      page: Number(searchParams.get('page')) || 1,
    },
  });

  const [parentRef] = useRecoilState(parentRefAdminAwardeesState);

  const handlePageChange = async (page: number) => {
    await refetch();

    if (parentRef?.current) {
      parentRef?.current.scrollIntoView({ behavior: 'smooth' });
    }

    router.replace(`/admin/events/detail/${id}?page=${page}`);
  };

  return (
    <div className='pt-5 border rounded-3xl w-full mt-10 mb-5 relative'>
      <Table ref={parentRef} className='border-b'>
        <TableHeader className='bg-neutral-50 '>
          <TableRow className=''>
            <TableHead className='text-neutral-500'>No</TableHead>
            <TableHead className='text-neutral-500'>Name</TableHead>
            <TableHead className='text-neutral-500 min-w-[100px] max-w-[200px]'>
              Email
            </TableHead>
            <TableHead className='text-neutral-500'>Institution</TableHead>
            <TableHead className='text-neutral-500'>Role</TableHead>

            <TableHead className='text-neutral-500'>Field</TableHead>
            <TableHead className='text-neutral-500'>Phone Number</TableHead>
            <TableHead className='text-neutral-500'>City</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            data?.data?.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>
                    {' '}
                    {((data?.pagination?.currentPage || 1) - 1) * 10 +
                      index +
                      1}
                  </TableCell>
                  <TableCell>{item.name || '-'}</TableCell>
                  <TableCell>{item.email || '-'}</TableCell>
                  <TableCell>{item.institution || '-'}</TableCell>
                  <TableCell>{item.role || '-'}</TableCell>
                  <TableCell>{item.field || '-'}</TableCell>
                  <TableCell>{item.telp || '-'}</TableCell>
                  <TableCell>{item.city || '-'}</TableCell>
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

export default ContentParticipantSection;
