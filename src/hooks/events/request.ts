import { api } from '@/lib/api';

import {
  TDataGetAllEventResponse,
  TDataGetDetailEventResponse,
  TGetAllEventParams,
} from '@/types/events';

export const getAllEvents = async (
  params: TGetAllEventParams
): Promise<TDataGetAllEventResponse> => {
  const { sort, type, limit, page, filter } = params;

  const { data } = await api.get(`v1/events`, {
    params: {
      sort,
      type,
      limit,
      page,
      filter,
    },
  });

  return data;
};

export const getSearchEvent = async (
  keyword: string
): Promise<TDataGetAllEventResponse> => {
  const { data } = await api.get(`v1/events/search?keyword=${keyword}`);

  return data;
};

export const getDetailEvent = async (
  id: number
): Promise<TDataGetDetailEventResponse> => {
  const { data } = await api.get(`v1/events/${id}`);

  return data;
};
