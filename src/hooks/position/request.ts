import { api } from '@/lib/api';

import {
  TAddPositionPayload,
  TDataAddPositionResponse,
  TDataGetAllPositionResponse,
  TGetAllPositionParams,
} from '@/types/position';

export const getAllOptionsPositionRequest =
  async (): Promise<TDataGetAllPositionResponse> => {
    const { data } = await api.get('v1/positions?options=true');

    return data;
  };

export const getAllPositionRequest = async (
  params: TGetAllPositionParams
): Promise<TDataGetAllPositionResponse> => {
  const { data } = await api.get('v1/', {
    params,
  });

  return data;
};

export const addPositionRequest = async (
  payload: TAddPositionPayload
): Promise<TDataAddPositionResponse> => {
  const { data } = await api.post('v1/positions', payload);

  return data;
};

export const updatePositionRequest = async ({
  payload,
  id,
}: {
  payload: TAddPositionPayload;
  id: number;
}): Promise<TDataAddPositionResponse> => {
  const { data } = await api.put(`v1/positions/${id}`, payload);

  return data;
};

export const deletePositionRequest = async (
  id: number
): Promise<TDataAddPositionResponse> => {
  const { data } = await api.delete(`v1/positions/${id}`);

  return data;
};
