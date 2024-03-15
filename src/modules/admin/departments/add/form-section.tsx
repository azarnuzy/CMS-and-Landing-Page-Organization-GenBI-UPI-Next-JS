'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { ValidationSchemaAddDepartmentForm } from '@/lib/validations/department';
import { useAddDepartments } from '@/hooks/departments/hook';
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

import { TAddDepartmentPayload } from '@/types/departments';

const DraftEditor = dynamic(() => import('@/components/text-editor'), {
  ssr: false,
});

const FormAddDepartmentSection = () => {
  const { data } = useGetOptionManagements();
  const { mutate, status } = useAddDepartments();

  const form = useForm<z.infer<typeof ValidationSchemaAddDepartmentForm>>({
    resolver: zodResolver(ValidationSchemaAddDepartmentForm),
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
    data: z.infer<typeof ValidationSchemaAddDepartmentForm>
  ) => {
    const payload: TAddDepartmentPayload = {
      ...data,
      cover: data.cover[0],
    };

    mutate(payload, {
      onSuccess: () => {
        form.reset(defaultValuesAddDepartment);
        toast.success('Department added successfully');
        setEditorState(EditorState.createEmpty());
        setCoverName('');
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message);
      },
    });
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

            <div className='col-span-2'>
              <FormLabel
                className={`${
                  form.formState?.errors?.cover ? 'text-red-500' : 'text-black'
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

export default FormAddDepartmentSection;
