'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { convertToRaw, EditorState } from 'draft-js';
import { stateFromHTML } from 'draft-js-import-html';
import draftToHtml from 'draftjs-to-html';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { toast } from 'sonner';
import { z } from 'zod';

import logger from '@/lib/logger';
import { ValidationSchemaAddNewsForm } from '@/lib/validations/news';
import { useGetDepartmentsTags } from '@/hooks/departments/hook';
import { useGetAllEvent } from '@/hooks/events/hook';
import { useGetDetailPost } from '@/hooks/posts/hook';

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { defaultValuesData } from '@/modules/admin/news/edit/constant';
import { inputTagState, inputUploadState } from '@/recoils/admin/atom';

const DraftEditor = dynamic(() => import('@/components/text-editor'), {
  ssr: false,
});

import { urlToFile } from '@/lib/utils/general-function';

const FormEditNewsSection = ({ id }: { id: string }) => {
  const { data } = useGetDetailPost({ id: Number(id) });
  const { data: dataTags } = useGetDepartmentsTags();
  const { data: dataEvent } = useGetAllEvent({
    sort: 'created_at',
    type: 'desc',
    limit: 10,
    page: 1,
  });
  const form = useForm<z.infer<typeof ValidationSchemaAddNewsForm>>({
    resolver: zodResolver(ValidationSchemaAddNewsForm),
    defaultValues: defaultValuesData,
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
  };

  useEffect(() => {
    if (data) {
      const defaultValues = {
        title: data.data.post.title || '',
        type: data.data.post.type || '',
        department: data.data.post.department_name || '',
        content: data.data.post.content || '',
        hashtag: data.data.post.tags || '',
        thumbnail: data.data.post.image_cover.file_url || '',
        caption_thumbnail: data.data.post.image_cover.caption || '',
        event: String(data.data.post.event.id) || 0,
      };
      setTags(data.data.post.tags);
      setNameUpload(data.data.post.image_cover.alt);
      const contentState = stateFromHTML(data.data.post.content);
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);

      const promises = data.data.post.images.map((item) => {
        return urlToFile(item.file_url);
      });

      Promise.all(promises)
        .then((files) => {
          // Once all promises are resolved, set the value in the form
          logger(files);
          form.setValue('othersPhoto', files);
        })
        .catch((error) => {
          logger(error);
        });

      form.reset(defaultValues as z.infer<typeof ValidationSchemaAddNewsForm>);
    }
  }, [data, form, form.reset, setNameUpload, setTags]);

  useEffect(() => {
    logger(form.formState.errors);
  }, [form.formState.errors]);

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
                render={({ field }) => {
                  return (
                    <FormItem className='space-y-3'>
                      <FormLabel>
                        Type <span className='text-error-main'>*</span>
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          defaultValue={field.value}
                          onValueChange={field.onChange}
                          className='flex gap-2 items-center'
                        >
                          <FormItem className='flex items-center space-x-3 space-y-0'>
                            <FormControl>
                              <RadioGroupItem
                                value='Article'
                                checked={field.value === 'Article'}
                              />
                            </FormControl>
                            <FormLabel className='font-normal'>
                              Artikel
                            </FormLabel>
                          </FormItem>
                          <FormItem className='flex items-center space-x-3 space-y-0'>
                            <FormControl>
                              <RadioGroupItem
                                value='Press Release'
                                checked={field.value === 'Press Release'}
                              />
                            </FormControl>
                            <FormLabel className='font-normal'>
                              Press Release
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
            <div className='col-span-2 lg:col-span-1'>
              <FormField
                control={form.control}
                name='department'
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Select Department *</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select Department ' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {dataTags?.data?.map((item) => {
                            return (
                              <SelectItem key={item} value={item}>
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

            <div className='col-span-2'>
              <DraftEditor
                required
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
                required
              />
            </div>
            <div className='col-span-2 lg:col-span-1'>
              <FormField
                control={form.control}
                name='event'
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>
                        Select Event <span className='text-error-main'>*</span>
                      </FormLabel>
                      <Select
                        value={field.value?.toString() || 'Select Event'}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select Event ' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {dataEvent?.data?.map((item, i) => {
                            return (
                              <SelectItem key={i} value={item.id.toString()}>
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
            {/* <Dialog>
              <DialogTrigger>
                <Button
                  type='button'
                  variant='outline'
                  className='border-primary-main rounded-full text-primary-main px-6 py-2.5 font-semibold '
                >
                  Batal
                </Button>
              </DialogTrigger>
              <DialogContent className='max-w-[320px] rounded-3xl '>
                <DialogHeader>
                  <div className='flex flex-col gap-2'>
                    <div className='w-7 h-7 bg-warning-100 rounded-full'>
                      <IoAlertCircle className='text-warning-main w-5 h-5 mx-auto my-1' />
                    </div>
                    <h4 className='text-warning-main'>Batalkan Edit Data?</h4>
                    <p className='text-neutral-600'>
                      Jika Anda membatalkan, semua perubahan yang telah Anda
                      buat akan hilang.
                    </p>
                  </div>
                  <div className='mt-7 w-full'>
                    <Button
                      asChild
                      type='button'
                      variant='ghost'
                      className='border-neutral-main bg-neutral-main rounded-full text-neutral-100  px-6 py-2.5 font-semibold mt-4 w-full'
                    >
                      <Link href='/admin/news'>Iya, Batalkan</Link>
                    </Button>
                  </div>
                </DialogHeader>
              </DialogContent>
            </Dialog> */}

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

export default FormEditNewsSection;
