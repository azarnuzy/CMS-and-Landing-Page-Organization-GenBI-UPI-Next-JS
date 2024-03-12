'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue } from 'recoil';
import { toast } from 'sonner';
import { z } from 'zod';

import { ValidationSchemaAddNewsForm } from '@/lib/validations/news';
import { useGetOptionDepartments } from '@/hooks/departments/hook';
import { useAddPost, useGetPostTypes } from '@/hooks/posts/hook';

import { DraggableImageInput } from '@/components/input/draggable-input';
import InputTag from '@/components/input/tag';
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
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import {
  addNewsDefaultValues,
  createFormData,
  usersGetOptionParams,
} from '@/modules/admin/news/add/constant';
// import { department_idData } from '@/modules/admin/news/constant';
import { inputTagState, inputUploadState } from '@/recoils/admin/atom';
import {
  dataAddDepartmentAtomNewsState,
  dataDepartmentSelectorNewsState,
} from '@/recoils/admin/news/atom';

const DraftEditor = dynamic(() => import('@/components/text-editor'), {
  ssr: false,
});

import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useGetEventOptions } from '@/hooks/events/hook';
import { useGetUserOptions } from '@/hooks/users/hook';

import { LoadingSpinner } from '@/components/loading-spinner';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  userOptionsAtomDataState,
  userOptionSelectorDataState,
} from '@/recoils/admin/users/atom';

import { TAddPostPayload } from '@/types/posts/crud';

