import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { getHomeSummaryRequest } from '@/hooks/landing-page/request';

import { TMetaErrorResponse } from '@/types';
import { THomeSummaryDataResponse } from '@/types/landing-page/index.';

export const useGetHomeSummary = (): UseQueryResult<
  THomeSummaryDataResponse,
  TMetaErrorResponse
> =>
  useQuery({
    queryKey: ['home-summary'],
    queryFn: async () => await getHomeSummaryRequest(),
  });
