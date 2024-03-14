'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import 'react-day-picker/dist/style.css';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import {
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

const DraftEditor = dynamic(() => import('@/components/text-editor'), {
  ssr: false,
});

import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import { ValidationSchemaAddManagementForm } from '@/lib/validations/managements';
import { useAddManagement } from '@/hooks/managements/hook';

import { UploadField } from '@/components/input/upload-file';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import {
  addFormDataManagement,
  defaultValuesAddManagements,
} from '@/modules/admin/managements/add/constant';

import { TPostManagamentPayload } from '@/types/managements';
function FormAddManagementSection() {
  const form = useForm<z.infer<typeof ValidationSchemaAddManagementForm>>({
    resolver: zodResolver(ValidationSchemaAddManagementForm),
    defaultValues: defaultValuesAddManagements,
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'mission',
  });

  const { mutate, status } = useAddManagement();

  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );

  const [getPhoto, setPhoto] = useState<string>('');
  const [getVideo, setVideo] = useState<string>('');

  const handleEditorChange = (editorState: EditorState) => {
    setEditorState(editorState);

    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const htmlContent = draftToHtml(rawContentState);

    form.setValue('description', htmlContent, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const onSubmit = (
    data: z.infer<typeof ValidationSchemaAddManagementForm>
  ) => {
    try {
      const formData = addFormDataManagement(data);

      mutate(formData as unknown as TPostManagamentPayload, {
        onSuccess: () => {
          form.reset(defaultValuesAddManagements);
          toast.success('Appreciation added successfully');
          setEditorState(EditorState.createEmpty());
          setPhoto('');
          setVideo('');
        },
        onError: (error) => {
          toast.error(error?.response?.data?.message);
        },
      });
    } catch (error) {
      throw new Error('Error adding appreciation');
    }
  };

  return (
    <div className='border rounded-3xl px-6 py-6  sm:my-10 shadow-sm'>
      {/* {status === 'pending' && toast.loading('Loading...')} */}
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
                      Name <span className='text-error-main'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='(Ex: GenBI UPI 2024-2025)'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='col-span-2'>
              <DraftEditor
                editorState={editorState}
                setEditorState={(editorStateParams) => {
                  handleEditorChange(editorStateParams);
                }}
                label='Description'
                error={form?.formState?.errors?.description?.message}
              />
            </div>
            <div className='col-span-2 md:col-span-1'>
              <FormField
                control={form.control}
                name='vision'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Vision <span className='text-error-main'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='(Ex: GenBI UPI 2024-2025)'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='col-span-2 md:col-span-1 flex flex-col'>
              {fields.map((field, index) => (
                <FormField
                  control={form.control}
                  key={field.id}
                  name={`missions.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(index !== 0 && 'sr-only')}>
                        Missions
                      </FormLabel>
                      <div className='flex gap-2'>
                        <FormControl>
                          <Input
                            placeholder='Input your list of missions'
                            {...field}
                          />
                        </FormControl>
                        <Button
                          type='button'
                          variant='outline'
                          disabled={index === 0}
                          size='sm'
                          onClick={() => remove(index)}
                        >
                          Remove
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button
                type='button'
                variant='outline'
                size='sm'
                className='mt-2'
                onClick={() => append({ value: '' })}
              >
                Add Mission
              </Button>
            </div>
            <div className='col-span-2 md:col-span-1'>
              <FormField
                control={form.control}
                name='period_year'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Period Year <span className='text-error-main'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder='(Ex: 23.24)' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='col-span-2 md:col-span-1'>
              <FormField
                control={form.control}
                name='period_start_date'
                render={({ field }) => (
                  <FormItem className='flex flex-col w-full'>
                    <FormLabel className='mb-2.5'>Period Start Date</FormLabel>
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
                          fromYear={2019}
                          toYear={2030}
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
                name='period_end_date'
                render={({ field }) => (
                  <FormItem className='flex flex-col w-full'>
                    <FormLabel className='mb-2.5'>Period End Date</FormLabel>
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
                          fromYear={2019}
                          toYear={2030}
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
                name='is_active'
                render={({ field }) => (
                  <FormItem className='space-y-3'>
                    <FormLabel>
                      Is Active Management{' '}
                      <span className='text-error-main'>*</span>
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(e) => {
                          field.onChange(e === 'true');
                        }}
                        className='flex gap-2 items-center'
                      >
                        <FormItem className='flex items-center space-x-3 space-y-0 flex-wrap'>
                          <FormControl>
                            <RadioGroupItem
                              value={String(true)}
                              checked={field.value === true}
                            />
                          </FormControl>
                          <FormLabel className='font-normal'>Yes</FormLabel>
                        </FormItem>
                        <FormItem className='flex items-center space-x-3 space-y-0 flex-wrap'>
                          <FormControl>
                            <RadioGroupItem
                              value={String(false)}
                              checked={field.value === false}
                            />
                          </FormControl>
                          <FormLabel className='font-normal'>No</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='w-full col-span-2 lg:col-span-1'>
              <FormLabel
                className={`${
                  form.formState?.errors?.photo ? 'text-red-500' : 'text-black'
                }`}
              >
                Photo <span className='text-error-main'>*</span>
              </FormLabel>
              <UploadField
                getname={getPhoto}
                setname={setPhoto}
                control={form.control}
                name='photo'
                accepted='.jpg, .jpeg, .png'
                variant='sm'
                message={form?.formState?.errors?.photo?.message?.toString()}
                status={form?.formState?.errors?.photo ? 'error' : 'none'}
              />
            </div>
            <div className='w-full col-span-2 lg:col-span-1'>
              <FormLabel
                className={`${
                  form.formState?.errors?.video ? 'text-red-500' : 'text-black'
                }`}
              >
                Video <span className='text-error-main'>*</span>
              </FormLabel>
              <UploadField
                getname={getVideo}
                setname={setVideo}
                control={form.control}
                name='video'
                accepted='.mp4, .ogg, .webm'
                variant='sm'
                message={form?.formState?.errors?.video?.message?.toString()}
                status={form?.formState?.errors?.video ? 'error' : 'none'}
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
              <Link href='/admin/appreciations'>Batal</Link>
            </Button>
            <div className='flex justify-end'>
              <Button
                type='submit'
                className='rounded-full text-white px-6 py-2.5 font-semibold border-primary-main bg-primary-main hover:bg-primary-dark transition-colors duration-200 ease-in-out'
                disabled={status === 'pending'}
              >
                {status === 'pending' ? 'Loading...' : 'Simpan'}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default FormAddManagementSection;
