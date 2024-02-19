import { useMutation, UseMutationResult } from '@tanstack/react-query';

import {
  createCommentRequest,
  createReplyRequest,
} from '@/hooks/comments/request';

import { TMetaErrorResponse } from '@/types';
import {
  TCreateCommentPayload,
  TCreateReplyPayload,
  TDataCreateCommentResponse,
  TDataCreateReplyResponse,
} from '@/types/comments';

export const useCreateComment = (): UseMutationResult<
  TDataCreateCommentResponse,
  TMetaErrorResponse,
  TCreateCommentPayload
> => {
  return useMutation({
    mutationKey: ['contact-us'],
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
    mutationKey: ['contact-us'],
    mutationFn: async (payload: TCreateReplyPayload) =>
      await createReplyRequest(payload),
  });
};
