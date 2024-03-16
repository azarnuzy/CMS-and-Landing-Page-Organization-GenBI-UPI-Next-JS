'use client';

import { Trash } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { LuPlus } from 'react-icons/lu';
import { MdDelete } from 'react-icons/md';
import { TbEdit } from 'react-icons/tb';
import { toast } from 'sonner';

import { contentTrimmed } from '@/lib/utils/general-function';
import { useGetDepartmentById } from '@/hooks/departments/hook';
import { useDeleteDivision } from '@/hooks/division/hook';

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

import AddDivisionModal from '@/modules/admin/departments/manage/add-division-modal';
import EditDivisionModal from '@/modules/admin/departments/manage/edit-division-modal';
import ProgramDivisionSection from '@/modules/admin/departments/manage/program-section';

const ContentManageDepartmentSection = ({ id }: { id: string }) => {
  const pathname = usePathname();
  const { data, refetch } = useGetDepartmentById({ id: Number(id) });
  const { mutate, status } = useDeleteDivision();

  const [, setId] = useState(0);
  const [open, setOpen] = useState(false);
  const [openAddDivision, setOpenAddDivision] = useState(false);
  // const parentRef = useRef<HTMLTableElement | null>(null);
  const handleRemoveData = () => {
    // console.log(id);

    mutate(Number(id), {
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
    <div className='py-5 border rounded-3xl w-full mt-10 mb-5'>
      <h4 className='px-4 text-lg text-neutral-600'>General Data</h4>
      <div className='px-3'>
        <Table>
          <TableBody>
            <TableRow className='border-hidden hover:bg-neutral-100'>
              <TableCell className='p-2 font-bold align-top'>Name</TableCell>
              <TableCell className='p-2 align-top'>:</TableCell>
              <TableCell className='p-2'>
                {data?.data?.department?.name}
              </TableCell>
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
                    __html: data?.data?.department?.description || '',
                  }}
                ></div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className='border rounded-3xl m-4'>
        <div className='p-4 flex justify-between items-center'>
          <h5 className='font-bold'>Division</h5>
          <AddDivisionModal
            open={openAddDivision}
            setOpen={setOpenAddDivision}
          />
        </div>
        <Table className='border-b'>
          <TableHeader className='bg-neutral-50 '>
            <TableRow className=''>
              <TableHead className='text-neutral-500'>No</TableHead>
              <TableHead className='text-neutral-500 min-w-[100px] max-w-[200px]'>
                Name
              </TableHead>
              <TableHead className='text-neutral-500'>Description</TableHead>
              <TableHead className='text-neutral-500'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.department?.divisions?.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className='text-ellipsis min-w-[100px] max-w-[200px]'>
                    {item.name}
                  </TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell className='flex gap-2 h-full items-center'>
                    <EditDivisionModal
                      data={{
                        department_id: data?.data?.department?.id,
                        description: item.description,
                        name: item.name,
                        id: item.id,
                      }}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      {data && <ProgramDivisionSection data={data?.data} />}
      <div className='border rounded-3xl m-4'>
        <div className='p-4 flex justify-between items-center'>
          <h5 className='font-bold'>Awardee</h5>
          <Button
            asChild
            className='bg-primary-main text-neutral-100 text-sm font-semibold hover:bg-primary-600 rounded-full'
          >
            <Link className='flex gap-2 ' href={`${pathname}/program/add`}>
              <LuPlus className='text-lg text-neutral-100' />
              <span>Tambah Awardee</span>
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
              <TableHead className='text-neutral-500'>Description</TableHead>
              <TableHead className='text-neutral-500'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.department?.programs?.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className='text-ellipsis min-w-[100px] max-w-[200px]'>
                    {item.name}
                  </TableCell>
                  <TableCell>{contentTrimmed(item.description, 75)}</TableCell>

                  <TableCell className='flex gap-2 h-full items-center'>
                    <Link href={`/admin/department/edit/${item.id}`}>
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
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ContentManageDepartmentSection;
