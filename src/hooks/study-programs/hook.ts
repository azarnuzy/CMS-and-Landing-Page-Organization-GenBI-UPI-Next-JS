import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { getAllStudyPrograms } from '@/hooks/study-programs/request';

import { TMetaErrorResponse } from '@/types';
import { TDataGetAllStudyProgramResponse } from '@/types/study-programs';

export const useGetAllStudyPrograms = (): UseQueryResult<
  TDataGetAllStudyProgramResponse,
  TMetaErrorResponse
> =>
  useQuery({
    queryKey: ['get-all-study-programs'],
    queryFn: async () => await getAllStudyPrograms(),
  });
