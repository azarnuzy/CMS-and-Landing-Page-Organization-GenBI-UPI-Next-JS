import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { getWhoAmI, loginRequest } from '@/hooks/auth/request';

import { TMetaErrorResponse } from '@/types';
import {
  TDataLoginResponse,
  TDataWhoAmIResponse,
  TLoginPayload,
} from '@/types/auth';

export const useLogin = (): UseMutationResult<
  TDataLoginResponse,
  TMetaErrorResponse,
  TLoginPayload
> => {
  return useMutation<TDataLoginResponse, TMetaErrorResponse, TLoginPayload>({
    mutationKey: ['login'],
    mutationFn: async (payload: TLoginPayload) => {
      const response = await loginRequest(payload);
      if (!response) {
        throw new Error('Invalid response');
      }
      return response;
    },
  });
};

export const useGetWhoAmI = (): UseQueryResult<
  TDataWhoAmIResponse | undefined,
  TMetaErrorResponse
> => {
  const { data: session } = useSession();
  return useQuery({
    enabled: !!session,
    queryKey: ['get-who-am-i'],
    queryFn: async () => await getWhoAmI(),
  });
};
