import { serialize } from 'object-to-formdata';

import { api } from '@/lib/api';

import {
  TDataCommentPostResponse,
  TDataGetAllPostResponse,
  TDataGetDetailPostResponse,
  TDataVisitorPostResponse,
  TGetAllPostParams,
  TGetSearchPostParams,
} from '@/types/posts';
import {
  TAddPostPayload,
  TDataAddPostResponse,
  TDataPutPostPhotoResponse,
  TDataPutPostResponse,
  TPutPostPayload,
  TPutPostPhotoPayload,
} from '@/types/posts/crud';

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

export const getPostTypes = async (): Promise<string[]> => {
  const { data } = await api.get(`v1/posts/types`);

  return data;
};

export const addPostRequest = async (
  payload: TAddPostPayload
): Promise<TDataAddPostResponse> => {
  const { data } = await api({
    method: 'post',
    url: 'v1/posts',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: serialize(payload),
  });
  return data;
};

export const putPostRequest = async ({
  payload,
  id,
}: {
  payload: TPutPostPayload;
  id: number;
}): Promise<TDataPutPostResponse> => {
  const { data } = await api.put(`v1/posts/${id}`, payload);

  return data;
};

export const putPostPhotoRequest = async ({
  payload,
  id,
}: {
  payload: TPutPostPhotoPayload;
  id: number;
}): Promise<TDataPutPostPhotoResponse | undefined> => {
  const { data } = await api({
    method: 'put',
    url: `v1/photos/${id}`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: serialize(payload),
  });

  return data;
};
