import { api } from '@/lib/api';

import {
  TAllPostData,
  TCommentDataResponse,
  TPostDetailDataResponse,
  TPostVisitorDataResponse,
  TPostVisitorPayload,
} from '@/types/posts';

export const getAllPost = async (
  sort: string,
  type: string,
  limit: number,
  page: number,
  filter?: string
): Promise<TAllPostData> => {
  const { data } = await api.get(`v1/posts`, {
    params: {
      sort,
      type,
      limit,
      page,
      filter,
    },
  });

  return data;
};

export const getDetailPost = async (
  id: number
): Promise<TPostDetailDataResponse> => {
  const { data } = await api.get(`v1/posts/${id}`);

  return data;
};

export const updateVisitorPost = async (
  payload: TPostVisitorPayload
): Promise<TPostVisitorDataResponse> => {
  const { data } = await api.post<TPostVisitorDataResponse>(
    `v1/posts/visitors/add`,
    payload
  );

  return data;
};

export const getComments = async (
  id: number
): Promise<TCommentDataResponse> => {
  const { data } = await api.get(`v1/${id}/comments`);

  return data;
};