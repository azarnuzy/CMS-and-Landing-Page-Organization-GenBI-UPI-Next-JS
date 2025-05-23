'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, Check, ChevronsUpDown } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue } from 'recoil';
import { toast } from 'sonner';
import { z } from 'zod';

import 'react-day-picker/dist/style.css';

import logger from '@/lib/logger';
import { cn } from '@/lib/utils';
import { ValidationSchemaPutAwardeeForm } from '@/lib/validations/awardee';
import { useGetDetailAwardee, usePutAwardee } from '@/hooks/awardee/hook';
import { useGetAllStudyPrograms } from '@/hooks/study-programs/hook';

import { UploadField } from '@/components/input/upload-file';
import { LoadingSpinner } from '@/components/loading-spinner';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
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
import { ScrollArea } from '@/components/ui/scroll-area';

import {
  defaultValuesAwardeeEditData,
  defaultValuesPutAwardee,
} from '@/modules/admin/awardee/edit/constant';
import { awardeesDataEditState } from '@/recoils/admin/awardees/atom';
import {
  studyProgramDataState,
  studyProgramSelectorData,
} from '@/recoils/study-program/atom';

const EditAwardeeFormSection = ({ id }: { id: string }) => {
  const { data } = useGetDetailAwardee({ id: Number(id) });
  const { data: dataStudyProgram } = useGetAllStudyPrograms();
  const { mutate, status } = usePutAwardee();

  const form = useForm<z.infer<typeof ValidationSchemaPutAwardeeForm>>({
    resolver: zodResolver(ValidationSchemaPutAwardeeForm),
    defaultValues: defaultValuesAwardeeEditData,
  });

  const [, setDataEditAwardee] = useRecoilState(awardeesDataEditState);
  const [, setStudyProgram] = useRecoilState(studyProgramDataState);
  const dataStudyProgramState = useRecoilValue(studyProgramSelectorData);

  const [getPhoto, setPhoto] = useState<string>('');
  const [getTranscript, setTranscript] = useState<string>('');

  useEffect(() => {
    if (data) {
      setDataEditAwardee(data.data);

      // setnameUpload(data.data.photo.alt);
      setPhoto(data?.data?.photo?.alt || 'Tidak ada foto');
      setTranscript(data?.data?.transcript?.file_name || 'Tidak ada file');

      form.reset(defaultValuesPutAwardee(data?.data));
    }
  }, [data, form, setDataEditAwardee]);

  useEffect(() => {
    if (dataStudyProgram) {
      setStudyProgram(dataStudyProgram?.data);
    }
  }, [dataStudyProgram, setStudyProgram]);

  const onSubmit = (data: z.infer<typeof ValidationSchemaPutAwardeeForm>) => {
    // logger(tempData);
    try {
      let tempData: typeof data = { ...data };
      delete tempData.photo;
      delete tempData.transcript;

      if (data?.photo !== undefined) {
        tempData = {
          ...data,
          photo: data?.photo[0],
        };
      }

      if (data?.transcript !== undefined) {
        tempData = {
          ...data,
          transcript: data?.transcript[0],
        };
      }
      mutate(
        {
          payload: tempData,
          id: Number(id),
        },
        {
          onSuccess: () => {
            toast.success(`Berhasil Edit Awardee ${data.name}`);
          },
          onError: (error) => {
            toast.error(error?.response?.data?.message || 'Error Edit Awardee');
            logger(error);
          },
        }
      );
    } catch (error) {
      throw new Error('Error Edit Awardee');
    }
  };

  return (
    <div className='relative border rounded-3xl px-6 py-6 sm:my-10 shadow-sm'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full flex flex-col gap-6'
        >
          <div className='grid grid-cols-2 gap-6'>
            <div className='col-span-2 md:col-span-1'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Full Name <span className='text-error-main'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder='Input Your Full Name...' {...field} />
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
                          toYear={new Date().getFullYear()}
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
                name='scholarship'
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
                                  checked={Number(field.value) == index + 1}
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
              <FormField
                control={form.control}
                name='study_program_id'
                render={({ field }) => (
                  <FormItem className='flex flex-col gap-2'>
                    <FormLabel>
                      Study Program <span className='text-error-main'>*</span>
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant='outline'
                            role='combobox'
                            className={cn(
                              'justify-between',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value
                              ? dataStudyProgramState.find(
                                  (item) => item.value === field.value
                                )?.label
                              : 'Select Study Program'}
                            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-full p-0'>
                        <Command>
                          <CommandInput placeholder='Search Study Program...' />
                          <CommandEmpty>No Study Program found.</CommandEmpty>
                          <ScrollArea className='h-[200px]'>
                            <CommandGroup>
                              {dataStudyProgramState.map((item) => (
                                <CommandItem
                                  value={item.label}
                                  key={item.value}
                                  onSelect={() => {
                                    form.setValue(
                                      'study_program_id',
                                      item.value
                                    );
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      'mr-2 h-4 w-4',
                                      item.value === field.value
                                        ? 'opacity-100'
                                        : 'opacity-0'
                                    )}
                                  />
                                  {item.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </ScrollArea>
                        </Command>
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
                name='linkedin_username'
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
                name='instagram_username'
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
                name='telp'
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
                  form.formState?.errors?.photo ? 'text-red-500' : 'text-black'
                }`}
              >
                Profile Photo <span className='text-error-main'>*</span>
              </FormLabel>
              <UploadField
                control={form.control}
                getname={getPhoto}
                setname={setPhoto}
                name='photo'
                accepted='.jpg, .jpeg, .png'
                variant='sm'
                message={form?.formState?.errors?.photo?.message?.toString()}
                status={form?.formState?.errors?.photo ? 'error' : 'none'}
              />
            </div>
            <div className='col-span-2 grid grid-cols-2 gap-4'>
              <div className='col-span-2 md:col-span-1 grid grid-cols-2 border rounded-3xl px-6 py-6 shadow-sm gap-4'>
                <h4 className='col-span-2'>Data IP</h4>
                <div className='col-span-2 md:col-span-1'>
                  <FormField
                    control={form.control}
                    name='smt1_ip'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Semester 1 <span className='text-error-main'>*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Ex: 3,78...'
                            type='number'
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
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
                    name='smt2_ip'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Semester 2 <span className='text-error-main'>*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Ex: 3,78...'
                            type='number'
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
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
                    name='smt3_ip'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Semester 3 <span className='text-error-main'>*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Ex: 3,78...'
                            type='number'
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
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
                    name='smt4_ip'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Semester 4 </FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Ex: 3,78...'
                            type='number'
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
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
                    name='smt5_ip'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Semester 5</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Ex: 3,78...'
                            type='number'
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
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
                    name='smt6_ip'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Semester 6</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Ex: 3,78...'
                            type='number'
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
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
                    name='smt7_ip'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Semester 7</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Ex: 3,78...'
                            type='number'
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
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
                    name='smt8_ip'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Semester 8</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Ex: 3,78...'
                            type='number'
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className='col-span-2 md:col-span-1 grid grid-cols-2 border rounded-3xl px-6 py-6 shadow-sm gap-4'>
                <h4 className='col-span-2'>Data IPK</h4>
                <div className='col-span-2 md:col-span-1'>
                  <FormField
                    control={form.control}
                    name='smt1_ipk'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Semester 1 <span className='text-error-main'>*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Ex: 3,78...'
                            type='number'
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
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
                    name='smt2_ipk'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Semester 2 <span className='text-error-main'>*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Ex: 3,78...'
                            type='number'
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
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
                    name='smt3_ipk'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Semester 3 <span className='text-error-main'>*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Ex: 3,78...'
                            type='number'
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
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
                    name='smt4_ipk'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Semester 4</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Ex: 3,78...'
                            type='number'
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
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
                    name='smt5_ipk'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Semester 5</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Ex: 3,78...'
                            type='number'
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
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
                    name='smt6_ipk'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Semester 6</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Ex: 3,78...'
                            type='number'
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
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
                    name='smt7_ipk'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Semester 7</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Ex: 3,78...'
                            type='number'
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
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
                    name='smt8_ipk'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Semester 8</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Ex: 3,78...'
                            type='number'
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
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
                getname={getTranscript}
                setname={setTranscript}
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
                {status === 'pending' ? 'Loading...' : 'Edit'}
              </Button>
            </div>
          </div>
        </form>
      </Form>
      {status === 'pending' && (
        <div className='absolute min-h-screen w-full bottom-0 right-0 z-10'>
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default EditAwardeeFormSection;
