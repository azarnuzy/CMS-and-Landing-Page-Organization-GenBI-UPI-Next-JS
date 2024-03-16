'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { DialogClose } from '@radix-ui/react-dialog';
import { useQueryClient } from '@tanstack/react-query';
import { Trash } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdDelete } from 'react-icons/md';
import { TbEdit } from 'react-icons/tb';
import { toast } from 'sonner';
import { z } from 'zod';

import { ValidationSchemaAddDivisionForm } from '@/lib/validations/division';
import { useDeleteDivision, useUpdateDivision } from '@/hooks/division/hook';

import MiniSpinner from '@/components/spinner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { TextField } from '@/components/ui/text-field';

import { TAddDivisionPayload } from '@/types/division';
const EditDivisionModal = ({
  data,
}: {
  data: {
    name: string;
    description: string;
    department_id: number;
    id: number;
  };
}) => {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [id, setId] = useState(0);

  const { mutate, status } = useUpdateDivision();
  const { mutate: mutateDelete, status: statusDelete } = useDeleteDivision();

  const form = useForm<z.infer<typeof ValidationSchemaAddDivisionForm>>({
    resolver: zodResolver(ValidationSchemaAddDivisionForm),
    defaultValues: {
      name: data.name,
      description: data.description,
    },
  });

  const queryClient = useQueryClient();

  const onSubmit = (
    dataSubmit: z.infer<typeof ValidationSchemaAddDivisionForm>
  ) => {
    const payload: TAddDivisionPayload = {
      name: dataSubmit.name,
      description: dataSubmit.description,
      department_id: data.department_id,
    };
    mutate(
      { id: data.id, payload },
      {
        onSuccess: () => {
          setOpen(false);
          toast.success('Division edited successfully');
          queryClient.invalidateQueries({
            queryKey: ['get-department-by-id', data.department_id],
          });
        },
        onError: (error) => {
          toast.error(
            error.response?.data?.message || 'Failed to add division'
          );
        },
      }
    );
  };

  const handleRemoveData = () => {
    mutateDelete(Number(id), {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['get-department-by-id', data.department_id],
        });
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
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          onClick={() => {
            setOpen(true);
          }}
        >
          <TbEdit className='text-warning-main text-2xl' />
        </DialogTrigger>
        <DialogContent className='w-full md:max-w-xl lg:max-w-2xl xl:max-w-3xl rounded-3xl '>
          <DialogHeader>
            <h4>Tambah Divisi</h4>
            <div className=' w-full'>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='w-full flex flex-col gap-2'
                >
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama</FormLabel>
                        <FormControl>
                          <Input placeholder='Masukkan Nama...' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <TextField
                    labelClassName='!text-sm text-left !font-normal'
                    type='text'
                    variant='md'
                    control={form.control}
                    name='description'
                    placeholder='Edit Balasan...'
                    label='Description'
                    className='h-[80px] text-sm  py-2'
                    isTextArea={true}
                    status={
                      form.formState?.errors?.description ? 'error' : undefined
                    }
                    message={form.formState?.errors?.description?.message}
                  />
                  <div className='w-full flex justify-end'>
                    <div className='flex gap-4 items-center'>
                      <Button
                        type='button'
                        className='bg-neutral-100 text-primary-main border-primary-main rounded-full border hover:bg-primary-main hover:text-neutral-100'
                        onClick={() => setOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type='submit'
                        className='bg-primary-main border-primary-main text-neutral-100 rounded-full disabled:bg-neutral-600'
                        disabled={status === 'pending'}
                      >
                        {status === 'pending' ? (
                          <div className='flex gap-2 items-center'>
                            <MiniSpinner /> Loading...
                          </div>
                        ) : (
                          `Edit`
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              </Form>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogTrigger
          onClick={() => {
            setId(data.id);
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
                Data yang sudah dihapus tidak dapat dikembalikan lagi harap
                periksa data sebelum menghapus
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
                {statusDelete === 'pending' ? (
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
    </>
  );
};

export default EditDivisionModal;
