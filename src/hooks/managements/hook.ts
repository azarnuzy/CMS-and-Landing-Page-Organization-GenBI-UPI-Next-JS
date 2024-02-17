import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { getOptionManagements } from '@/hooks/managements/request';

import { TMetaErrorResponse } from '@/types';
import { TDataGetOptionManagement } from '@/types/managements';

// import { getManagementRequest } from '@/hooks/managements/request';

// import { TMetaErrorResponse } from '@/types';
// import { TManagementDataResponse } from '@/types/managements';

// export const useGetManagement = (
//   year: string
// ): UseQueryResult<TManagementDataResponse, TMetaErrorResponse> =>
//   useQuery({
//     queryKey: ['management', year],
//     queryFn: async () => await getManagementRequest(year),
//   });

export const useGetOptionManagements = (): UseQueryResult<
  TDataGetOptionManagement,
  TMetaErrorResponse
> =>
  useQuery({
    queryKey: ['get-option-managements'],
    queryFn: async () => await getOptionManagements(),
  });
