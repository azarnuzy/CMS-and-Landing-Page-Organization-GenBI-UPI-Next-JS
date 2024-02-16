import { api } from '@/lib/api';

import { TManagementDataResponse } from '@/types/managements';

export const getManagementRequest = async (
  year: string
): Promise<TManagementDataResponse> => {
  const { data } = await api.get(`/v1/managements/active?year=${year}`);

  return data;
};
