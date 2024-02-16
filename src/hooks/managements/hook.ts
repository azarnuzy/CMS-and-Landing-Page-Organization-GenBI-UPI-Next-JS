import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { getManagementRequest } from '@/hooks/managements/request';

import { TMetaErrorResponse } from '@/types';
import { TManagementDataResponse } from '@/types/managements';

export const useGetManagement = (
  year: string
): UseQueryResult<TManagementDataResponse, TMetaErrorResponse> =>
  useQuery({
    queryKey: ['management', year],
    queryFn: async () => await getManagementRequest(year),
  });

// export const useManagementDataState = (): TuseManagementDataState => {
//   const [get, set] = useRecoilState(activeManagementState);

//   return {
//     getDataManagement: get,
//     setDataManagement: (val) => set(val),
//   };
// };
