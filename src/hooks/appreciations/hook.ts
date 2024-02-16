import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { getAppreciations } from '@/hooks/appreciations/request';

import { TMetaErrorResponse } from '@/types';
import { TDataAppreciationsResponse } from '@/types/appreciations';

export const useGetAppreciations = ({
  sort,
  type,
  limit,
  page,
}: {
  sort: string;
  type: string;
  limit: number;
  page: number;
}): UseQueryResult<TDataAppreciationsResponse, TMetaErrorResponse> =>
  useQuery({
    queryKey: ['all-event', sort, type, limit, page],
    queryFn: async () => await getAppreciations({ sort, type, limit, page }),
  });
