'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { toast } from 'sonner';
import { z } from 'zod';

import logger from '@/lib/logger';
import { ValidationSchemaAddNewsForm } from '@/lib/validations/news';

import { DraggableImageInput } from '@/components/input/draggable-input';
import { SelectField } from '@/components/input/select';
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

import { departmentData } from '@/modules/admin/news/constant';
import { inputTagState, inputUploadState } from '@/recoils/admin/atom';

const DraftEditor = dynamic(() => import('@/components/text-editor'), {
  ssr: false,
});

const FormAddNewsSection = () => {
  const form = useForm<z.infer<typeof ValidationSchemaAddNewsForm>>({
    resolver: zodResolver(ValidationSchemaAddNewsForm),
    defaultValues: {
      title: '',
      content: '<p></p>\n',
      department: '',
      type: '',
      event: '',
      hashtag: [''],
      thumbnail: undefined,
      othersPhoto: undefined,
      caption_othersPhoto_1: '',
      caption_othersPhoto_2: '',
      caption_othersPhoto_3: '',
      caption_othersPhoto_4: '',
      caption_othersPhoto_5: '',
    },
  });

  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );

  const [, setTags] = useRecoilState(inputTagState);
  const [, setNameUpload] = useRecoilState(inputUploadState);

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

  const othersPhotoLength = form.watch('othersPhoto')?.length;

  const onSubmit = (data: z.infer<typeof ValidationSchemaAddNewsForm>) => {
    toast.success(`Berhasil menambahkan berita ${data.title}`);
    logger(data);
    setTags([]);
    setNameUpload('');
    setEditorState(EditorState.createEmpty());
    form.clearErrors();
    form.reset();
    form.setValue('title', '');
    form.setValue('content', '<p></p>\n');
    form.setValue('department', '');
    form.setValue('type', '');
    form.setValue('event', '');

    form.setValue('hashtag', ['']);
    form.setValue('thumbnail', undefined);
    form.setValue('othersPhoto', undefined);
    form.setValue('caption_othersPhoto_1', '');
    form.setValue('caption_othersPhoto_2', '');
    form.setValue('caption_othersPhoto_3', '');
    form.setValue('caption_othersPhoto_4', '');
    form.setValue('caption_othersPhoto_5', '');
  };

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
                        <FormItem className='flex items-center space-x-3 space-y-0'>
                          <FormControl>
                            <RadioGroupItem value='artikel' />
                          </FormControl>
                          <FormLabel className='font-normal'>Artikel</FormLabel>
                        </FormItem>
                        <FormItem className='flex items-center space-x-3 space-y-0'>
                          <FormControl>
                            <RadioGroupItem value='press-release' />
                          </FormControl>
                          <FormLabel className='font-normal'>
                            Press Release
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='col-span-2 lg:col-span-1'>
              {/* <FormField
                control={form.control}
                name='department'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Department <span className='text-error-main'>*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select Departement' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {departmentData?.map((item) => (
                          <Fragment key={item.id}>
                            <SelectItem value={item.id}>{item.name}</SelectItem>
                          </Fragment>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <SelectField
                error={form.formState.errors.department?.message}
                variant='md'
                control={form.control}
                options={departmentData}
                name='department'
                label='Department'
                required
                placeholder='Select Department'
                styletext='!text-black text-[10px]'
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
                name='hashtag'
                label='Hashtag'
                message={form.formState.errors.hashtag?.[0]?.message}
              />
            </div>
            <div className='col-span-2 lg:col-span-1'>
              {/* <FormField
                control={form.control}
                name='event'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select Event' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {departmentData?.map((item) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <SelectField
                error={form.formState.errors.event?.message}
                variant='md'
                control={form.control}
                options={departmentData}
                name='event'
                label='Select Event'
                required
                placeholder=' Select Event'
                styletext='!text-black text-[10px]'
              />
            </div>
            <div className='w-full col-span-2 lg:col-span-1'>
              <FormLabel
                className={`${
                  form.formState?.errors?.thumbnail
                    ? 'text-red-500'
                    : 'text-black'
                }`}
              >
                Thumbnail <span className='text-error-main'>*</span>
              </FormLabel>
              <UploadField
                control={form.control}
                name='thumbnail'
                accepted='.jpg, .jpeg, .png'
                variant='sm'
                message={form?.formState?.errors?.thumbnail?.message?.toString()}
                status={form?.formState?.errors?.thumbnail ? 'error' : 'none'}
              />
            </div>
            <div className='col-span-2 lg:col-span-1'>
              <FormField
                control={form.control}
                name='caption_thumbnail'
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
              <Label htmlFor='othersPhoto'>Foto Lainnya (Maksimal 5)</Label>
              <DraggableImageInput
                className='border-none min-h-[75px]'
                name='othersPhoto'
                variant='lg'
                control={form.control}
                status={form.formState.errors.othersPhoto ? 'error' : undefined}
              />
              {form.formState.errors.othersPhoto &&
                typeof form.formState.errors.othersPhoto.message ===
                  'string' && (
                  <span className='text-red-700 text-xs'>
                    {form.formState.errors.othersPhoto.message}
                  </span>
                )}
            </div>
            <div className='col-span-2 lg:col-span-1 flex flex-col  w-full lg:pt-[155px] gap-4 lg:gap-8'>
              {othersPhotoLength !== undefined &&
                Array(othersPhotoLength)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index} className='lg:h-40'>
                      <FormField
                        control={form.control}
                        name={
                          `caption_othersPhoto_${index + 1}` as keyof z.infer<
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
                Simpan
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FormAddNewsSection;