const FormAddNewsSection = () => {
  const form = useForm<z.infer<typeof ValidationSchemaAddNewsForm>>({
    resolver: zodResolver(ValidationSchemaAddNewsForm),
    defaultValues: addNewsDefaultValues,
  });

  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );
  const [getThumbnailName, setThumbnailName] = useState<string>('');

  const { data: dataDepartmentOption } = useGetOptionDepartments();
  const { data: dataPostType } = useGetPostTypes();
  const { data: dataUser } = useGetUserOptions(usersGetOptionParams);
  const { data: dataEventOption } = useGetEventOptions(usersGetOptionParams);

  const { mutate, status } = useAddPost();

  const [, setTags] = useRecoilState(inputTagState);
  const [, setNameUpload] = useRecoilState(inputUploadState);
  const [, setDepartmentOption] = useRecoilState(
    dataAddDepartmentAtomNewsState
  );
  const [, setUserOption] = useRecoilState(userOptionsAtomDataState);

  const departmentData = useRecoilValue(dataDepartmentSelectorNewsState);
  const usersOptionData = useRecoilValue(userOptionSelectorDataState);

  const otherPhotoLength = form.watch('other')?.length;

  const handleEditorChange = (editorState: EditorState) => {
    setEditorState(editorState);

    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const htmlContent = draftToHtml(rawContentState);

    form.setValue('content', htmlContent, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const onSubmit = (data: z.infer<typeof ValidationSchemaAddNewsForm>) => {
    const formData = createFormData(data);

    mutate(formData as unknown as TAddPostPayload, {
      onSuccess: (data) => {
        toast.success(`Berhasil menambahkan berita ${data.data.post.title}`);

        setTags([]);
        setNameUpload('');
        setEditorState(EditorState.createEmpty());
        form.clearErrors();
        form.reset(addNewsDefaultValues);
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message || 'Failed to add news');
      },
    });
  };

  useEffect(() => {
    if (dataDepartmentOption) {
      setDepartmentOption(dataDepartmentOption.data);
    }
  }, [dataDepartmentOption, setDepartmentOption]);

  useEffect(() => {
    if (dataUser) {
      setUserOption(dataUser.data);
    }
  }, [dataUser, setUserOption]);

  return (
    <div className='border rounded-3xl px-6 py-6 my-10 shadow-sm'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full flex flex-col gap-6'
        >
          <div className='grid grid-cols-2 gap-6'>
            <div className='col-span-2 lg:col-span-1'>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Title <span className='text-error-main'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder='Input news title...' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='col-span-2 lg:col-span-1'>
              <FormField
                control={form.control}
                name='type'
                render={({ field }) => (
                  <FormItem className='space-y-3'>
                    <FormLabel>
                      Type <span className='text-error-main'>*</span>
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        className='flex gap-2 items-center'
                      >
                        {dataPostType?.data?.map((item, index) => {
                          return (
                            <FormItem
                              key={index}
                              className='flex items-center space-x-3 space-y-0'
                            >
                              <FormControl>
                                <RadioGroupItem
                                  value={item}
                                  checked={field.value === item}
                                />
                              </FormControl>
                              <FormLabel className='font-normal'>
                                {item}
                              </FormLabel>
                            </FormItem>
                          );
                        })}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='col-span-2 lg:col-span-1'>
              <FormField
                control={form.control}
                name='department_id'
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Select Department *</FormLabel>
                      <Select
                        value={String(field.value)}
                        onValueChange={(e) => field.onChange(Number(e))}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select Department ' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {departmentData?.map((item, index) => {
                            return (
                              <SelectItem
                                key={index}
                                value={String(item.value)}
                              >
                                {item.label}
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

            <div className='col-span-2 lg:col-span-1'>
              <FormField
                control={form.control}
                name='author_id'
                render={({ field }) => (
                  <FormItem className='flex flex-col gap-2'>
                    <FormLabel>
                      Author <span className='text-error-main'>*</span>
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
                              ? usersOptionData.find(
                                  (language) => language.value === field.value
                                )?.label
                              : 'Select Author'}
                            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-full p-0'>
                        <Command>
                          <CommandInput placeholder='Search Author...' />
                          <CommandEmpty>No Author found.</CommandEmpty>
                          <ScrollArea className='h-[200px]'>
                            <CommandGroup>
                              {usersOptionData.map((item) => (
                                <CommandItem
                                  value={item.label}
                                  key={item.value}
                                  onSelect={() => {
                                    form.setValue('author_id', item.value);
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
            <div className='col-span-2'>
              <DraftEditor
                editorState={editorState}
                setEditorState={(editorStateParams) => {
                  handleEditorChange(editorStateParams);
                }}
                label='Content'
                error={form.formState.errors.content?.message}
              />
            </div>
            <div className='col-span-2 lg:col-span-1'>
              <InputTag
                control={form.control}
                name='tags'
                label='Hashtag'
                message={form.formState.errors.tags?.message}
              />
            </div>
            <div className='col-span-2 lg:col-span-1'>
              <FormField
                control={form.control}
                name='event_id'
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Select Event *</FormLabel>
                      <Select
                        value={String(field.value)}
                        onValueChange={(e) => field.onChange(Number(e))}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select Event ' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {dataEventOption?.data?.map((item, index) => {
                            return (
                              <SelectItem key={index} value={String(item.id)}>
                                {item.title}
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
            <div className='w-full col-span-2 lg:col-span-1'>
              <FormLabel
                className={`${
                  form.formState?.errors?.cover ? 'text-red-500' : 'text-black'
                }`}
              >
                Thumbnail <span className='text-error-main'>*</span>
              </FormLabel>
              <UploadField
                getname={getThumbnailName}
                setname={setThumbnailName}
                control={form.control}
                name='cover'
                accepted='.jpg, .jpeg, .png'
                variant='sm'
                message={form?.formState?.errors?.cover?.message?.toString()}
                status={form?.formState?.errors?.cover ? 'error' : 'none'}
              />
            </div>
            <div className='col-span-2 lg:col-span-1'>
              <FormField
                control={form.control}
                name='caption_cover'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Caption Thumbnail</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Input Caption for Thumbnail...'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='col-span-2 lg:col-span-1'>
              <Label htmlFor='other'>Foto Lainnya (Maksimal 5)</Label>
              <DraggableImageInput
                className='border-none min-h-[75px]'
                name='other'
                variant='lg'
                control={form.control}
                status={form.formState.errors.other ? 'error' : undefined}
              />
              {form.formState.errors.other &&
                typeof form.formState.errors.other.message === 'string' && (
                  <span className='text-red-700 text-xs'>
                    {form.formState.errors.other.message}
                  </span>
                )}
            </div>
            <div className='col-span-2 lg:col-span-1 flex flex-col  w-full lg:pt-[155px] gap-4 lg:gap-8'>
              {otherPhotoLength !== undefined &&
                Array(otherPhotoLength)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index} className='lg:h-40'>
                      <FormField
                        control={form.control}
                        name={
                          `caption_other_${index + 1}` as keyof z.infer<
                            typeof ValidationSchemaAddNewsForm
                          >
                        }
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Caption Foto Lainnya {index + 1}
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder={`Input Caption for Photo ${
                                  index + 1
                                }...`}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
            </div>
            <div className='col-span-2 lg:col-span-1'>
              <Label htmlFor='attachment'>Dokumen Lainnya</Label>
              <DraggableImageInput
                className='border-none min-h-[75px]'
                name='attachment'
                variant='lg'
                control={form.control}
                status={form.formState.errors.attachment ? 'error' : undefined}
              />
              {form.formState.errors.attachment &&
                typeof form.formState.errors.attachment.message ===
                  'string' && (
                  <span className='text-red-700 text-xs'>
                    {form.formState.errors.attachment.message}
                  </span>
                )}
            </div>
          </div>
          <div className='flex justify-between'>
            <Button
              asChild
              type='button'
              variant='outline'
              className='border-primary-main rounded-full text-primary-main px-6 py-2.5 font-semibold '
            >
              <Link href='/admin/news'>Batal</Link>
            </Button>
            <div className='flex justify-end'>
              <Button
                type='submit'
                className='rounded-full text-white px-6 py-2.5 font-semibold border-primary-main bg-primary-main hover:bg-primary-dark transition-colors duration-200 ease-in-out'
              >
                {status === 'pending' ? <LoadingSpinner /> : 'Simpan'}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FormAddNewsSection;
