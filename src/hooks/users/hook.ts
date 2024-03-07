import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { getUserOptionRequest } from '@/hooks/users/request';

import { TMetaErrorResponse } from '@/types';
import { TDataGetUsersOptionResponse, TUserParams } from '@/types/users';

export const useGetUserOptions = (
  params: TUserParams
): UseQueryResult<TDataGetUsersOptionResponse, TMetaErrorResponse> => {
  const { sort, type, limit, page, options } = params;
  return useQuery({
    queryKey: ['all-users-options', sort, type, limit, page, options],
    queryFn: async () => await getUserOptionRequest(params),
  });
};
