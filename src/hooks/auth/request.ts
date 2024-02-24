import { api } from '@/lib/api';

import { TDataLoginResponse, TLoginPayload } from '@/types/auth';

export const loginRequest = async (
  payload: TLoginPayload
): Promise<TDataLoginResponse | undefined> => {
  const { data } = await api.post<TDataLoginResponse>('v1/auth/login', payload);

  return data;
};
