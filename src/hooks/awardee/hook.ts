import { useQuery, UseQueryResult } from '@tanstack/react-query';

import {
  getAwardeesRequest,
  getDetailAwardeeRequest,
} from '@/hooks/awardee/request';

import { TMetaErrorResponse } from '@/types';
import {
  TAwardeesParams,
  TDataDetailAwardeeResponse,
  TDataGetAllAwardeesResponse,
} from '@/types/awardees';

export const useGetAllAwardees = (
  params: TAwardeesParams
): UseQueryResult<TDataGetAllAwardeesResponse, TMetaErrorResponse> => {
  const { sort, type, limit, page } = params;
  return useQuery({
    queryKey: ['all-awardees', sort, type, limit, page],
    queryFn: async () => await getAwardeesRequest(params),
  });
};

export const useGetDetailAwardee = ({
  id,
}: {
  id: number;
}): UseQueryResult<TDataDetailAwardeeResponse, TMetaErrorResponse> =>
  useQuery({
    queryKey: ['get-detail-awardee', id],
    queryFn: async () => await getDetailAwardeeRequest(id),
  });
