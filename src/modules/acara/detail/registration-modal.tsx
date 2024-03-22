'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { ValidationSchemaRegistrationEventForm } from '@/lib/validations/event';
import {
  useGetOptionEventParticipantsFields,
  useGetOptionEventParticipantsRoles,
  useRegistrationEvent,
} from '@/hooks/events/hook';

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { defaultRegistrationEvent } from '@/modules/acara/detail/constant';

import { TDetailEventData } from '@/types/events';

const RegistrationEventModal = ({ data }: { data: TDetailEventData }) => {
  const [open, setOpen] = useState(false);

  const { mutate, status } = useRegistrationEvent();

  const { id } = useParams();

  const { data: dataRoles } = useGetOptionEventParticipantsRoles();
  const { data: dataFields } = useGetOptionEventParticipantsFields();

  const form = useForm<z.infer<typeof ValidationSchemaRegistrationEventForm>>({
    resolver: zodResolver(ValidationSchemaRegistrationEventForm),
    defaultValues: defaultRegistrationEvent,
  });

  const onSubmit = (
    data: z.infer<typeof ValidationSchemaRegistrationEventForm>
  ) => {
    const payload = {
      event_id: Number(id),
      ...data,
    };

    mutate(payload, {
      onSuccess: () => {
        setOpen(false);
        toast.success('Registration event successfully');
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
        disabled={
          // check if the date is already passed
          new Date(data?.event?.end_reg_date || '2024-02-13T05:20:22.754Z') <
          new Date()
        }
        className='bg-primary-main text-white px-6 py-2 rounded-full border border-transparent  hover:bg-primary-600 hover:border-primary-main  duration-300 transition-all ease-in-out font-semibold text-sm disabled:bg-neutral-300 disabled:hover:border-neutral-300'
      >
        Daftar Sekarang
      </DialogTrigger>
      <DialogContent className='w-full md:max-w-xl lg:max-w-2xl xl:max-w-3xl rounded-3xl '>
        <DialogHeader>
          <h4>Registration Event</h4>
          <div className=' w-full'>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='w-full flex flex-col gap-2'
              >
                <div className='grid grid-cols-2 gap-2'>
                  <div className='col-span-2 sm:col-span-1'>
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
                  </div>
                  <div className='col-span-2 sm:col-span-1'>
                    <FormField
                      control={form.control}
                      name='email'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder='Masukkan Email...' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className='col-span-2 sm:col-span-1'>
                    <FormField
                      control={form.control}
                      name='institution'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Institusi</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Masukkan Institusi...'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className='col-span-2 sm:col-span-1'>
                    <FormField
                      control={form.control}
                      name='role'
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>
                              Select Roles{' '}
                              <span className='text-error-main'>*</span>
                            </FormLabel>
                            <Select onValueChange={field.onChange}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder='Select Roles ' />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {dataRoles?.data?.map((item, index) => {
                                  return (
                                    <SelectItem
                                      key={index}
                                      value={String(item)}
                                    >
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
                  </div>
                  <div className='col-span-2 sm:col-span-1'>
                    <FormField
                      control={form.control}
                      name='field'
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>
                              Select Field{' '}
                              <span className='text-error-main'>*</span>
                            </FormLabel>
                            <Select onValueChange={field.onChange}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder='Select Field ' />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {dataFields?.data?.map((item, index) => {
                                  return (
                                    <SelectItem
                                      key={index}
                                      value={String(item)}
                                    >
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
                  </div>
                  <div className='col-span-2 sm:col-span-1'>
                    <FormField
                      control={form.control}
                      name='telp'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>No. Telp</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Masukkan No. Telp...'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className='col-span-2 sm:col-span-1'>
                    <FormField
                      control={form.control}
                      name='city'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Kota</FormLabel>
                          <FormControl>
                            <Input placeholder='Masukkan Kota...' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

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

export default RegistrationEventModal;
