import { useQuery, UseQueryResult } from '@tanstack/react-query';

import {
  getAllEvents,
  getDetailEvent,
  getSearchEvent,
} from '@/hooks/events/request';

import { TMetaErrorResponse } from '@/types';
import {
  TDataGetAllEventResponse,
  TDataGetDetailEventResponse,
} from '@/types/events';

export const useGetAllEvent = ({
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
}): UseQueryResult<TDataGetAllEventResponse, TMetaErrorResponse> =>
  useQuery({
    queryKey: ['all-event', sort, type, limit, page, filter],
    queryFn: async () =>
      await getAllEvents({ sort, type, limit, page, filter }),
  });

export const useGetSearchEvent = ({
  keyword,
}: {
  keyword: string;
}): UseQueryResult<TDataGetAllEventResponse, TMetaErrorResponse> =>
  useQuery({
    queryKey: ['search-event', keyword],
    queryFn: async () => await getSearchEvent(keyword),
  });

export const useGetDetailEvent = ({
  id,
}: {
  id: number;
}): UseQueryResult<TDataGetDetailEventResponse, TMetaErrorResponse> =>
  useQuery({
    queryKey: ['get-detail-post', id],
    queryFn: async () => await getDetailEvent(id),
  });
