import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { getManagementRequest } from '@/hooks/managements/request';

import { TMetaErrorResponse } from '@/types';
import { TDataManagementResponse } from '@/types/managements';

export const useGetManagement = (
  year: string
): UseQueryResult<TDataManagementResponse, TMetaErrorResponse> =>
  useQuery({
    queryKey: ['management', year],
    queryFn: async () => await getManagementRequest(year),
  });
