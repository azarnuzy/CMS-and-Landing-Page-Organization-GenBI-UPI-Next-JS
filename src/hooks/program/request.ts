import { api } from '@/lib/api';

import {
  TAddProgramPayload,
  TDataAddProgramResponse,
  TDataDeleteProgramResponse,
  TDataGetProgramTypeResponse,
  TDataUpdateProgramResponse,
} from '@/types/program';

export const addProgramRequest = async (
  payload: TAddProgramPayload
): Promise<TDataAddProgramResponse> => {
  const { data } = await api.post(`v1/programs`, payload);

  return data;
};

export const updateProgramRequest = async ({
  payload,
  id,
}: {
  payload: TAddProgramPayload;
  id: number;
}): Promise<TDataUpdateProgramResponse> => {
  const { data } = await api.put(`v1/programs/${id}`, payload);

  return data;
};

export const deleteProgramRequest = async (
  id: number
): Promise<TDataDeleteProgramResponse | undefined> => {
  const { data } = await api.delete<TDataDeleteProgramResponse>(
    `v1/programs/${id}`
  );

  return data;
};

export const getProgramTypesRequest =
  async (): Promise<TDataGetProgramTypeResponse> => {
    const { data } = await api.get(`v1/programs/types`);

    return data;
  };
