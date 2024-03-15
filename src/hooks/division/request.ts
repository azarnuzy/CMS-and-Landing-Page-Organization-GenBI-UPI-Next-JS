import { api } from '@/lib/api';

import {
  TAddDivisionPayload,
  TDataAddDivisionResponse,
  TDataDeleteDivisionResponse,
  TDataUpdateDivisionResponse,
} from '@/types/division';

export const addDivisionRequest = async (
  payload: TAddDivisionPayload
): Promise<TDataAddDivisionResponse> => {
  const { data } = await api.post(`v1/divisions`, payload);

  return data;
};

export const updateDivisionRequest = async ({
  payload,
  id,
}: {
  payload: TAddDivisionPayload;
  id: number;
}): Promise<TDataUpdateDivisionResponse> => {
  const { data } = await api.put(`v1/divisions/${id}`, payload);

  return data;
};

export const deleteDivisionRequest = async (
  id: number
): Promise<TDataDeleteDivisionResponse | undefined> => {
  const { data } = await api.delete<TDataDeleteDivisionResponse>(
    `v1/divisions/${id}`
  );

  return data;
};
