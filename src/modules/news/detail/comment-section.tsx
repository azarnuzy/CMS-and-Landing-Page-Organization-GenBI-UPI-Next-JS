'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { toast } from 'sonner';
import { z } from 'zod';

import { getTimeDifference } from '@/lib/utils/general-function';
import { ValidationSchemaAddCommentForm } from '@/lib/validations/comment';
import {
  useCreateComment,
  useCreateReply,
  useDeleteComment,
  usePutComment,
} from '@/hooks/comments/hook';
import { useGetCommentPost } from '@/hooks/posts/hook';

import MiniSpinner from '@/components/spinner';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import { TextField } from '@/components/ui/text-field';
import { Textarea } from '@/components/ui/textarea';

import { TDataCommentPostResponse } from '@/types/posts';

const CommentsSection = ({ data }: { data: TDataCommentPostResponse }) => {
  const params = useParams();
  const { id } = params;

  const session = useSession();

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

  const formEditComment = useForm<
    z.infer<typeof ValidationSchemaAddCommentForm>
  >({
    resolver: zodResolver(ValidationSchemaAddCommentForm),
    defaultValues: {
      name: '',
      content: '',
    },
  });

  const { data: dataComment, refetch } = useGetCommentPost({ id: Number(id) });

  const { mutate, status } = useCreateComment();
  const { mutate: mutateReply, status: statusMutateReply } = useCreateReply();
  const { mutate: mutateEditComment, status: statusEditComment } =
    usePutComment();
  const { mutate: mutateDeleteComment } = useDeleteComment();

  const [getComments, setComments] = useState(data.data);
  const [formReplyOpen, setFormReplyOpen] = useState<number | null>(null);
  const [formEditCommentOpen, setFormEditCommentOpen] = useState<number | null>(
    null
  );

  const commentsData = getComments;
  let totalComments = commentsData.length;

  // Iterate over comments and add the number of replies for each comment
  commentsData.forEach((comment) => {
    totalComments += comment.replies.length;
  });

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
          toast.error(
            error?.response?.data?.message || 'Gagal menambahkan komentar'
          );
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
          toast.error(
            error?.response?.data?.message || 'Gagal menambahkan balasan'
          );
        },
      }
    );
  };

  const onSubmitEditComment = (
    data: z.infer<typeof ValidationSchemaAddCommentForm>
  ) => {
    mutateEditComment(
      {
        id: formEditCommentOpen as number,
        payload: data,
      },
      {
        onSuccess: () => {
          refetch();
          formEditComment.reset();
          setFormEditCommentOpen(null);
          formEditComment.setValue('name', '');
          formEditComment.setValue('content', '');
          toast.success('Komentar berhasil diubah');
        },
        onError: (error) => {
          toast.error(
            error?.response?.data?.message || 'Gagal mengubah komentar'
          );
        },
      }
    );
  };

  const handleDeleteComment = (id: number) => {
    mutateDeleteComment(id, {
      onSuccess: () => {
        refetch();
        toast.success('Berhasil menghapus komentar');
      },
      onError: (error) => {
        toast.error(
          error?.response?.data?.message || 'Gagal menghapus komentar'
        );
      },
    });
  };

  useEffect(() => {
    if (dataComment) {
      setComments(dataComment.data);
    }
  }, [dataComment]);

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
              {status === 'pending' ? (
                <div className='flex gap-2 items-center'>
                  <MiniSpinner /> Loading...
                </div>
              ) : (
                `Send`
              )}
            </Button>
          </div>
        </form>
      </Form>
      <div className='flex flex-col gap-4'>
        {getComments.map((comment, i) => (
          <Fragment key={i}>
            <Separator />
            <div key={i} className='flex flex-col gap-3'>
              <div className='flex flex-col gap-3'>
                <div className='flex w-full justify-between items-center'>
                  <div className='flex flex-col'>
                    <h5 className='text-primary-main font-bold'>
                      {comment?.commenter || 'Anonim'}
                    </h5>
                    <p className='text-sm text-neutral-600'>
                      {getTimeDifference(comment?.updated_at)}
                    </p>
                  </div>
                  {session?.data && (
                    <div className='flex items-center h-full '>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <BsThreeDotsVertical className='text-neutral-800' />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onClick={() => {
                              setFormEditCommentOpen(comment.id);
                              formEditComment.setValue(
                                'name',
                                comment.commenter
                              );
                              formEditComment.setValue(
                                'content',
                                comment.content
                              );
                            }}
                            className='flex gap-2 cursor-pointer'
                          >
                            <FaRegEdit /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              handleDeleteComment(comment.id);
                            }}
                            className='flex gap-2 cursor-pointer'
                          >
                            <FaRegTrashAlt /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  )}
                </div>
                <p>{comment.content}</p>
              </div>
              {formEditCommentOpen === comment.id && (
                <Form {...formEditComment}>
                  <form
                    onSubmit={formEditComment.handleSubmit(onSubmitEditComment)}
                    className='w-full flex flex-col gap-2'
                  >
                    <FormField
                      control={formEditComment.control}
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
                    <TextField
                      labelClassName='!text-sm text-left !font-normal'
                      type='text'
                      variant='md'
                      control={formEditComment.control}
                      name='content'
                      placeholder='Edit Balasan...'
                      className='h-[80px] text-sm  py-2'
                      isTextArea={true}
                      status={
                        formEditComment.formState?.errors?.content
                          ? 'error'
                          : undefined
                      }
                      message={
                        formEditComment.formState?.errors?.content?.message
                      }
                    />
                    <div className='w-full flex justify-end'>
                      <div className='flex gap-4 items-center'>
                        <Button
                          type='button'
                          className='bg-neutral-100 text-primary-main border-primary-main rounded-full border hover:bg-primary-main hover:text-neutral-100'
                          onClick={() => setFormEditCommentOpen(null)}
                        >
                          Cancel
                        </Button>
                        <Button
                          type='submit'
                          className='bg-primary-main border-primary-main text-neutral-100 rounded-full'
                        >
                          {statusEditComment === 'pending' ? (
                            <div className='flex gap-2 items-center'>
                              <MiniSpinner /> Loading...
                            </div>
                          ) : (
                            `Edit`
                          )}
                        </Button>
                      </div>
                    </div>
                  </form>
                </Form>
              )}
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
                          {statusMutateReply === 'pending' ? (
                            <div className='flex gap-2 items-center'>
                              <MiniSpinner /> Loading...
                            </div>
                          ) : (
                            `Send`
                          )}
                        </Button>
                      </div>
                    </div>
                  </form>
                </Form>
              )}
              <div className='pl-6 border-l border-neutral-300 flex flex-col gap-4'>
                {comment?.replies?.map((reply, i) => (
                  <div key={i} className='flex flex-col gap-3'>
                    <div className='flex flex-col gap-3'>
                      <div className='w-full flex justify-between items-center'>
                        <div className='flex flex-col'>
                          <h5 className='text-primary-main font-bold'>
                            {reply?.commenter || 'Anonim'}
                          </h5>

                          <p className='text-sm text-neutral-600'>
                            {getTimeDifference(reply?.updated_at)}
                          </p>
                        </div>
                        {session?.data && (
                          <div className='flex items-center h-full '>
                            <DropdownMenu>
                              <DropdownMenuTrigger>
                                <BsThreeDotsVertical className='text-neutral-800' />
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem
                                  onClick={() => {
                                    setFormEditCommentOpen(reply.id);
                                    formEditComment.setValue(
                                      'name',
                                      reply.commenter
                                    );
                                    formEditComment.setValue(
                                      'content',
                                      reply.content
                                    );
                                  }}
                                  className='flex gap-2 cursor-pointer'
                                >
                                  <FaRegEdit /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => {
                                    handleDeleteComment(reply.id);
                                  }}
                                  className='flex gap-2 cursor-pointer'
                                >
                                  <FaRegTrashAlt /> Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        )}
                      </div>
                      <p>{reply?.content}</p>
                    </div>
                    {formEditCommentOpen === reply.id && (
                      <Form {...formEditComment}>
                        <form
                          onSubmit={formEditComment.handleSubmit(
                            onSubmitEditComment
                          )}
                          className='w-full flex flex-col gap-2'
                        >
                          <FormField
                            control={formEditComment.control}
                            name='name'
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nama</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder='Masukkan Nama...'
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <TextField
                            labelClassName='!text-sm text-left !font-normal'
                            type='text'
                            variant='md'
                            control={formEditComment.control}
                            name='content'
                            placeholder='Berikan Balasan...'
                            className='h-[80px] text-sm  py-2'
                            isTextArea={true}
                            status={
                              formEditComment.formState?.errors?.content
                                ? 'error'
                                : undefined
                            }
                            message={
                              formEditComment.formState?.errors?.content
                                ?.message
                            }
                          />
                          <div className='w-full flex justify-end'>
                            <div className='flex gap-4 items-center'>
                              <Button
                                type='button'
                                className='bg-neutral-100 text-primary-main border-primary-main rounded-full border hover:bg-primary-main hover:text-neutral-100'
                                onClick={() => setFormEditCommentOpen(null)}
                              >
                                Cancel
                              </Button>
                              <Button
                                type='submit'
                                className='bg-primary-main border-primary-main text-neutral-100 rounded-full'
                              >
                                {statusEditComment === 'pending' ? (
                                  <div className='flex gap-2 items-center'>
                                    <MiniSpinner /> Loading...
                                  </div>
                                ) : (
                                  `Edit`
                                )}
                              </Button>
                            </div>
                          </div>
                        </form>
                      </Form>
                    )}
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
