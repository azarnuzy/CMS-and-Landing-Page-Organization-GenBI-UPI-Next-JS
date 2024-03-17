import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { getAllOptionsPositionRequest } from '@/hooks/position/request';

import { TMetaErrorResponse } from '@/types';
import { TDataGetAllPositionResponse } from '@/types/position';

export const useGetOptionsPosition = (): UseQueryResult<
  TDataGetAllPositionResponse,
  TMetaErrorResponse
> => {
  return useQuery({
    queryKey: ['all-positions-options'],
    queryFn: async () => await getAllOptionsPositionRequest(),
  });
};
