import { useQuery, UseQueryResult } from '@tanstack/react-query';

import {
  getAllPost,
  getComments,
  getDetailPost,
  getSearchPost,
  updateVisitorPost,
} from '@/hooks/posts/request';

import { TMetaErrorResponse } from '@/types';
import {
  TDataCommentPostResponse,
  TDataGetAllPostResponse,
  TDataGetDetailPostResponse,
  TDataVisitorPostResponse,
} from '@/types/posts';

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
