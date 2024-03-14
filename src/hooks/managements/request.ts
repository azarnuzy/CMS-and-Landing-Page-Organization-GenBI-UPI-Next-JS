import { serialize } from 'object-to-formdata';

import { api } from '@/lib/api';

import {
  TDataDeleteManagementResponse,
  TDataGetActiveManagementsResponse,
  TDataGetAllManagementsResponse,
  TDataGetOptionManagementResponse,
  TDataPostManagementResponse,
  TDataPutManagementResponse,
  TGetAllManagementParams,
  TPostManagamentPayload,
  TPutManagamentPayload,
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

export const getManagementByIdRequest = async (
  id: number
): Promise<TDataGetActiveManagementsResponse> => {
  const { data } = await api.get(`/v1/managements/${id}`);

  return data;
};

export const getAllManagementsRequest = async ({
  params,
}: {
  params: TGetAllManagementParams;
}): Promise<TDataGetAllManagementsResponse> => {
  const { data } = await api.get(`/v1/managements`, {
    params,
  });

  return data;
};

export const addManagementRequest = async (
  payload: TPostManagamentPayload
): Promise<TDataPostManagementResponse> => {
  const { data } = await api({
    method: 'post',
    url: '/v1/managements',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: serialize(payload),
  });

  return data;
};

export const updateManagementRequest = async ({
  id,
  payload,
}: {
  id: number;
  payload: TPutManagamentPayload;
}): Promise<TDataPutManagementResponse> => {
  const { data } = await api({
    method: 'put',
    url: `/v1/managements/${id}`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: serialize(payload),
  });

  return data;
};

export const deleteManagementRequest = async (
  id: number
): Promise<TDataDeleteManagementResponse> => {
  const { data } = await api.delete(`/v1/managements/${id}`);

  return data;
};
