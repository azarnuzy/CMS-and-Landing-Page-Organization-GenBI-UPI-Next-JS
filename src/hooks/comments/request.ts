import { api } from '@/lib/api';

import {
  TCreateCommentPayload,
  TCreateReplyPayload,
  TDataCreateCommentResponse,
  TDataCreateReplyResponse,
  TDataDeleteCommentResposne,
  TDataPutCommentResposne,
  TPutCommentPayload,
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

export const putCommentRequest = async ({
  payload,
  id,
}: {
  payload: TPutCommentPayload;
  id: number;
}): Promise<TDataPutCommentResposne | undefined> => {
  const { data } = await api.put(`v1/comments/${id}`, payload);

  return data;
};

export const deleteCommentRequest = async (
  id: number
): Promise<TDataDeleteCommentResposne> => {
  const { data } = await api.delete(`v1/comments/${id}`);
  return data;
};
