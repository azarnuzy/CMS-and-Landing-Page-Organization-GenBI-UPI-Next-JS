import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';

import {
  addProgramRequest,
  deleteProgramRequest,
  getProgramTypesRequest,
  updateProgramRequest,
} from '@/hooks/program/request';

import { TMetaErrorResponse } from '@/types';
import {
  TAddProgramPayload,
  TDataAddProgramResponse,
  TDataDeleteProgramResponse,
  TDataGetProgramTypeResponse,
  TDataUpdateProgramResponse,
} from '@/types/program';

export const useAddProgram = (): UseMutationResult<
  TDataAddProgramResponse,
  TMetaErrorResponse,
  TAddProgramPayload
> => {
  return useMutation<
    TDataAddProgramResponse,
    TMetaErrorResponse,
    TAddProgramPayload
  >({
    mutationKey: ['add-Program'],
    mutationFn: async (payload: TAddProgramPayload) => {
      const response = await addProgramRequest(payload);
      if (!response) {
        throw new Error('Invalid response');
      }
      return response;
    },
  });
};

export const useUpdateProgram = (): UseMutationResult<
  TDataUpdateProgramResponse,
  TMetaErrorResponse,
  { payload: TAddProgramPayload; id: number }
> => {
  return useMutation<
    TDataUpdateProgramResponse,
    TMetaErrorResponse,
    { payload: TAddProgramPayload; id: number }
  >({
    mutationKey: ['put-Program'],
    mutationFn: async ({
      payload,
      id,
    }: {
      payload: TAddProgramPayload;
      id: number;
    }) => {
      const response = await updateProgramRequest({ payload, id });
      if (!response) {
        throw new Error('Invalid response');
      }
      return response;
    },
  });
};

export const useDeleteProgram = (): UseMutationResult<
  TDataDeleteProgramResponse,
  TMetaErrorResponse,
  number
> => {
  return useMutation<TDataDeleteProgramResponse, TMetaErrorResponse, number>({
    mutationKey: ['delete-Program'],
    mutationFn: async (id) => {
      const response = await deleteProgramRequest(id);
      if (!response) {
        throw new Error('Invalid response');
      }
      return response;
    },
  });
};

export const useGetProgramType = (): UseQueryResult<
  TDataGetProgramTypeResponse,
  TMetaErrorResponse
> =>
  useQuery({
    queryKey: ['get-program-type'],
    queryFn: async () => await getProgramTypesRequest(),
  });
