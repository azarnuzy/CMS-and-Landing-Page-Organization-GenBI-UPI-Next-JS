'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { convertToRaw, EditorState } from 'draft-js';
import { stateFromHTML } from 'draft-js-import-html';
import draftToHtml from 'draftjs-to-html';
import dynamic from 'next/dynamic';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { toast } from 'sonner';
import { z } from 'zod';

import { ValidationSchemaPutNewsForm } from '@/lib/validations/news';
import { useGetOptionDepartments } from '@/hooks/departments/hook';
import { useGetEventOptions } from '@/hooks/events/hook';
import {
  useGetDetailPost,
  useGetPostTypes,
  usePutPost,
} from '@/hooks/posts/hook';

import InputTag from '@/components/input/tag';
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
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  defaultValuesPutPost,
  putPayloadPost,
} from '@/modules/admin/news/edit/constant';
import { inputTagState } from '@/recoils/admin/atom';

const DraftEditor = dynamic(() => import('@/components/text-editor'), {
  ssr: false,
});

import { Check, ChevronsUpDown, File } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { IoMdAddCircle } from 'react-icons/io';

import { cn } from '@/lib/utils';
import { useAddDocument } from '@/hooks/documents/hook';
import { useAddPhoto } from '@/hooks/photos/hook';
import { useGetUserOptions } from '@/hooks/users/hook';

import MiniSpinner from '@/components/spinner';
import { ScrollArea } from '@/components/ui/scroll-area';

import { usersGetOptionParams } from '@/modules/admin/news/add/constant';
import FilePreview from '@/modules/admin/news/edit/file-action';
import { postAdminDetailDataState } from '@/recoils/admin/news/atom';

import { TUserOptionsData } from '@/types/users';

