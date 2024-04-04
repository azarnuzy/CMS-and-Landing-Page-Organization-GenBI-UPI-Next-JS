import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { api } from '@/lib/api';

import { TMetaErrorResponse } from '@/types';
import {
  TAddProgramPayload,
  TDataAddProgramResponse,
  TDataDeleteProgramResponse,
  TDataGetProgramOptionsResponse,
  TDataGetProgramTypeResponse,
  TDataUpdateProgramResponse,
  TProgramDetailData,
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

export const getProgramDetailRequest = async (
  id: number
): Promise<TProgramDetailData> => {
  const { data } = await api.get(`v1/programs/${id}`);

  return data;
};

export const getProgramOptionsRequest =
  async (): Promise<TDataGetProgramOptionsResponse> => {
    const params = {
      params: {
        type: 'desc',

        options: true,
      },
    };

    const { data } = await api.get(`v1/programs`, params);

    return data;
  };

export const useGetOptionPrograms = (): UseQueryResult<
  TDataGetProgramOptionsResponse,
  TMetaErrorResponse
> =>
  useQuery({
    queryKey: ['get-option-programs'],
    queryFn: async () => await getProgramOptionsRequest(),
  });
