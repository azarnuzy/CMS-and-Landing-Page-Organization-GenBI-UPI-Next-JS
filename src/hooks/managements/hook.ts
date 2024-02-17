import { useQuery, UseQueryResult } from '@tanstack/react-query';

import {
  getActiveManagementsRequest,
  getOptionManagementsRequest,
} from '@/hooks/managements/request';

import { TMetaErrorResponse } from '@/types';
import {
  TDataGetActiveManagementsResponse,
  TDataGetOptionManagementResponse,
} from '@/types/managements';

// import { getManagementRequest } from '@/hooks/managements/request';

// import { TMetaErrorResponse } from '@/types';
// import { TManagementDataResponse } from '@/types/managements';

export const useGetActiveManagements = (): UseQueryResult<
  TDataGetActiveManagementsResponse,
  TMetaErrorResponse
> =>
  useQuery({
    queryKey: ['active-management'],
    queryFn: async () => await getActiveManagementsRequest(),
  });

export const useGetOptionManagements = (): UseQueryResult<
  TDataGetOptionManagementResponse,
  TMetaErrorResponse
> =>
  useQuery({
    queryKey: ['get-option-managements'],
    queryFn: async () => await getOptionManagementsRequest(),
  });