const FormEditEventSection = ({ id }: { id: string }) => {
  const { data, refetch } = useGetDetailPost({ id: Number(id) });
  const { data: dataDepartmentOption } = useGetOptionDepartments();
  const { data: dataPostType } = useGetPostTypes();
  const { data: dataUser } = useGetUserOptions(usersGetOptionParams);
  const { data: dataEventOption } = useGetEventOptions(usersGetOptionParams);

  const form = useForm<z.infer<typeof ValidationSchemaPutNewsForm>>({
    resolver: zodResolver(ValidationSchemaPutNewsForm),
  });

  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );
  const [, setThumbnailName] = useState<string>('');
  const [otherPhoto, setOtherPhoto] = useState<File | null>(null);
  const [docs, setDocs] = useState<File | null>(null);
  const [isAddPhoto, setIsAddPhoto] = useState(false);
  const [isAddDocs, setIsAddDocs] = useState(false);
  const [captionOtherPhoto, setCaptionOtherPhoto] = useState('');

  const [, setTags] = useRecoilState(inputTagState);
  const [, setDataDetail] = useRecoilState(postAdminDetailDataState);

  const { mutate, status } = usePutPost();
  const { mutate: mutateAddPhoto, status: statusAddPhoto } = useAddPhoto();
  const { mutate: mutateAddDocument, status: statusAddDocument } =
    useAddDocument();

  const handleEditorChange = useCallback(
    (editorState: EditorState) => {
      setEditorState(editorState);

      const contentState = editorState.getCurrentContent();
      const rawContentState = convertToRaw(contentState);
      const htmlContent = draftToHtml(rawContentState);

      form.setValue('content', htmlContent, {
        shouldDirty: true,
        shouldValidate: true,
      });
    },
    [form]
  );

  const coverData = form.watch('cover');

  const handleAddPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      setOtherPhoto(fileList[0]);
    }
    setIsAddPhoto(true);
  };
  const handleAddDocs = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      setDocs(fileList[0]);
    }
    setIsAddDocs(true);
  };

  const onSubmit = (data: z.infer<typeof ValidationSchemaPutNewsForm>) => {
    try {
      const payloadPost = putPayloadPost(data);

      mutate(
        { payload: payloadPost, id: Number(id) },
        {
          onSuccess: () => {
            toast.success(`Berhasil mengubah data ${data.title}`);
            refetch();
          },
          onError: (error) => {
            toast.error(
              error?.response?.data?.message ||
                `Gagal mengubah data ${data.title}`
            );
          },
        }
      );
    } catch (error) {
      toast.error('Gagal menambahkan berita');
    }
  };

  const onChangeAddCaptionOther = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCaptionOtherPhoto(e.target.value);
    },
    []
  );

  useEffect(() => {
    if (data) {
      setTags(
        data?.data?.post?.tags?.filter(
          (item, index) => index > 0 && item !== null
        )
      );
      setDataDetail(data?.data);
      setThumbnailName(data.data.post.image_cover.alt);
      const contentState = stateFromHTML(data.data.post.content);
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);

      form.reset(defaultValuesPutPost(data?.data));
    }
  }, [data, form, form.reset, setDataDetail, setTags]);

  return (
    <div className='border rounded-3xl px-6 py-6 sm:my-10 shadow-sm'>
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
                        className='flex gap-2 items-center flex-wrap'
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
                        onValueChange={(e) => {
                          if (e.length > 0) {
                            field.onChange(Number(e));
                          }
                        }}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select Department ' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {dataDepartmentOption?.data?.map((item, index) => {
                            return (
                              <SelectItem key={index} value={String(item.id)}>
                                {item.name}
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
                              ? dataUser?.data.find(
                                  (item: TUserOptionsData) =>
                                    item.id === field.value
                                )?.awardee_name
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
                              {dataUser?.data.map((item: TUserOptionsData) => {
                                return (
                                  item.awardee_name !== null && (
                                    <CommandItem
                                      value={item.awardee_name}
                                      key={item.id}
                                      onSelect={() => {
                                        form.setValue('author_id', item.id);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          'mr-2 h-4 w-4',
                                          item.id === field.value
                                            ? 'opacity-100'
                                            : 'opacity-0'
                                        )}
                                      />
                                      {item.awardee_name}
                                    </CommandItem>
                                  )
                                );
                              })}
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
                        onValueChange={(e) => {
                          if (e.length > 0) {
                            field.onChange(Number(e));
                          }
                        }}
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

              {coverData === undefined &&
                data?.data?.post?.image_cover?.file_url && (
                  <FilePreview
                    url={data?.data?.post?.image_cover?.file_url}
                    isEdit={true}
                    isRemove={false}
                    payload={{
                      caption: form.getValues('caption_cover') || '',
                      photo_id: data?.data?.post?.image_cover?.id,
                      post_id: data?.data?.post?.id,
                      category: 'post_cover_image',
                    }}
                    invalidateQueryName='get-detail-post'
                    typeFile='image/jpeg'
                  />
                )}
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
              <div className='flex justify-between w-full'>
                <Label htmlFor='other'>Other Photos (Maximum 5)</Label>
                <label
                  htmlFor='other-photo'
                  className='cursor-pointer text-primary-main flex items-center gap-2'
                >
                  <input
                    type='file'
                    hidden
                    id='other-photo'
                    onChange={handleAddPhoto}
                    className='hidden'
                  />
                  <span>Add Other Photo</span>
                  <IoMdAddCircle className='text-primary-main' size={20} />
                </label>
              </div>
              <div className='flex flex-col gap-4'>
                {isAddPhoto && (
                  <>
                    <div className='relative w-full max-w-[400px]'>
                      <div className='m-2 w-full'>
                        <div className='relative mx-auto w-full h-40 overflow-hidden rounded-lg shadow-md'>
                          <Image
                            src={URL.createObjectURL(otherPhoto as File)}
                            alt='image'
                            className='object-cover w-full h-full'
                            width={0}
                            height={0}
                            sizes='50vw'
                          />
                        </div>
                        <div
                          onClick={() => {
                            setIsAddPhoto(false);
                            setOtherPhoto(null);
                          }}
                          className='absolute top-2 right-2 p-1 bg-white rounded-full cursor-pointer'
                        >
                          <AiOutlineCloseCircle color='#e63a3a' size={20} />
                        </div>
                      </div>
                    </div>
                    <Label>Caption Add Other Photo</Label>
                    <Input
                      placeholder='Input Caption Thumbnail'
                      onChange={onChangeAddCaptionOther}
                    />
                    <Button
                      type='button'
                      onClick={() => {
                        if (otherPhoto) {
                          mutateAddPhoto(
                            {
                              file: otherPhoto,
                              caption: captionOtherPhoto,
                              category: 'post_cover_image',
                              featured: false,
                              post_id: data?.data?.post?.id,
                            },
                            {
                              onSuccess: () => {
                                refetch();
                                setIsAddPhoto(false);
                                setOtherPhoto(null);
                                toast.success('Success add other photo');
                              },
                              onError: (error) => {
                                toast.error(
                                  error?.response?.data?.message ||
                                    'Fail add other photo'
                                );
                              },
                            }
                          );
                        }
                      }}
                      className='rounded-full text-white px-6 py-2.5 font-semibold border-primary-main bg-primary-main hover:bg-primary-dark transition-colors duration-200 ease-in-out'
                    >
                      {statusAddPhoto === 'pending' ? (
                        <div className='flex justify-center gap-2 items-center'>
                          <MiniSpinner />
                          Loading...
                        </div>
                      ) : (
                        'Add Other Photo'
                      )}
                    </Button>
                  </>
                )}
                {data &&
                  data?.data?.post?.images?.length > 0 &&
                  data?.data?.post?.images.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className='relative w-full max-w-[400px]'
                      >
                        <FilePreview
                          url={item.file_url}
                          isEdit={true}
                          isRemove={true}
                          payload={{
                            caption:
                              form.getValues(
                                `caption_ohter_${index + 1}` as keyof z.infer<
                                  typeof ValidationSchemaPutNewsForm
                                >
                              ) ||
                              `Other Photos from ${data?.data?.post?.title}`,
                            photo_id: item.id,
                            post_id: data?.data?.post?.id,
                            category: 'post_other_image',
                          }}
                          invalidateQueryName='get-detail-post'
                          typeFile='image/jpeg'
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className='col-span-2 lg:col-span-1 flex flex-col  w-full md:pt-[20px] gap-4 lg:gap-8'>
              {data &&
                data?.data?.post?.images?.length > 0 &&
                Array(data?.data?.post?.images?.length)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index} className='lg:h-40'>
                      <FormField
                        control={form.control}
                        name={
                          `caption_other_${index + 1}` as keyof z.infer<
                            typeof ValidationSchemaPutNewsForm
                          >
                        }
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Caption Other Photo {index + 1}
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
              <div className='flex justify-between w-full'>
                <Label htmlFor='other'>Other Documents </Label>
                <label
                  htmlFor='other-docs'
                  className='cursor-pointer text-primary-main flex items-center gap-2'
                >
                  <input
                    type='file'
                    hidden
                    id='other-docs'
                    onChange={handleAddDocs}
                    className='hidden'
                  />
                  <span>Add Other Documents</span>
                  <IoMdAddCircle className='text-primary-main' size={20} />
                </label>
              </div>
              <div className='flex flex-col gap-4'>
                {isAddDocs && (
                  <>
                    <div className='m-2 w-full max-w-[400px]'>
                      <div className='relative mx-auto w-full p-2 overflow-hidden rounded-lg shadow-md flex gap-2 items-center'>
                        <File />
                        <p> {docs?.name}</p>
                        <div
                          onClick={() => {
                            setIsAddDocs(false);
                            setDocs(null);
                          }}
                          className='absolute top-2 right-2 p-1 bg-white rounded-full cursor-pointer'
                        >
                          <AiOutlineCloseCircle color='#e63a3a' size={20} />
                        </div>
                      </div>
                    </div>
                    <Button
                      type='button'
                      onClick={() => {
                        if (docs) {
                          mutateAddDocument(
                            {
                              file: docs,
                              category: 'post_attachment',
                              post_id: data?.data?.post?.id as number,
                            },
                            {
                              onSuccess: () => {
                                refetch();
                                setIsAddDocs(false);
                                setDocs(null);
                                toast.success('Success add other documents');
                              },
                              onError: (error) => {
                                toast.error(
                                  error?.response?.data?.message ||
                                    'Fail add other documents'
                                );
                              },
                            }
                          );
                        }
                      }}
                      className='rounded-full text-white px-6 py-2.5 font-semibold border-primary-main bg-primary-main hover:bg-primary-dark transition-colors duration-200 ease-in-out'
                    >
                      {statusAddDocument === 'pending' ? (
                        <div className='flex justify-center gap-2 items-center'>
                          <MiniSpinner />
                          Loading...
                        </div>
                      ) : (
                        'Add Other Document'
                      )}
                    </Button>
                  </>
                )}
                {data &&
                  data?.data?.post?.attachments?.length > 0 &&
                  data?.data?.post?.attachments.map((item, index) => (
                    <div key={index} className='relative w-full max-w-[400px]'>
                      <FilePreview
                        url={item.file_url}
                        isEdit={true}
                        isRemove={true}
                        payload={{
                          photo_id: item.id,
                          post_id: data?.data?.post?.id,
                          category: 'post_attachment',
                        }}
                        invalidateQueryName='get-detail-post'
                        nameFile={item.file_name}
                        typeFile='application/pdf'
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className='flex justify-between'>
            <Button
              asChild
              type='button'
              variant='outline'
              className='border-primary-main rounded-full text-primary-main px-6 py-2.5 font-semibold '
            >
              <Link href='/admin/news'>Cancel</Link>
            </Button>
            <div className='flex justify-end'>
              <Button
                type='submit'
                disabled={status === 'pending'}
                className='disabled:bg-neutral-300 disabled:border-neutral-300 rounded-full text-white px-6 py-2.5 font-semibold border-primary-main bg-primary-main hover:bg-primary-dark transition-colors duration-200 ease-in-out'
              >
                {status === 'pending' ? 'Loading...' : 'Submit'}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FormEditEventSection;
