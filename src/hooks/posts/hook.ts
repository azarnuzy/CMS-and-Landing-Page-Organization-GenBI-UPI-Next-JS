import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { getAllPost } from '@/hooks/posts/request';

import { TMetaErrorResponse } from '@/types';
import { TPostsData } from '@/types/posts';

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
}): UseQueryResult<TPostsData, TMetaErrorResponse> =>
  useQuery({
    queryKey: ['all-post', sort, type, limit, page, filter],
    queryFn: async () => await getAllPost(sort, type, limit, page, filter),
  });
