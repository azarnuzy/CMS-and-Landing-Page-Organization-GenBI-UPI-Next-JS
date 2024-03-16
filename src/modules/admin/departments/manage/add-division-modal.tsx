'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { LuPlus } from 'react-icons/lu';
import { toast } from 'sonner';
import { z } from 'zod';

import { ValidationSchemaAddDivisionForm } from '@/lib/validations/division';
import { useAddDivision } from '@/hooks/division/hook';

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
const AddDivisionModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) => {
  const { mutate, status } = useAddDivision();
  const { id } = useParams();

  const form = useForm<z.infer<typeof ValidationSchemaAddDivisionForm>>({
    resolver: zodResolver(ValidationSchemaAddDivisionForm),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const queryClient = useQueryClient();

  const onSubmit = (data: z.infer<typeof ValidationSchemaAddDivisionForm>) => {
    const payload: TAddDivisionPayload = {
      name: data.name,
      description: data.description,
      department_id: Number(id),
    };
    mutate(payload, {
      onSuccess: () => {
        setOpen(false);
        toast.success('Division added successfully');
        queryClient.invalidateQueries({
          queryKey: ['get-department-by-id', Number(id)],
        });
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to add division');
      },
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        onClick={() => {
          setOpen(true);
        }}
        className='bg-primary-main text-neutral-100 text-sm font-semibold hover:bg-primary-600 rounded-full flex gap-2 items-center py-2.5 px-4'
      >
        <LuPlus className='text-lg text-neutral-100' />
        <span>Tambah Divisi</span>
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
  );
};

export default AddDivisionModal;
