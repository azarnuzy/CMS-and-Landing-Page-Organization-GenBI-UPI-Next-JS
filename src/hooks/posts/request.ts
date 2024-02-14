import { api } from '@/lib/api';

import {
  TDataGetAllPostResponse,
  TGetAllPostParams,
  TPostDetailData,
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

export const getDetailPost = async (id: number): Promise<TPostDetailData> => {
  const { data } = await api.get(`v1/posts/${id}`);

  return data;
};

// export const updateVisitorPost = async (
//   payload: TPostVisitorPayload
// ): Promise<TPostVisitorDataResponse> => {
//   const { data } = await api.post<TPostVisitorDataResponse>(
//     `v1/posts/visitors/add`,
//     payload
//   );

//   return data;
// };

// export const getComments = async (
//   id: number
// ): Promise<TCommentDataResponse> => {
//   const { data } = await api.get(`v1/${id}/comments`);

//   return data;
// };
