import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { loginRequest } from '@/hooks/auth/request';

import { TMetaErrorResponse } from '@/types';
import { TDataLoginResponse, TLoginPayload } from '@/types/auth';

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
