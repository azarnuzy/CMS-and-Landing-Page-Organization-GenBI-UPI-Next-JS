'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue } from 'recoil';
import { toast } from 'sonner';
import { z } from 'zod';

import { getTimeDifference } from '@/lib/utils/general-function';
import { ValidationSchemaAddCommentForm } from '@/lib/validations/comment';
import { useCreateComment, useCreateReply } from '@/hooks/comments/hook';
import { useGetCommentPost } from '@/hooks/posts/hook';

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
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';

import {
  commentsDataState,
  totalCommentsSelector,
} from '@/recoils/comments/atom';

const CommentsSection = () => {
  const params = useParams();
  const { id } = params;

  const form = useForm<z.infer<typeof ValidationSchemaAddCommentForm>>({
    resolver: zodResolver(ValidationSchemaAddCommentForm),
    defaultValues: {
      name: '',
      content: '',
    },
  });

  const formReply = useForm<z.infer<typeof ValidationSchemaAddCommentForm>>({
    resolver: zodResolver(ValidationSchemaAddCommentForm),
    defaultValues: {
      name: '',
      content: '',
    },
  });

  const { data, refetch } = useGetCommentPost({ id: Number(id) });
  const { mutate } = useCreateComment();
  const { mutate: mutateReply } = useCreateReply();

  const [getComments, setComments] = useRecoilState(commentsDataState);
  const totalComments = useRecoilValue(totalCommentsSelector);

  const [formReplyOpen, setFormReplyOpen] = useState<number | null>(null);

  const onSubmit = (data: z.infer<typeof ValidationSchemaAddCommentForm>) => {
    mutate(
      {
        name: data.name || 'Anonim',
        content: data.content,
        post_id: Number(id),
      },
      {
        onSuccess: () => {
          refetch();
          form.reset();
          form.setValue('name', '');
          form.setValue('content', '');
          toast.success('Komentar berhasil ditambahkan');
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  const onSubmitReply = (
    data: z.infer<typeof ValidationSchemaAddCommentForm>
  ) => {
    mutateReply(
      {
        name: data.name || 'Anonim',
        content: data.content,
        comment_id: formReplyOpen as number,
      },
      {
        onSuccess: () => {
          refetch();
          formReply.reset();
          setFormReplyOpen(null);
          formReply.setValue('name', '');
          formReply.setValue('content', '');
          toast.success('Balasan berhasil ditambahkan');
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  useEffect(() => {
    if (data) {
      setComments(data.data);
    }
  }, [data, setComments]);

  return (
    <div className='flex flex-col gap-4'>
      <h4>Comments ({totalComments || 0})</h4>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full flex flex-col gap-2'
        >
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama</FormLabel>
                <FormControl>
                  <Input placeholder='Masukkan Nama...' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='content'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Komentar <span className='text-error-main'>*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Berikan Komentar...'
                    className='resize-none'
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className='w-full flex justify-end'>
            <Button
              type='submit'
              className='bg-primary-main text-neutral-100 rounded-full'
            >
              Send
            </Button>
          </div>
        </form>
      </Form>
      <div className='flex flex-col gap-4'>
        {getComments.map((comment, i) => (
          <Fragment key={i}>
            <Separator />
            <div key={i} className='flex flex-col gap-3'>
              <div className='flex flex-col'>
                <h5 className='text-primary-main font-bold'>
                  {comment?.commenter || 'Anonim'}
                </h5>
                <p className='text-sm text-neutral-600'>
                  {getTimeDifference(comment?.updated_at)}
                </p>
              </div>
              <p>{comment.content}</p>
              <div className='flex w-full justify-between'>
                <div className='flex gap-1 items-center'>
                  <Image
                    src='/svg/message-chat.svg'
                    alt='message-chat'
                    width={24}
                    height={24}
                  />
                  {comment?.replies?.length || 0} reply
                </div>
                <Button
                  variant='outline'
                  className='text-neutral-900 border-primary-100 border bg-transparent rounded-full'
                  onClick={() => setFormReplyOpen(comment.id)}
                >
                  Reply
                </Button>
              </div>
              {formReplyOpen === comment.id && (
                <Form {...formReply}>
                  <form
                    onSubmit={formReply.handleSubmit(onSubmitReply)}
                    className='w-full flex flex-col gap-2'
                  >
                    <FormField
                      control={formReply.control}
                      name='name'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nama</FormLabel>
                          <FormControl>
                            <Input placeholder='Masukkan Nama...' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={formReply.control}
                      name='content'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Balasan <span className='text-error-main'>*</span>
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder='Berikan Balasan...'
                              className='resize-none'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className='w-full flex justify-end'>
                      <div className='flex gap-4 items-center'>
                        <Button
                          type='button'
                          className='bg-neutral-100 text-primary-main border-primary-main rounded-full border hover:bg-primary-main hover:text-neutral-100'
                          onClick={() => setFormReplyOpen(null)}
                        >
                          Cancel
                        </Button>
                        <Button
                          type='submit'
                          className='bg-primary-main border-primary-main text-neutral-100 rounded-full'
                        >
                          Send
                        </Button>
                      </div>
                    </div>
                  </form>
                </Form>
              )}
              <div className='pl-6 border-l border-neutral-300 flex flex-col gap-4'>
                {comment?.replies?.map((reply, i) => (
                  <div key={i} className='flex flex-col gap-3'>
                    <div className='flex flex-col'>
                      <h5 className='text-primary-main font-bold'>
                        {reply?.commenter || 'Anonim'}
                      </h5>
                      <p className='text-sm text-neutral-600'>
                        {getTimeDifference(reply?.updated_at)}
                      </p>
                    </div>
                    <p>{reply?.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </Fragment>
        ))}
        <div></div>
      </div>
    </div>
  );
};

export default CommentsSection;
