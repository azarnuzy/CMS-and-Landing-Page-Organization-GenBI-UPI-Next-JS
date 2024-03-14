'use client';

import { Trash } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { BiLinkExternal } from 'react-icons/bi';
import { LuPlus } from 'react-icons/lu';
import { MdDelete } from 'react-icons/md';
import { TbEdit } from 'react-icons/tb';
import { useRecoilState } from 'recoil';
import { toast } from 'sonner';

import { contentTrimmed } from '@/lib/utils/general-function';
import {
  useDeleteAppreciations,
  useGetAppreciations,
} from '@/hooks/appreciations/hook';

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
  const { mutate, status } = useDeleteAppreciations();

  const [id, setId] = useState(0);
  const [open, setOpen] = useState(false);

  const [parentRef] = useRecoilState(parentRefAdminAppreciationsState);

  const handlePageChange = async (page: number) => {
    await refetch();

    if (parentRef?.current) {
      parentRef?.current.scrollIntoView({ behavior: 'smooth' });
    }

    router.replace(`/admin/appreciations?page=${page}`);
  };

  const handleRemoveData = () => {
    // console.log(id);

    mutate(id, {
      onSuccess: () => {
        refetch();
        setOpen(false);
        setId(0);
        toast.success('Berhasil menghapus data');
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message || 'Gagal menghapus data');
      },
    });
  };

  return (
    <div className='pt-5 border rounded-3xl w-full mt-10 mb-5'>
      <div className='flex justify-end px-6 pb-5'>
        <Button
          asChild
          className='bg-primary-main text-neutral-100 text-sm font-semibold hover:bg-primary-600 rounded-full'
        >
          <Link className='flex gap-2 ' href='/admin/appreciations/add'>
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
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger
                      onClick={() => {
                        setId(item.id);
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
