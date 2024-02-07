import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';

import { getManagementRequest } from '@/hooks/managements/request';

import { activeManagementState } from '@/recoils/about-genbi/atom';

import { TMetaErrorResponse } from '@/types';
import {
  TDataManagementResponse,
  TuseManagementDataState,
} from '@/types/managements';

export const useGetManagement = (
  year: string
): UseQueryResult<TDataManagementResponse, TMetaErrorResponse> =>
  useQuery({
    queryKey: ['management', year],
    queryFn: async () => await getManagementRequest(year),
  });

export const useManagementDataState = (): TuseManagementDataState => {
  const [get, set] = useRecoilState(activeManagementState);

  return {
    getDataManagement: get,
    setDataManagement: (val) => set(val),
  };
};
