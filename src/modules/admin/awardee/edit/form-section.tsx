'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { toast } from 'sonner';
import { z } from 'zod';

import 'react-day-picker/dist/style.css';

import logger from '@/lib/logger';
import { cn } from '@/lib/utils';
import { urlToFile } from '@/lib/utils/general-function';
import { ValidationSchemaAddAwardeeForm } from '@/lib/validations/awardee';
import { useGetDetailAwardee } from '@/hooks/awardee/hook';

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

import { defaultValuesAwardeeEditData } from '@/modules/admin/awardee/edit/constant';
import { departmentData } from '@/modules/admin/news/constant';
import { awardeesDataEditState } from '@/recoils/admin/awardees/atom';

const EditAwardeeFormSection = ({ id }: { id: string }) => {
  const { data } = useGetDetailAwardee({ id: Number(id) });

  const form = useForm<z.infer<typeof ValidationSchemaAddAwardeeForm>>({
    resolver: zodResolver(ValidationSchemaAddAwardeeForm),
    defaultValues: defaultValuesAwardeeEditData,
  });

  const [, setDataEditAwardee] = useRecoilState(awardeesDataEditState);
  // const [, setNameUpload] = useRecoilState(inputUploadState);

  const [getPhoto, setPhoto] = useState<string>('');
  const [getTranscript, setTranscript] = useState<string>('');

  useEffect(() => {
    if (data) {
      setDataEditAwardee(data.data);
      const defaultValues = {
        full_name: data.data.name,
        birth_date: new Date(data.data.birth_date),
        member_since: new Date(data.data.member_since),
        total_scholarship: data.data.scholarship,
        year: Number(data.data.year),
        nim: data.data.nim,
        study_program: data.data.study_program,
        linkedin: data.data.linkedin_username || '',
        instagram: data.data.instagram_username || '',
        whatsapp: data.data.telp || '',
        ip1: data.data.ip1 || '',
        ip2: data.data.ip2 || '',
        ip3: data.data.ip3 || '',
        ip4: data.data.ip4 || '',
        ip5: data.data.ip5 || '',
        ip6: data.data.ip6 || '',
        ip7: data.data.ip7 || '',
        ip8: data.data.ip8 || '',
        transcript: data.data.transcript.file_url,
      };

      // setNameUpload(data.data.photo.alt);
      setPhoto(data.data.photo.alt);
      setTranscript(data.data.transcript.file_name);

      const promise_photo = urlToFile(data.data.photo.file_url);
      const promise_transcript = urlToFile(data.data.transcript.file_url);
      promise_photo
        .then((file) => {
          form.setValue('profile_photo', [file]);
        })
        .catch((error) => {
          logger(error);
        });

      promise_transcript
        .then((file) => {
          form.setValue('transcript', [file]);
        })
        .catch((error) => {
          logger(error);
        });

      form.reset(
        defaultValues as z.infer<typeof ValidationSchemaAddAwardeeForm>
      );
    }
  }, [data, form, setDataEditAwardee]);

  const onSubmit = (data: z.infer<typeof ValidationSchemaAddAwardeeForm>) => {
    toast.success(`Berhasil Edit Awardee ${data.full_name}`);
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
                name='whatsapp'
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
                getName={getPhoto}
                setName={setPhoto}
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
                name='ip1'
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
                name='ip2'
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
                name='ip3'
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
                name='ip4'
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
                name='ip5'
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
                name='ip6'
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
                name='ip7'
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
                name='ip8'
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
            <div className='w-full col-span-2 '>
              <FormLabel
                className={`${
                  form.formState?.errors?.transcript
                    ? 'text-red-500'
                    : 'text-black'
                }`}
              >
                Transcript
              </FormLabel>
              <UploadField
                control={form.control}
                getName={getTranscript}
                setName={setTranscript}
                name='transcript'
                accepted='.jpg, .jpeg, .png'
                variant='sm'
                message={form?.formState?.errors?.transcript?.message?.toString()}
                status={form?.formState?.errors?.transcript ? 'error' : 'none'}
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

export default EditAwardeeFormSection;
