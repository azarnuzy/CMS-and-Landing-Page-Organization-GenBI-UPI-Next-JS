import { useMutation, UseMutationResult } from '@tanstack/react-query';

import {
  createCommentRequest,
  createReplyRequest,
  deleteCommentRequest,
  putCommentRequest,
} from '@/hooks/comments/request';

import { TMetaErrorResponse } from '@/types';
import {
  TCreateCommentPayload,
  TCreateReplyPayload,
  TDataCreateCommentResponse,
  TDataCreateReplyResponse,
  TDataDeleteCommentResposne,
  TDataPutCommentResposne,
  TPutCommentPayload,
} from '@/types/comments';

export const useCreateComment = (): UseMutationResult<
  TDataCreateCommentResponse,
  TMetaErrorResponse,
  TCreateCommentPayload
> => {
  return useMutation({
    mutationKey: ['create-comment'],
    mutationFn: async (payload: TCreateCommentPayload) =>
      await createCommentRequest(payload),
  });
};

export const useCreateReply = (): UseMutationResult<
  TDataCreateReplyResponse,
  TMetaErrorResponse,
  TCreateReplyPayload
> => {
  return useMutation({
    mutationKey: ['create-reply'],
    mutationFn: async (payload: TCreateReplyPayload) =>
      await createReplyRequest(payload),
  });
};

export const usePutComment = (): UseMutationResult<
  TDataPutCommentResposne,
  TMetaErrorResponse,
  { payload: TPutCommentPayload; id: number }
> => {
  return useMutation<
    TDataPutCommentResposne,
    TMetaErrorResponse,
    { payload: TPutCommentPayload; id: number }
  >({
    mutationKey: ['put-comment-post'],
    mutationFn: async ({
      id,
      payload,
    }: {
      id: number;
      payload: TPutCommentPayload;
    }) => {
      const response = await putCommentRequest({ id, payload });
      if (!response) {
        throw new Error('Invalid response');
      }

      return response;
    },
  });
};

export const useDeleteComment = (): UseMutationResult<
  TDataDeleteCommentResposne,
  TMetaErrorResponse,
  number
> => {
  return useMutation<TDataDeleteCommentResposne, TMetaErrorResponse, number>({
    mutationKey: ['delete-comment-post'],
    mutationFn: async (id) => {
      const response = await deleteCommentRequest(id);
      if (!response) {
        throw new Error('Invalid response');
      }
      return response;
    },
  });
};
