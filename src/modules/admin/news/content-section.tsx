'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { BiLinkExternal } from 'react-icons/bi';
import { LuPlus } from 'react-icons/lu';
import { MdDelete } from 'react-icons/md';
import { TbEdit } from 'react-icons/tb';
import { useRecoilState } from 'recoil';

import { badgeColor } from '@/lib/utils/badge-color';
import { useGetAllPost, useGetSearchPost } from '@/hooks/posts/hook';

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

import { postsDataState } from '@/recoils/news/atom';

const ContentNewsManagementSection = () => {
  const parentRef = useRef<HTMLTableElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const { data, refetch } = useGetAllPost({
    sort: 'created_at',
    type: 'desc',
    limit: 10,
    page: Number(searchParams.get('page')) || 1,
    filter: searchParams.get('filter') || '',
  });
  const { data: dataSearchPost, refetch: refetchSearchPost } = useGetSearchPost(
    { keyword: searchParams.get('search') || '' }
  );

  // const { data: dataTags } = useGetDepartmentsTags();

  const [dataPost, setDataPost] = useRecoilState(postsDataState);

  // const [inputSearch] = useState('');
  const [dataStatus] = useState('data');

  const handlePageChange = async (page: number) => {
    if (dataStatus === 'search') {
      await refetchSearchPost();
    } else if (dataStatus === 'data') {
      await refetch();
    }

    let filter = '';
    let search = '';
    if (searchParams.get('filter')) {
      filter = `&filter=${searchParams.get('filter')}`;
    }

    if (searchParams.get('search')) {
      search = `&search=${searchParams.get('search')}`;
    }

    if (parentRef.current) {
      parentRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    router.replace(`/admin/news?page=${page}${filter}${search}`, {
      scroll: false,
    });
  };

  // const handleFilterChange = async (filter: string) => {
  //   setDataStatus('data');
  //   await refetch();
  //   let tempFilter = '';

  //   if (filter.length > 0) {
  //     tempFilter = `&filter=${filter}`;
  //   }
  //   if (parentRef.current) {
  //     parentRef.current.scrollIntoView({ behavior: 'smooth' });
  //   }
  //   router.replace(`/admin/news?page=1${tempFilter}`, { scroll: false });
  // };

  // const handleKeyDownSearch = async (
  //   e: React.KeyboardEvent<HTMLInputElement>
  // ) => {
  //   if (e.key === 'Enter') {
  //     setDataStatus('search');
  //     refetchSearchPost();
  //     if (parentRef.current) {
  //       parentRef.current.scrollIntoView({ behavior: 'smooth' });
  //     }
  //     router.replace(`/admin/news?page=1&search=${inputSearch}`, {
  //       scroll: false,
  //     });
  //   }
  // };

  useEffect(() => {
    if (data && dataStatus === 'data') {
      setDataPost(data?.data);
    }

    if (dataSearchPost && dataStatus === 'search') {
      setDataPost(dataSearchPost?.data);
    }
  }, [data, dataSearchPost, dataStatus, setDataPost]);

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
      <Table ref={parentRef} className='border-b'>
        <TableHeader className='bg-neutral-50 '>
          <TableRow className=''>
            <TableHead className='text-neutral-500'>No</TableHead>
            <TableHead className='text-neutral-500 min-w-[100px] max-w-[200px]'>
              Title
            </TableHead>
            <TableHead className='text-neutral-500'>Type</TableHead>
            <TableHead className='text-neutral-500'>Department</TableHead>
            {/* <TableHead className='text-neutral-500'>Author</TableHead> */}
            <TableHead className='text-neutral-500'>Viewers</TableHead>
            <TableHead className='text-neutral-500'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            dataPost?.map((news, index) => {
              const tag1 = news.type.split(' ').join('-').toLowerCase();
              const tag2 = news.department_name
                .split(' ')
                .join('-')
                .toLowerCase();
              return (
                <TableRow key={index}>
                  <TableCell>
                    {((data?.pagination?.currentPage || 0) - 1) * 10 +
                      index +
                      1}
                  </TableCell>
                  <TableCell className='text-ellipsis min-w-[100px] max-w-[200px]'>
                    {news.title}
                  </TableCell>
                  <TableCell>
                    <div
                      className={`px-2.5 py-0.5 ${badgeColor(
                        (tag1 as string) || ''
                      )} rounded-full whitespace-nowrap border text-xs w-fit`}
                    >
                      {news.type}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div
                      className={`px-2.5 py-0.5 ${badgeColor(
                        (tag2 as string) || ''
                      )} rounded-full whitespace-nowrap border text-xs w-fit`}
                    >
                      {news.department_name}
                    </div>
                  </TableCell>
                  {/* <TableCell>
                  <Avatar className='w-10 h-10'>
                    <AvatarImage src={news.} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </TableCell> */}
                  <TableCell>{news.visitors}</TableCell>
                  <TableCell className='flex gap-2 h-full '>
                    <Link href={`/admin/news/edit/${news.id}`}>
                      <TbEdit className='text-warning-main text-2xl' />
                    </Link>
                    <MdDelete className='text-error-main text-2xl' />
                    <Link
                      target='_blank'
                      href={`berita/${news.id}/${news.slug}`}
                    >
                      <BiLinkExternal className='text-primary-main text-2xl' />
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <div className='flex justify-between items-center py-2'>
        <div className='w-full flex justify-center '>
          <p className='text-sm'>
            Showing {((data?.pagination?.currentPage || 0) - 1) * 10 + 1} to{' '}
            {(data?.pagination?.currentPage || 0) * 10 >
            (data?.pagination?.totalRows || 0)
              ? data?.pagination?.totalRows || 0
              : (data?.pagination?.currentPage || 0) * 10}{' '}
            of {data?.pagination?.totalRows} entries
          </p>
        </div>
        <div className='w-full'>
          <Pagination
            currentPage={
              dataStatus === 'data'
                ? Number(data?.pagination?.currentPage)
                : Number(dataSearchPost?.pagination?.currentPage) || 1
            }
            totalPages={
              dataStatus === 'search'
                ? Number(dataSearchPost?.pagination?.totalPages)
                : Number(data?.pagination?.totalPages) || 1
            }
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ContentNewsManagementSection;
