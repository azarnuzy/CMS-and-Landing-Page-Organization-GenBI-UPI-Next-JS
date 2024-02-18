import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { getGalleriesRequest } from '@/hooks/galleries/request';

import { TMetaErrorResponse } from '@/types';
import { TDataGetGalleriesResponse } from '@/types/galleries';

export const useGetGalleries = ({
  sort,
  type,
  limit,
  page,
}: {
  sort: string;
  type: string;
  limit: number;
  page: number;
}): UseQueryResult<TDataGetGalleriesResponse, TMetaErrorResponse> =>
  useQuery({
    queryKey: ['all-event', sort, type, limit, page],
    queryFn: async () => await getGalleriesRequest({ sort, type, limit, page }),
  });
