'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { convertToRaw, EditorState } from 'draft-js';
import { stateFromHTML } from 'draft-js-import-html';
import draftToHtml from 'draftjs-to-html';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { ValidationSchemaUpdateDepartmentForm } from '@/lib/validations/department';
import {
  useGetDepartmentById,
  useUpdateDepartment,
} from '@/hooks/departments/hook';
import { useGetOptionManagements } from '@/hooks/managements/hook';

import { UploadField } from '@/components/input/upload-file';
import MiniSpinner from '@/components/spinner';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { defaultValuesAddDepartment } from '@/modules/admin/departments/add/constant';
import { defaultValuesEditDepartment } from '@/modules/admin/departments/edit/constant';

const DraftEditor = dynamic(() => import('@/components/text-editor'), {
  ssr: false,
});

const FormEditDepartmentSection = () => {
  const { id } = useParams();

  const { data } = useGetOptionManagements();
  const { data: dataDepartment, refetch } = useGetDepartmentById({
    id: Number(id),
  });
  const { mutate, status } = useUpdateDepartment();

  const form = useForm<z.infer<typeof ValidationSchemaUpdateDepartmentForm>>({
    resolver: zodResolver(ValidationSchemaUpdateDepartmentForm),
    defaultValues: defaultValuesAddDepartment,
  });

  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );
  const [getCoverName, setCoverName] = useState<string>('');

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
    data: z.infer<typeof ValidationSchemaUpdateDepartmentForm>
  ) => {
    let payload = data;

    if (data?.cover) {
      payload = {
        ...data,
        cover: data?.cover[0],
      };
    }

    mutate(
      { id: Number(id), payload },
      {
        onSuccess: () => {
          form.reset(defaultValuesAddDepartment);
          toast.success('Department added successfully');
          refetch();
        },
        onError: (error) => {
          toast.error(error?.response?.data?.message);
        },
      }
    );
  };

  useEffect(() => {
    if (dataDepartment) {
      form.reset(defaultValuesEditDepartment(dataDepartment?.data));
      setCoverName(dataDepartment?.data?.department?.cover?.alt);
      const contentState = stateFromHTML(
        dataDepartment?.data?.department?.description
      );
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
    }
  }, [dataDepartment, form]);

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
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Department Name <span className='text-error-main'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Input Department Name...'
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
                name='management_id'
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>
                        Select Management{' '}
                        <span className='text-error-main'>*</span>
                      </FormLabel>
                      <Select
                        value={String(field.value)}
                        onValueChange={(e) => {
                          field.onChange(Number(e));
                        }}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select Management ' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {data?.data?.map((item, index) => {
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
            <div className='col-span-2'>
              <DraftEditor
                editorState={editorState}
                setEditorState={(editorStateParams) => {
                  handleEditorChange(editorStateParams);
                }}
                required
                label='Description'
                error={form.formState.errors.description?.message}
              />
            </div>

            <div className='col-span-2 flex flex-col'>
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
                  getname={getCoverName}
                  setname={setCoverName}
                  control={form.control}
                  name='cover'
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
                          dataDepartment?.data?.department?.cover?.file_url ||
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
              <Link href='/admin/department'>Batal</Link>
            </Button>
            <div className='flex justify-end'>
              <Button
                type='submit'
                className='rounded-full text-white px-6 py-2.5 font-semibold border-primary-main bg-primary-main hover:bg-primary-dark transition-colors duration-200 ease-in-out flex items-center gap-2'
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

export default FormEditDepartmentSection;
