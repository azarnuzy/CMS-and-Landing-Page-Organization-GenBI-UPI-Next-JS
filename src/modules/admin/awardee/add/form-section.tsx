'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { DayPicker } from 'react-day-picker';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import 'react-day-picker/dist/style.css';

import logger from '@/lib/logger';
import { cn } from '@/lib/utils';
import { ValidationSchemaAddAwardeeForm } from '@/lib/validations/awardee';

import { SelectField } from '@/components/input/select';
import { UploadField } from '@/components/input/upload-file';
import { Button } from '@/components/ui/button';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { defaultValuesAddAwardee } from '@/modules/admin/awardee/add/constant';
import { departmentData } from '@/modules/admin/news/constant';
const AddAwardeeFormSection = () => {
  const form = useForm<z.infer<typeof ValidationSchemaAddAwardeeForm>>({
    resolver: zodResolver(ValidationSchemaAddAwardeeForm),
    defaultValues: defaultValuesAddAwardee,
  });

  const onSubmit = (data: z.infer<typeof ValidationSchemaAddAwardeeForm>) => {
    logger(data);
  };

  return (
    <div className='border rounded-3xl px-6 py-6 my-10 shadow-sm'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full flex flex-col gap-6'
        >
          <div className='grid grid-cols-2 gap-6'>
            <div className='col-span-2 md:col-span-1'>
              <FormField
                control={form.control}
                name='full_name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Title <span className='text-error-main'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder='Input Your Fullname...' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='col-span-2 md:col-span-1'>
              <FormField
                control={form.control}
                name='birth_date'
                render={({ field }) => (
                  <FormItem className='flex flex-col w-full'>
                    <FormLabel className='mb-2.5'>Date of birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant='outline'
                            className={cn(
                              ' pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
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
                          fromYear={1995}
                          toYear={2010}
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='col-span-2 md:col-span-1'>
              <FormField
                control={form.control}
                name='member_since'
                render={({ field }) => (
                  <FormItem className='flex flex-col w-full'>
                    <FormLabel className='mb-2.5'>Member Since</FormLabel>
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
                          toYear={2025}
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='col-span-2 lg:col-span-1'>
              <FormField
                control={form.control}
                name='total_scholarship'
                render={({ field }) => (
                  <FormItem className='space-y-3'>
                    <FormLabel>
                      Total Scholarship{' '}
                      <span className='text-error-main'>*</span>
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        className='flex gap-2 items-center'
                      >
                        {Array(4)
                          .fill(0)
                          .map((_, index) => (
                            <FormItem
                              key={index}
                              className='flex items-center space-x-3 space-y-0'
                            >
                              <FormControl>
                                <RadioGroupItem
                                  value={(index + 1).toString()}
                                  checked={field.value === index + 1}
                                />
                              </FormControl>
                              <FormLabel className='font-normal'>
                                {index + 1}
                              </FormLabel>
                            </FormItem>
                          ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='col-span-2 md:col-span-1'>
              <FormField
                control={form.control}
                name='year'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Year <span className='text-error-main'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Input Your Year of Study...'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='col-span-2 md:col-span-1'>
              <FormField
                control={form.control}
                name='nim'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      NIM <span className='text-error-main'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder='Input Your NIM...' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='col-span-2 lg:col-span-1'>
              <SelectField
                error={form.formState.errors.study_program?.message}
                variant='md'
                control={form.control}
                options={departmentData}
                name='study_program'
                label='Study Program'
                required
                placeholder='Select Study Program'
                styletext='!text-black text-[10px]'
              />
            </div>
            <div className='col-span-2 md:col-span-1'>
              <FormField
                control={form.control}
                name='linkedin'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Linkedin</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Input Your Linkedin Username...'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='col-span-2 md:col-span-1'>
              <FormField
                control={form.control}
                name='instagram'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instagram</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Input Your Instagram Username...'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='col-span-2 md:col-span-1'>
              <FormField
                control={form.control}
                name='nim'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Whatsapp</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Input Your Phone Number...'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='w-full col-span-2 '>
              <FormLabel
                className={`${
                  form.formState?.errors?.profile_photo
                    ? 'text-red-500'
                    : 'text-black'
                }`}
              >
                Profile Photo <span className='text-error-main'>*</span>
              </FormLabel>
              <UploadField
                control={form.control}
                name='profile_photo'
                accepted='.jpg, .jpeg, .png'
                variant='sm'
                message={form?.formState?.errors?.profile_photo?.message?.toString()}
                status={
                  form?.formState?.errors?.profile_photo ? 'error' : 'none'
                }
              />
            </div>
            <div className='col-span-2 md:col-span-1'>
              <FormField
                control={form.control}
                name='sem1_gpa'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Semester 1</FormLabel>
                    <FormControl>
                      <Input placeholder='Ex: 3,78...' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='col-span-2 md:col-span-1'>
              <FormField
                control={form.control}
                name='sem2_gpa'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Semester 2</FormLabel>
                    <FormControl>
                      <Input placeholder='Ex: 3,78...' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* create input gap until sem8 */}
            <div className='col-span-2 md:col-span-1'>
              <FormField
                control={form.control}
                name='sem3_gpa'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Semester 3</FormLabel>
                    <FormControl>
                      <Input placeholder='Ex: 3,78...' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='col-span-2 md:col-span-1'>
              <FormField
                control={form.control}
                name='sem4_gpa'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Semester 4</FormLabel>
                    <FormControl>
                      <Input placeholder='Ex: 3,78...' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='col-span-2 md:col-span-1'>
              <FormField
                control={form.control}
                name='sem5_gpa'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Semester 5</FormLabel>
                    <FormControl>
                      <Input placeholder='Ex: 3,78...' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='col-span-2 md:col-span-1'>
              <FormField
                control={form.control}
                name='sem6_gpa'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Semester 6</FormLabel>
                    <FormControl>
                      <Input placeholder='Ex: 3,78...' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='col-span-2 md:col-span-1'>
              <FormField
                control={form.control}
                name='sem7_gpa'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Semester 7</FormLabel>
                    <FormControl>
                      <Input placeholder='Ex: 3,78...' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='col-span-2 md:col-span-1'>
              <FormField
                control={form.control}
                name='sem8_gpa'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Semester 8</FormLabel>
                    <FormControl>
                      <Input placeholder='Ex: 3,78...' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className='flex justify-between'>
            <Button
              asChild
              type='button'
              variant='outline'
              className='border-primary-main rounded-full text-primary-main px-6 py-2.5 font-semibold '
            >
              <Link href='/admin/awardee'>Batal</Link>
            </Button>
            <div className='flex justify-end'>
              <Button
                type='submit'
                className='rounded-full text-white px-6 py-2.5 font-semibold border-primary-main bg-primary-main hover:bg-primary-dark transition-colors duration-200 ease-in-out'
              >
                Simpan
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddAwardeeFormSection;
