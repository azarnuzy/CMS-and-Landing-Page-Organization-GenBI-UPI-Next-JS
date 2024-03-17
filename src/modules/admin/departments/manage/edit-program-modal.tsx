'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { CalendarIcon, Trash } from 'lucide-react';
import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { useForm } from 'react-hook-form';
import { MdDelete } from 'react-icons/md';
import { TbEdit } from 'react-icons/tb';
import { toast } from 'sonner';
import { z } from 'zod';

import 'react-day-picker/dist/style.css';

import { cn } from '@/lib/utils';
import { ValidationSchemaAddProgramForm } from '@/lib/validations/program';
import {
  useDeleteProgram,
  useGetProgramType,
  useUpdateProgram,
} from '@/hooks/program/hook';

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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TextField } from '@/components/ui/text-field';

import { defaultEditProgramData } from '@/modules/admin/departments/manage/constant';

import { TAddProgramPayload } from '@/types/program';

const EditProgramModal = ({
  data,
  program_id,
}: {
  data: TAddProgramPayload;
  program_id: number;
}) => {
  const { mutate: mutateDelete, status: statusDelete } = useDeleteProgram();
  const { mutate: mutateUpdate, status: statusUpdate } = useUpdateProgram();
  const { data: programData } = useGetProgramType();

  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [getIdDelete, setIdDelete] = useState(0);

  const formEdit = useForm<z.infer<typeof ValidationSchemaAddProgramForm>>({
    resolver: zodResolver(ValidationSchemaAddProgramForm),
    defaultValues: defaultEditProgramData(data),
  });

  const queryClient = useQueryClient();

  const onSubmitEdit = (
    dataEdit: z.infer<typeof ValidationSchemaAddProgramForm>
  ) => {
    const payload: TAddProgramPayload = {
      name: dataEdit.name,
      date_end: dataEdit.date_end,
      date_start: dataEdit.date_start,
      department_id: data.department_id,
      description: dataEdit.description,
      implementation_desc: dataEdit.implementation_desc,
      type: dataEdit.type,
    };
    mutateUpdate(
      { id: program_id, payload },
      {
        onSuccess: () => {
          setOpenDelete(false);
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
    mutateDelete(getIdDelete, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['get-department-by-id', data.department_id],
        });
        setOpenDelete(false);
        setIdDelete(0);
        toast.success('Berhasil menghapus data');
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message || 'Gagal menghapus data');
      },
    });
  };

  return (
    <>
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogTrigger
          onClick={() => {
            setOpenEdit(true);
            formEdit.reset(
              defaultEditProgramData({
                name: data.name,
                description: data.description,
                implementation_desc: data.implementation_desc,
                type: 'Monthly',
                date_start: new Date(),
                date_end: new Date(),
                department_id: data.department_id,
              })
            );
          }}
        >
          <TbEdit className='text-warning-main text-2xl' />
        </DialogTrigger>
        <DialogContent className='w-full md:max-w-xl lg:max-w-2xl xl:max-w-3xl rounded-3xl '>
          <DialogHeader>
            <h4>Edit Program</h4>
            <div className=' w-full'>
              <Form {...formEdit}>
                <form
                  onSubmit={formEdit.handleSubmit(onSubmitEdit)}
                  className='w-full flex flex-col gap-2'
                >
                  <FormField
                    control={formEdit.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Input Program Name...'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <TextField
                    labelClassName='!text-sm text-left !font-normal'
                    type='text'
                    variant='md'
                    control={formEdit.control}
                    name='description'
                    placeholder='Input Description...'
                    label='Description'
                    className='h-[80px] text-sm  py-2'
                    isTextArea={true}
                    status={
                      formEdit.formState?.errors?.description
                        ? 'error'
                        : undefined
                    }
                    message={formEdit.formState?.errors?.description?.message}
                  />
                  <FormField
                    control={formEdit.control}
                    name='type'
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>
                            Select Program Type{' '}
                            <span className='text-error-main'>*</span>
                          </FormLabel>
                          <Select onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Select Program Type ' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {programData?.data?.map((item, index) => {
                                return (
                                  <SelectItem key={index} value={String(item)}>
                                    {item}
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>

                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={formEdit.control}
                    name='implementation_desc'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Implementation Date Description</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='(ex: Tanggal 7 disetiap bulan selama 1 Periode (Januari - Oktober)'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formEdit.control}
                    name='date_start'
                    render={({ field }) => (
                      <FormItem className='flex flex-col w-full'>
                        <FormLabel className='mb-2.5'>Start Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl className='w-full'>
                              <Button
                                variant='outline'
                                className={cn(
                                  ' pl-3 text-left font-normal',
                                  !field.value && 'text-muted-foreground w-full'
                                )}
                              >
                                {field.value ? (
                                  format(field.value, 'PPP')
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className='w-auto p-0' align='start'>
                            <DayPicker
                              mode='single'
                              selected={field.value}
                              onSelect={field.onChange}
                              captionLayout='dropdown-buttons'
                              fromYear={2015}
                              toYear={new Date().getFullYear()}
                            />
                          </PopoverContent>
                        </Popover>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formEdit.control}
                    name='date_end'
                    render={({ field }) => (
                      <FormItem className='flex flex-col w-full'>
                        <FormLabel className='mb-2.5'>End Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl className='w-full'>
                              <Button
                                variant='outline'
                                className={cn(
                                  ' pl-3 text-left font-normal',
                                  !field.value && 'text-muted-foreground w-full'
                                )}
                              >
                                {field.value ? (
                                  format(field.value, 'PPP')
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className='w-auto p-0' align='start'>
                            <DayPicker
                              mode='single'
                              selected={field.value}
                              onSelect={field.onChange}
                              captionLayout='dropdown-buttons'
                              fromYear={2015}
                              toYear={new Date().getFullYear()}
                            />
                          </PopoverContent>
                        </Popover>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className='w-full flex justify-end'>
                    <div className='flex gap-4 items-center'>
                      <Button
                        type='button'
                        className='bg-neutral-100 text-primary-main border-primary-main rounded-full border hover:bg-primary-main hover:text-neutral-100'
                        onClick={() => setOpenEdit(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type='submit'
                        className='bg-primary-main border-primary-main text-neutral-100 rounded-full disabled:bg-neutral-600'
                        disabled={statusUpdate === 'pending'}
                      >
                        {statusUpdate === 'pending' ? (
                          <div className='flex gap-2 items-center'>
                            <MiniSpinner /> Loading...
                          </div>
                        ) : (
                          `Submit`
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
            setIdDelete(program_id);
            setOpenDelete(true);
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
                  setIdDelete(0);
                }}
                disabled={statusDelete === 'pending'}
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

export default EditProgramModal;
