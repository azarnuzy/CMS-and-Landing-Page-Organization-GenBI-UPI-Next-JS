'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { ValidationSchemaAddNewsForm } from '@/lib/validations/news';

import InputBadge from '@/components/input/badge';
import { UploadField } from '@/components/input/upload-file';
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

import { departmentData } from '@/modules/admin/news/constant';

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
      hashtag: '',
      thumbnail: undefined,
      othersPhoto: undefined,
    },
  });

  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );

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
    toast.success(`Berhasil menambahkan berita ${data.title}`);
  };

  return (
    <div className='border rounded-3xl px-6 py-6 my-10 shadow-sm'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full flex flex-col gap-6'
        >
          <div className='grid grid-cols-2 gap-6'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder='Input news title...' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='type'
              render={({ field }) => (
                <FormItem className='space-y-3'>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
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
            <FormField
              control={form.control}
              name='department'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select Departement' />
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
            />
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
            <FormField
              control={form.control}
              name='hashtag'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputBadge
                      label='Hashtag'
                      required={false}
                      placeholder='ex: #tags'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='event'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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
            />
            <div className='w-full'>
              <Label>Unggah Thumbnail</Label>
              <UploadField
                control={form.control}
                name='thumbnail'
                accepted='.jpg, .jpeg, .png'
                variant='sm'
                message={form?.formState?.errors?.thumbnail?.message?.toString()}
                status={form?.formState?.errors?.thumbnail ? 'error' : 'none'}
              />
            </div>
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
        </form>
      </Form>
    </div>
  );
};

export default FormAddNewsSection;
