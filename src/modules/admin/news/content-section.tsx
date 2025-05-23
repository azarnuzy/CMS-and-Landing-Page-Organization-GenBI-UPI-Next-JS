'use client';

import { Trash } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { BiLinkExternal } from 'react-icons/bi';
import { LuPlus } from 'react-icons/lu';
import { MdDelete } from 'react-icons/md';
import { TbEdit } from 'react-icons/tb';
import { useRecoilState } from 'recoil';
import { toast } from 'sonner';

import { badgeColor } from '@/lib/utils/badge-color';
import {
  useDeletePost,
  useGetAllPost,
  useGetSearchPost,
} from '@/hooks/posts/hook';

import Pagination from '@/components/pagination';
import MiniSpinner from '@/components/spinner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import {
  dataStatusAdminNewsState,
  parentRefAdminNewsState,
} from '@/recoils/admin/news/atom';
import { postsDataState } from '@/recoils/news/atom';

const ContentNewsManagementSection = () => {
  // const parentRef = useRef<HTMLTableElement>(null);

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
    {
      sort: 'created_at',
      type: 'desc',
      limit: 10,
      page: Number(searchParams.get('page')) || 1,
      keyword: searchParams.get('search') || '',
    }
  );

  const [open, setOpen] = useState(false);
  const [getId, setId] = useState(0);

  const { mutate, status } = useDeletePost();

  const [dataPost, setDataPost] = useRecoilState(postsDataState);
  const [parentRef] = useRecoilState(parentRefAdminNewsState);

  const [dataStatus] = useRecoilState(dataStatusAdminNewsState);

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

    if (parentRef?.current) {
      parentRef?.current.scrollIntoView({ behavior: 'smooth' });
    }

    router.replace(`/admin/news?page=${page}${filter}${search}`, {
      scroll: false,
    });
  };

  const handleRemoveData = () => {
    // console.log(id);

    mutate(getId, {
      onSuccess: () => {
        refetch();
        setOpen(false);
        toast.success('Berhasil menghapus data');
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message || 'Gagal menghapus data');
      },
    });
  };

  useEffect(() => {
    if (data && dataStatus === 'data') {
      setDataPost(data?.data);
    }

    if (dataSearchPost && dataStatus === 'search') {
      setDataPost(dataSearchPost?.data);
    }
  }, [data, dataSearchPost, dataStatus, setDataPost]);

  return (
    <div className='pt-5 border rounded-3xl w-full sm:mt-10 mb-5'>
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
                  <TableCell>{news.visitors}</TableCell>
                  <TableCell className='flex gap-2 h-full '>
                    <Link href={`/admin/news/edit/${news.id}`}>
                      <TbEdit className='text-warning-main text-2xl' />
                    </Link>
                    <Dialog open={open} onOpenChange={setOpen}>
                      <DialogTrigger
                        onClick={() => {
                          setId(news.id);
                        }}
                      >
                        <MdDelete className='text-2xl text-error-main' />
                      </DialogTrigger>
                      <DialogContent className='max-w-[320px] rounded-3xl '>
                        <DialogHeader>
                          <div className='flex flex-col gap-2'>
                            <div className='w-7 h-7 bg-error-100 rounded-full'>
                              <Trash className='text-error-main w-5 h-5 mx-auto my-1' />
                            </div>
                            <h4 className='text-error-main'>Hapus Data?</h4>
                            <p className='text-neutral-600'>
                              Data yang sudah dihapus tidak dapat dikembalikan
                              lagi harap periksa data sebelum menghapus
                            </p>
                          </div>
                          <div className='mt-7 w-full flex justify-between items-center gap-3'>
                            <DialogClose asChild>
                              <Button
                                className='rounded-full w-full'
                                type='button'
                                variant='secondary'
                              >
                                Batal
                              </Button>
                            </DialogClose>
                            <Button
                              type='button'
                              variant='destructive'
                              className='border-neutral-main bg-neutral-main rounded-full text-neutral-100  px-6 py-2.5 font-semibold w-full'
                              onClick={() => {
                                handleRemoveData();
                                setId(0);
                              }}
                            >
                              {status === 'pending' ? (
                                <div className='flex gap-2 items-center'>
                                  <MiniSpinner /> Loading...
                                </div>
                              ) : (
                                `Hapus`
                              )}
                            </Button>
                          </div>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                    <Link
                      target='_blank'
                      href={`/berita/${news.id}/${news.slug}`}
                    >
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
            Showing {((data?.pagination?.currentPage || 0) - 1) * 10 + 1} to{' '}
            {(data?.pagination?.currentPage || 0) * 10 >
            (data?.pagination?.totalRows || 0)
              ? dataStatus === 'data'
                ? data?.pagination?.totalRows || 0
                : dataSearchPost?.pagination?.totalRows || 0
              : dataStatus === 'data'
              ? (data?.pagination?.currentPage || 0) * 10
              : dataSearchPost?.pagination?.currentPage}{' '}
            of{' '}
            {dataStatus === 'data'
              ? data?.pagination?.totalRows
              : dataSearchPost?.pagination?.totalRows}{' '}
            entries
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
