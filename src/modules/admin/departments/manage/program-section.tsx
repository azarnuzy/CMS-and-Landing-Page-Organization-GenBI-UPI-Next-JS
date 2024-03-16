import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { useForm } from 'react-hook-form';
import { LuPlus } from 'react-icons/lu';
import { toast } from 'sonner';
import { z } from 'zod';

import 'react-day-picker/dist/style.css';

import { cn } from '@/lib/utils';
import { ValidationSchemaAddProgramForm } from '@/lib/validations/program';
import { useAddProgram } from '@/hooks/program/hook';

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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TextField } from '@/components/ui/text-field';

import { defaultAddProgramData } from '@/modules/admin/departments/manage/constant';
import EditProgramModal from '@/modules/admin/departments/manage/edit-program-modal';

import { TDepartmentByIdData } from '@/types/departments';
import { TAddProgramPayload } from '@/types/program';

const ProgramDivisionSection = ({ data }: { data: TDepartmentByIdData }) => {
  const { mutate, status } = useAddProgram();
  const { id } = useParams();

  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof ValidationSchemaAddProgramForm>>({
    resolver: zodResolver(ValidationSchemaAddProgramForm),
    defaultValues: defaultAddProgramData,
  });

  const queryClient = useQueryClient();

  const onSubmitAdd = (
    dataAdd: z.infer<typeof ValidationSchemaAddProgramForm>
  ) => {
    const payload: TAddProgramPayload = {
      name: dataAdd.name,
      date_end: dataAdd.date_end,
      date_start: dataAdd.date_start,
      department_id: data.department.id,
      description: dataAdd.description,
      implementation_desc: dataAdd.implementation_desc,
      type: dataAdd.type,
    };

    mutate(payload, {
      onSuccess: () => {
        setOpen(false);
        toast.success('Program added successfully');
        queryClient.invalidateQueries({
          queryKey: ['get-department-by-id', Number(id)],
        });
        form.reset(defaultAddProgramData);
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to add program');
      },
    });
  };

  return (
    <div className='border rounded-3xl m-4'>
      <div className='p-4 flex justify-between items-center'>
        <h5 className='font-bold'>Program</h5>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger
            onClick={() => {
              setOpen(true);
            }}
          >
            <Button className='bg-primary-main text-neutral-100 text-sm font-semibold hover:bg-primary-600 rounded-full flex gap-2 items-center'>
              <LuPlus className='text-lg text-neutral-100' />
              <span>Tambah Program</span>
            </Button>
          </DialogTrigger>
          <DialogContent className='w-full md:max-w-xl lg:max-w-2xl xl:max-w-3xl rounded-3xl '>
            <DialogHeader>
              <h4>Tambah Program</h4>
              <div className=' w-full'>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmitAdd)}
                    className='w-full flex flex-col gap-2'
                  >
                    <FormField
                      control={form.control}
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
                      control={form.control}
                      name='description'
                      placeholder='Input Description...'
                      label='Description'
                      className='h-[80px] text-sm  py-2'
                      isTextArea={true}
                      status={
                        form.formState?.errors?.description
                          ? 'error'
                          : undefined
                      }
                      message={form.formState?.errors?.description?.message}
                    />
                    <FormField
                      control={form.control}
                      name='type'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type</FormLabel>
                          <FormControl>
                            <Input placeholder='(Ex: Monthly)...' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
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
                      control={form.control}
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
                                    !field.value &&
                                      'text-muted-foreground w-full'
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
                            <PopoverContent
                              className='w-auto p-0'
                              align='start'
                            >
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
                      control={form.control}
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
                                    !field.value &&
                                      'text-muted-foreground w-full'
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
                            <PopoverContent
                              className='w-auto p-0'
                              align='start'
                            >
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
      </div>
      <Table className='border-b'>
        <TableHeader className='bg-neutral-50 '>
          <TableRow className=''>
            <TableHead className='text-neutral-500'>No</TableHead>
            <TableHead className='text-neutral-500 min-w-[100px] max-w-[200px]'>
              Name
            </TableHead>
            <TableHead className='text-neutral-500'>Description</TableHead>
            <TableHead className='text-neutral-500'>
              Implementation Date
            </TableHead>
            <TableHead className='text-neutral-500'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.department?.programs?.map((item, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className='text-ellipsis min-w-[100px] max-w-[200px]'>
                  {item.name}
                </TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.implementation_desc}</TableCell>

                <TableCell className='flex gap-2 h-full items-center'>
                  <EditProgramModal
                    data={{
                      name: item.name,
                      description: item.description,
                      implementation_desc: item.implementation_desc,
                      type: 'Monthly',
                      date_start: new Date(),
                      date_end: new Date(),
                      department_id: data.department.id,
                    }}
                    program_id={item.id}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProgramDivisionSection;
