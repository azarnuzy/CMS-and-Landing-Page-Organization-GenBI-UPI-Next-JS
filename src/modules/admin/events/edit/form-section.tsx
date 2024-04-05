'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import 'react-day-picker/dist/style.css';

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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

// import { department_idData } from '@/modules/admin/news/constant';

const DraftEditor = dynamic(() => import('@/components/text-editor'), {
  ssr: false,
});

import { format } from 'date-fns';
import { stateFromHTML } from 'draft-js-import-html';
import { CalendarIcon, Check, ChevronsUpDown } from 'lucide-react';
import Link from 'next/link';
import { DayPicker } from 'react-day-picker';
import { useRecoilState } from 'recoil';

import { cn } from '@/lib/utils';
import { ValidationSchemaPutEventForm } from '@/lib/validations/event';
import {
  useGetDetailEvent,
  useGetEventScopes,
  useGetEventTypes,
  usePutEvent,
} from '@/hooks/events/hook';
import { useGetOptionPrograms } from '@/hooks/program/request';

import InputTag from '@/components/input/tag';
import MiniSpinner from '@/components/spinner';
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
  defaultValuesPutEvent,
  putPayloadEvent,
} from '@/modules/admin/events/edit/constant';
import FilePreview from '@/modules/admin/news/edit/file-action';
import { inputTagState } from '@/recoils/admin/atom';

