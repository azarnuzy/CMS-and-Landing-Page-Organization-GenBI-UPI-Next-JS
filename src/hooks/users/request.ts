import { api } from '@/lib/api';

import { TDataGetUsersOptionResponse, TUserParams } from '@/types/users';

export const getUserOptionRequest = async (
  params: TUserParams
): Promise<TDataGetUsersOptionResponse> => {
  const { data } = await api.get('v1/users', {
    params,
  });

  return data;
};
