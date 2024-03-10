import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';

import {
  addPostRequest,
  getAllPost,
  getComments,
  getDetailPost,
  getPostTypes,
  getSearchPost,
  putPostRequest,
  updateVisitorPost,
} from '@/hooks/posts/request';

import { TMetaErrorResponse, TMetaResponse } from '@/types';
import {
  TDataCommentPostResponse,
  TDataGetAllPostResponse,
  TDataGetDetailPostResponse,
  TDataVisitorPostResponse,
} from '@/types/posts';
import {
  TAddPostPayload,
  TDataAddPostResponse,
  TDataPutPostResponse,
  TPutPostPayload,
} from '@/types/posts/crud';

export const useGetAllPost = ({
  sort,
  type,
  limit,
  page,
  filter,
}: {
  sort: string;
  type: string;
  limit: number;
  page: number;
  filter?: string;
}): UseQueryResult<TDataGetAllPostResponse, TMetaErrorResponse> =>
  useQuery({
    queryKey: ['all-post', sort, type, limit, page, filter],
    queryFn: async () => await getAllPost({ sort, type, limit, page, filter }),
  });

export const useAddVisitorPost = ({
  id,
}: {
  id: number;
}): UseQueryResult<TDataVisitorPostResponse, TMetaErrorResponse> =>
  useQuery({
    queryKey: ['add-visitor-post', id],
    queryFn: async () => await updateVisitorPost(id),
  });

export const useGetDetailPost = ({
  id,
}: {
  id: number;
}): UseQueryResult<TDataGetDetailPostResponse, TMetaErrorResponse> =>
  useQuery({
    queryKey: ['get-detail-post', id],
    queryFn: async () => await getDetailPost(id),
  });

export const useGetCommentPost = ({
  id,
}: {
  id: number;
}): UseQueryResult<TDataCommentPostResponse, TMetaErrorResponse> =>
  useQuery({
    queryKey: ['get-comment-post', id],
    queryFn: async () => await getComments(id),
  });

export const useGetSearchPost = ({
  sort,
  type,
  limit,
  page,
  keyword,
}: {
  sort: string;
  type: string;
  limit: number;
  page: number;
  keyword: string;
}): UseQueryResult<TDataGetAllPostResponse, TMetaErrorResponse> =>
  useQuery({
    queryKey: ['get-search-post', sort, type, limit, page, keyword],
    queryFn: async () =>
      await getSearchPost({ sort, type, limit, page, keyword }),
  });

export const useGetPostTypes = (): UseQueryResult<
  TMetaResponse<string>,
  TMetaErrorResponse
> =>
  useQuery({
    queryKey: ['get-post-types'],
    queryFn: async () => await getPostTypes(),
  });

export const useAddPost = (): UseMutationResult<
  TDataAddPostResponse,
  TMetaErrorResponse,
  TAddPostPayload
> => {
  return useMutation<TDataAddPostResponse, TMetaErrorResponse, TAddPostPayload>(
    {
      mutationKey: ['add-post'],
      mutationFn: async (payload: TAddPostPayload) => {
        const response = await addPostRequest(payload);
        if (!response) {
          throw new Error('Invalid response');
        }
        return response;
      },
    }
  );
};

export const usePutPost = (): UseMutationResult<
  TDataPutPostResponse,
  TMetaErrorResponse,
  { payload: TPutPostPayload; id: number }
> => {
  return useMutation<
    TDataPutPostResponse,
    TMetaErrorResponse,
    { payload: TPutPostPayload; id: number }
  >({
    mutationKey: ['put-post'],
    mutationFn: async ({
      payload,
      id,
    }: {
      payload: TPutPostPayload;
      id: number;
    }) => {
      const response = await putPostRequest({ payload, id });
      if (!response) {
        throw new Error('Invalid response');
      }
      return response;
    },
  });
};
