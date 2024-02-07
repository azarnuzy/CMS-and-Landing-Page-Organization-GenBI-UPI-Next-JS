import { api } from '@/lib/api';

import { TDataManagementResponse } from '@/types/managements';

export const getManagementRequest = async (
  year: string
): Promise<TDataManagementResponse> => {
  const { data } = await api.get(`/v1/managements/active?year=${year}`);

  return data;
};
