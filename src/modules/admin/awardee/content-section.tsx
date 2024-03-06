'use client';

import { Trash } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa6';
import { LuPlus } from 'react-icons/lu';
import { TbEdit } from 'react-icons/tb';
import { useRecoilState } from 'recoil';
import { toast } from 'sonner';

import { useDeleteAwardee, useGetAllAwardees } from '@/hooks/awardee/hook';

import BadgeTag from '@/components/badge';
import { LoadingSpinner } from '@/components/loading-spinner';
import Pagination from '@/components/pagination';
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
  awardeesDataState,
  parentRefAdminAwardeesState,
} from '@/recoils/admin/awardees/atom';

const ContentAwardeeSection = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data, refetch } = useGetAllAwardees({
    sort: 'created_at',
    type: 'desc',
    limit: 10,
    page: Number(searchParams.get('page')) || 1,
    department: searchParams.get('department') || '',
    management: searchParams.get('management') || '',
    search: searchParams.get('search') || '',
  });

  const [, setOpenDialog] = useState(false);

  const [dataAwardees, setDataAwardees] = useRecoilState(awardeesDataState);
  const [parentRef] = useRecoilState(parentRefAdminAwardeesState);

  const { mutate, status } = useDeleteAwardee();

  const handlePageChange = async (page: number) => {
    await refetch();

    let department = '';
    let management = '';
    let search = '';

    if (searchParams.get('department')) {
      department = `&department=${searchParams.get('department')}`;
    }

    if (searchParams.get('management')) {
      management = `&management=${searchParams.get('management')}`;
    }

    if (searchParams.get('search')) {
      search = `&search=${searchParams.get('search')}`;
    }

    if (parentRef?.current) {
      parentRef?.current.scrollIntoView({ behavior: 'smooth' });
    }

    router.replace(
      `/admin/awardee?page=${page}${department}${management}${search}`
    );
  };

  useEffect(() => {
    if (data) {
      setDataAwardees(data?.data);
    }
  }, [data, setDataAwardees]);

  const handleRemoveData = (id: number) => {
    mutate(id, {
      onSuccess: () => {
        refetch();
        setOpenDialog(false);
        toast.success('Berhasil menghapus data');
      },
      onError: () => {
        toast.error('Gagal menghapus data');
      },
    });
  };

  return (
    <div className='pt-5 border rounded-3xl w-full mt-10 mb-5 relative'>
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
      <Table ref={parentRef} className='border-b'>
        <TableHeader className='bg-neutral-50 '>
          <TableRow className=''>
            <TableHead className='text-neutral-500'>No</TableHead>
            <TableHead className='text-neutral-500'>NIM</TableHead>
            <TableHead className='text-neutral-500 min-w-[100px] max-w-[200px]'>
              Name
            </TableHead>
            <TableHead className='text-neutral-500'>Department</TableHead>
            <TableHead className='text-neutral-500'>Division</TableHead>

            <TableHead className='text-neutral-500'>Study Program</TableHead>
            <TableHead className='text-neutral-500'>Scholarship</TableHead>
            <TableHead className='text-neutral-500'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            dataAwardees?.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>
                    {' '}
                    {((data?.pagination?.currentPage || 1) - 1) * 10 +
                      index +
                      1}
                  </TableCell>
                  <TableCell>{item?.nim || '-'}</TableCell>
                  <TableCell className=''>
                    <div className='flex gap-2 items-center'>
                      <Image
                        src={item?.photo?.file_url || '/images/avatar.png'}
                        width={36}
                        className='rounded-full'
                        height={36}
                        alt='image-avatar'
                      />
                      {item?.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='w-fit'>
                      <BadgeTag size='sm' title={item?.department || ''} />
                    </div>
                  </TableCell>
                  <TableCell>
                    {' '}
                    <div className='w-fit'>
                      <BadgeTag
                        size='sm'
                        title={(item?.division as string) || 'Manager'}
                      />
                    </div>
                  </TableCell>
                  <TableCell>{item?.study_program}</TableCell>
                  <TableCell>{item?.scholarship || '-'}</TableCell>
                  <TableCell className='flex gap-2 h-full items-center'>
                    <Link href={`/admin/awardee/edit/${item?.id}`}>
                      <TbEdit className='text-warning-main text-2xl' />
                    </Link>
                    <Dialog onOpenChange={setOpenDialog}>
                      <DialogTrigger>
                        <FaTrash className='text-2xl text-error-main' />
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
                              asChild
                              type='button'
                              variant='destructive'
                              className='border-neutral-main bg-neutral-main rounded-full text-neutral-100  px-6 py-2.5 font-semibold w-full'
                            >
                              <div onClick={() => handleRemoveData(item.id)}>
                                Hapus
                              </div>
                            </Button>
                          </div>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>

                    <Button
                      asChild
                      size='sm'
                      className='bg-neutral-100 text-primary-main rounded-full text-sm font-semibold border-primary-main border hover:bg-neutral-100'
                    >
                      <Link
                        target='_blank'
                        href={`/admin/awardee/detail/${item?.id}`}
                      >
                        <span>Detail</span>
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <div className='flex justify-between items-center py-2'>
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
      {status === 'pending' && (
        <div className='absolute min-h-screen w-full bottom-0 right-0 z-10'>
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default ContentAwardeeSection;
