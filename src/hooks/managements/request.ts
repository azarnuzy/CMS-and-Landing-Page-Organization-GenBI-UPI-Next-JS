import { api } from '@/lib/api';

import {
  TDataGetActiveManagementsResponse,
  TDataGetOptionManagementResponse,
} from '@/types/managements';

export const getActiveManagementsRequest =
  async (): Promise<TDataGetActiveManagementsResponse> => {
    const { data } = await api.get(`/v1/managements/active`);

    return data;
  };

export const getOptionManagementsRequest =
  async (): Promise<TDataGetOptionManagementResponse> => {
    const { data } = await api.get(`/v1/managements?options=true`);

    return data;
  };