const FromEditEventSection = ({ id }: { id: number }) => {
  const form = useForm<z.infer<typeof ValidationSchemaPutEventForm>>({
    resolver: zodResolver(ValidationSchemaPutEventForm),
  });

  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );
  const [, setThumbnailName] = useState<string>('');
  const [, setBannerName] = useState<string>('');
  const [, setPosterName] = useState<string>('');

  const { mutate, status } = usePutEvent();

  const [, setTags] = useRecoilState(inputTagState);

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

  const { data, refetch } = useGetDetailEvent({ id });
  const { data: dataProgramOptions } = useGetOptionPrograms();
  const { data: dataEventTypes } = useGetEventTypes();
  const { data: dataScopeOptions } = useGetEventScopes();

  const banner = form.watch('banner');
  const thumbnail = form.watch('thumbnail');
  const poster = form.watch('poster');

  const onSubmit = (data: z.infer<typeof ValidationSchemaPutEventForm>) => {
    try {
      const putPayloadPost = putPayloadEvent(data);

      mutate(
        {
          id: id,
          payload: putPayloadPost,
        },
        {
          onSuccess: () => {
            toast.success(`Event ${data.title} updated successfully`);
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
      toast.error('Failed to update event');
    }
  };

  useEffect(() => {
    if (data) {
      // setTags(
      //   data?.data?.event?.tags?.filter(
      //     (item, index) => index > 0 && item !== null
      //   )
      // );
      setThumbnailName(data.data.event.thumbnail.alt);
      setBannerName(data.data.event.banner.alt);
      setPosterName(data.data.event.poster.alt);
      const contentState = stateFromHTML(data.data.event.description);
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
      form.reset(defaultValuesPutEvent(data.data));
    }
  }, [data, form, setTags]);

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
                      <Input placeholder='Input event title...' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='col-span-2 lg:col-span-1'>
              <FormField
                control={form.control}
                name='program_id'
                render={({ field }) => (
                  <FormItem className='flex flex-col gap-2'>
                    <FormLabel>Program</FormLabel>
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
                              ? dataProgramOptions?.data?.find((language) => {
                                  return language.id == field.value;
                                })?.name
                              : 'Select Program'}
                            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-full p-0'>
                        <Command>
                          <CommandInput placeholder='Search Program...' />
                          <CommandEmpty>No Program found.</CommandEmpty>
                          <ScrollArea className='h-[200px]'>
                            <CommandGroup>
                              {dataProgramOptions?.data?.map((item) => {
                                return (
                                  item.name !== null && (
                                    <CommandItem
                                      value={item.name}
                                      key={item.id}
                                      onSelect={() => {
                                        form.setValue('program_id', item.id);
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
                                      {item.name}
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
                        {dataEventTypes?.data?.map((item, index) => {
                          return (
                            <FormItem
                              key={index}
                              className='flex items-center space-x-3 space-y-0 flex-wrap'
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
                name='location'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Location <span className='text-error-main'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder='Input event Location...' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='col-span-2 lg:col-span-1'>
              <FormField
                control={form.control}
                name='location_url'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Input event location url...'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='col-span-2 lg:col-span-1'>
              <FormField
                control={form.control}
                name='registration_link'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Registration URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Input registration url...'
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
                name='start_date'
                render={({ field }) => (
                  <FormItem className='flex flex-col w-full'>
                    <FormLabel className='mb-2.5'>
                      Event Start Date
                      <span className='text-error-main'>*</span>
                    </FormLabel>
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
                name='end_date'
                render={({ field }) => (
                  <FormItem className='flex flex-col w-full'>
                    <FormLabel className='mb-2.5'>Event End Date</FormLabel>
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
                name='start_reg_date'
                render={({ field }) => (
                  <FormItem className='flex flex-col w-full'>
                    <FormLabel className='mb-2.5'>
                      Event Start Registration Date{' '}
                      <span className='text-error-main'>*</span>
                    </FormLabel>
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
                name='end_reg_date'
                render={({ field }) => (
                  <FormItem className='flex flex-col w-full'>
                    <FormLabel className='mb-2.5'>
                      Event End Registration Date{' '}
                      <span className='text-error-main'>*</span>
                    </FormLabel>
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
            <div className='col-span-2 lg:col-span-1'>
              <FormField
                control={form.control}
                name='contact'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Contact Person (Whatsapp){' '}
                      <span className='text-error-main'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder='Input contact person...' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='col-span-2 lg:col-span-1'>
              <FormField
                control={form.control}
                name='scope'
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>
                        Select Scopes
                        <span className='text-error-main'>*</span>
                      </FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={(e) => {
                          field.onChange(e);
                        }}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select Scopes ' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {dataScopeOptions?.data?.map((item, index) => {
                            return (
                              <SelectItem key={index} value={String(item)}>
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
                label='Description'
                error={form.formState.errors.description?.message}
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
              {thumbnail === undefined &&
                data?.data?.event.thumbnail?.file_url && (
                  <FilePreview
                    url={data?.data?.event.thumbnail?.file_url}
                    isEdit={true}
                    isRemove={false}
                    payload={{
                      caption: form.getValues('thumbnail') || '',
                      photo_id: data?.data?.event.thumbnail?.id,
                      post_id: data?.data?.event?.id,
                      category: 'post_cover_image',
                    }}
                    invalidateQueryName='get-detail-event'
                    typeFile='image/jpeg'
                  />
                )}
            </div>
            <div className='w-full col-span-2 lg:col-span-1'>
              <FormLabel
                className={`${
                  form.formState?.errors?.poster ? 'text-red-500' : 'text-black'
                }`}
              >
                Poster <span className='text-error-main'>*</span>
              </FormLabel>
              {poster === undefined && data?.data?.event.poster?.file_url && (
                <FilePreview
                  url={data?.data?.event.poster?.file_url}
                  isEdit={true}
                  isRemove={false}
                  payload={{
                    caption: form.getValues('poster') || '',
                    photo_id: data?.data?.event.poster?.id,
                    post_id: data?.data?.event?.id,
                    category: 'post_cover_image',
                  }}
                  invalidateQueryName='get-detail-event'
                  typeFile='image/jpeg'
                />
              )}
            </div>
            <div className='w-full col-span-2 lg:col-span-1'>
              <FormLabel
                className={`${
                  form.formState?.errors?.poster ? 'text-red-500' : 'text-black'
                }`}
              >
                Banner <span className='text-error-main'>*</span>
              </FormLabel>
              {banner === undefined && data?.data?.event.banner?.file_url && (
                <FilePreview
                  url={data?.data?.event.banner?.file_url}
                  isEdit={true}
                  isRemove={false}
                  payload={{
                    caption: form.getValues('banner') || '',
                    photo_id: data?.data?.event.poster?.id,
                    post_id: data?.data?.event?.id,
                    category: 'post_cover_image',
                  }}
                  invalidateQueryName='get-detail-event'
                  typeFile='image/jpeg'
                />
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
              <Link href='/admin/events'>Batal</Link>
            </Button>
            <div className='flex justify-end'>
              <Button
                type='submit'
                className='rounded-full text-white px-6 py-2.5 font-semibold border-primary-main bg-primary-main hover:bg-primary-dark transition-colors duration-200 ease-in-out flex gap-2 items-center disabled:bg-neutral-600'
                disabled={status === 'pending'}
              >
                {status === 'pending' ? (
                  <>
                    <MiniSpinner /> <span>Loading...</span>
                  </>
                ) : (
                  'Simpan'
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FromEditEventSection;
