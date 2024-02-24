import { api } from '@/lib/api';

import {
  TAwardeesParams,
  TDataDetailAwardeeResponse,
  TDataGetAllAwardeesResponse,
} from '@/types/awardees';

export const getAwardeesRequest = async (
  params: TAwardeesParams
): Promise<TDataGetAllAwardeesResponse> => {
  const { sort, type, limit, page } = params;

  const { data } = await api.get(`v1/awardees`, {
    params: {
      sort,
      type,
      limit,
      page,
    },
  });

  return data;
};

export const getDetailAwardeeRequest = async (
  id: number
): Promise<TDataDetailAwardeeResponse | undefined> => {
  try {
    const { data } = await api.get(`v1/awardees/${id}`);

    return data;
  } catch (error) {
    return undefined;
  }
};
