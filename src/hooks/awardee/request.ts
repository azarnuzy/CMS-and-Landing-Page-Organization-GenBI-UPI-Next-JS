import { serialize } from 'object-to-formdata';

import { api } from '@/lib/api';

import {
  TAwardeeAddPayload,
  TAwardeePutPayload,
  TAwardeesParams,
  TDataAddAwardeeResponse,
  TDataDetailAwardeeResponse,
  TDataGetAllAwardeesResponse,
  TDataPutAwardeeResponse,
} from '@/types/awardees';

export const getAwardeesRequest = async (
  params: TAwardeesParams
): Promise<TDataGetAllAwardeesResponse> => {
  const { data } = await api.get(`v1/awardees`, {
    params,
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

export const addAwardeeRequest = async (
  payload: TAwardeeAddPayload
): Promise<TDataAddAwardeeResponse | undefined> => {
  const { data } = await api({
    method: 'post',
    url: 'v1/awardees',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: serialize(payload),
  });
  return data;
};

export const putAwardeeRequest = async ({
  payload,
  id,
}: {
  payload: TAwardeePutPayload;
  id: number;
}): Promise<TDataPutAwardeeResponse | undefined> => {
  // const { data } = await api.put<TDataPutAwardeeResponse>(
  //   `v1/awardees/${id}`,
  //   payload
  // );

  const { data } = await api({
    method: 'put',
    url: `v1/awardees/${id}`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: serialize(payload),
  });

  return data;
};
export const deleteAwardeeRequest = async (
  id: number
): Promise<TDataPutAwardeeResponse | undefined> => {
  const { data } = await api.delete<TDataPutAwardeeResponse>(
    `v1/awardees/${id}`
  );

  return data;
};
