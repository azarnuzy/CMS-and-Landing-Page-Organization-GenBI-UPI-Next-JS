import { api } from '@/lib/api';

import {
  TAppreciationsParams,
  TDataAppreciationsResponse,
} from '@/types/appreciations';

export const getAppreciations = async (
  params: TAppreciationsParams
): Promise<TDataAppreciationsResponse> => {
  const { sort, type, limit, page } = params;

  const { data } = await api.get(`v1/appreciations`, {
    params: {
      sort,
      type,
      limit,
      page,
    },
  });

  return data;
};
