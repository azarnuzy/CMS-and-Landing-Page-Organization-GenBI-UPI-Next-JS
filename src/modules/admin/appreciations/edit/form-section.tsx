'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import 'react-day-picker/dist/style.css';

import { cn } from '@/lib/utils';
import { ValidationSchemaPutAppreciation } from '@/lib/validations/appreciations';
import {
  useGetAppreciationDetail,
  usePutAppreciations,
} from '@/hooks/appreciations/hook';

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
import { stateFromHTML } from 'draft-js-import-html';
import draftToHtml from 'draftjs-to-html';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { UploadField } from '@/components/input/upload-file';

import { defaultValuesPutAppreciations } from '@/modules/admin/appreciations/edit/constant';

const FormEditAppreciationSection = () => {
  const { id } = useParams();

  const { data, refetch } = useGetAppreciationDetail(Number(id));
  const { mutate, status } = usePutAppreciations();

  const form = useForm<z.infer<typeof ValidationSchemaPutAppreciation>>({
    resolver: zodResolver(ValidationSchemaPutAppreciation),
  });

  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );
  const [getCover, setCover] = useState<string>('');

  const handleEditorChange = (editorState: EditorState) => {
    setEditorState(editorState);

    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const htmlContent = draftToHtml(rawContentState);

    form.setValue('caption', htmlContent, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const onSubmit = (data: z.infer<typeof ValidationSchemaPutAppreciation>) => {
    try {
      let payload = data;

      if (data?.cover) {
        payload = {
          ...data,
          cover: data.cover[0],
        };
      } else {
        delete payload.cover;
      }

      mutate(
        { id: Number(id), payload },
        {
          onSuccess: () => {
            toast.success('Appreciation edited successfully');
            refetch();
          },
          onError: (error) => {
            toast.error(error?.response?.data?.message);
          },
        }
      );
    } catch (error) {
      throw new Error('Error editing appreciation');
    }
  };

  useEffect(() => {
    if (data) {
      const contentState = stateFromHTML(data?.data?.caption);
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
      setCover(data?.data?.cover?.alt);
      form.reset(defaultValuesPutAppreciations(data?.data));
    }
  }, [data, form]);

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
                name='title'
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
                name='given_date'
                render={({ field }) => (
                  <FormItem className='flex flex-col w-full'>
                    <FormLabel className='mb-2.5'>Given Date</FormLabel>
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
                name='instagram_url'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Instagram URL <span className='text-error-main'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder='Input Your Fullname...' {...field} />
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
                label='Caption'
                error={form?.formState?.errors?.caption?.message}
              />
            </div>
            <div className='w-full col-span-2 flex flex-col'>
              <div className='w-full'>
                <FormLabel
                  className={`${
                    form.formState?.errors?.cover
                      ? 'text-red-500'
                      : 'text-black'
                  }`}
                >
                  Cover <span className='text-error-main'>*</span>
                </FormLabel>
                <UploadField
                  control={form.control}
                  name='cover'
                  getname={getCover}
                  setname={setCover}
                  accepted='.jpg, .jpeg, .png'
                  variant='sm'
                  message={form?.formState?.errors?.cover?.message?.toString()}
                  status={form?.formState?.errors?.cover ? 'error' : 'none'}
                />
              </div>
              {data && !form.getValues('cover') && (
                <div className='relative w-full max-w-[400px]'>
                  <div className='m-2 w-full'>
                    <div className='relative mx-auto w-full h-40 overflow-hidden rounded-lg shadow-md'>
                      <Image
                        src={
                          data?.data?.cover?.file_url ||
                          '/images/no-photo-available.png'
                        }
                        alt='image'
                        className='object-cover w-full h-full'
                        width={0}
                        height={0}
                        sizes='50vw'
                      />
                    </div>
                  </div>
                </div>
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
              <Link href='/admin/appreciations'>Cancel</Link>
            </Button>
            <div className='flex justify-end'>
              <Button
                type='submit'
                className='rounded-full text-white px-6 py-2.5 font-semibold border-primary-main bg-primary-main hover:bg-primary-dark transition-colors duration-200 ease-in-out'
                disabled={status === 'pending'}
              >
                {status === 'pending' ? 'Loading...' : 'Edit'}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FormEditAppreciationSection;
