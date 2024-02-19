import { api } from '@/lib/api';

import {
  TCreateCommentPayload,
  TCreateReplyPayload,
  TDataCreateCommentResponse,
  TDataCreateReplyResponse,
} from '@/types/comments';

export const createCommentRequest = async (
  payload: TCreateCommentPayload
): Promise<TDataCreateCommentResponse> => {
  const { data } = await api.post<TDataCreateCommentResponse>(
    `v1/comments`,
    payload
  );

  return data;
};

export const createReplyRequest = async (
  payload: TCreateReplyPayload
): Promise<TDataCreateReplyResponse> => {
  const { data } = await api.post<TDataCreateReplyResponse>(
    `v1/comments/${payload.comment_id}/reply`,
    {
      name: payload.name,
      content: payload.content,
    }
  );

  return data;
};
