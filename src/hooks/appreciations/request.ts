import { serialize } from 'object-to-formdata';

import { api } from '@/lib/api';

import {
  TAppreciationsParams,
  TDataAppreciationsResponse,
  TDataDetailAppreciationResponse,
  TDataPostAppreciationResponse,
  TDataPutAppreciationResponse,
  TPostAppreciationPayload,
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

export const getAppreciationDetail = async (
  id: number
): Promise<TDataDetailAppreciationResponse> => {
  const { data } = await api.get(`v1/appreciations/${id}`);
  return data;
};

export const postAppreciations = async (
  payload: TPostAppreciationPayload
): Promise<TDataPostAppreciationResponse> => {
  const { data } = await api({
    method: 'post',
    url: 'v1/appreciations',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: serialize(payload),
  });
  return data;
};

export const putAppreciations = async ({
  id,
  payload,
}: {
  id: number;
  payload: TPostAppreciationPayload;
}): Promise<TDataPutAppreciationResponse> => {
  const { data } = await api({
    method: 'put',
    url: `v1/appreciations/${id}`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: serialize(payload),
  });
  return data;
};

export const deleteAppreciations = async (
  id: number
): Promise<TDataPutAppreciationResponse> => {
  const { data } = await api.delete(`v1/appreciations/${id}`);
  return data;
};
