import { api } from '@/lib/api';

import {
  TDataCommentPostResponse,
  TDataGetAllPostResponse,
  TDataGetDetailPostResponse,
  TDataVisitorPostResponse,
  TGetAllPostParams,
  TGetSearchPostParams,
} from '@/types/posts';

export const getAllPost = async (
  params: TGetAllPostParams
): Promise<TDataGetAllPostResponse> => {
  const { sort, type, limit, page, filter } = params;

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
): Promise<TDataGetDetailPostResponse | undefined> => {
  try {
    const { data } = await api.get(`v1/posts/${id}`);

    return data;
  } catch (error) {
    return undefined;
  }
};

export const updateVisitorPost = async (
  id: number
): Promise<TDataVisitorPostResponse> => {
  const { data } = await api.get<TDataVisitorPostResponse>(
    `v1/posts/${id}/visitors/add`
  );

  return data;
};

export const getComments = async (
  id: number
): Promise<TDataCommentPostResponse> => {
  const { data } = await api.get(`v1/posts/${id}/comments`);

  return data;
};

export const getSearchPost = async (
  params: TGetSearchPostParams
): Promise<TDataGetAllPostResponse> => {
  const { sort, type, limit, page, keyword } = params;
  const { data } = await api.get(`v1/posts/search`, {
    params: {
      sort,
      type,
      limit,
      page,
      keyword,
    },
  });

  return data;
};
