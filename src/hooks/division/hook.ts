import { useMutation, UseMutationResult } from '@tanstack/react-query';

import {
  addDivisionRequest,
  deleteDivisionRequest,
  updateDivisionRequest,
} from '@/hooks/division/request';

import { TMetaErrorResponse } from '@/types';
import {
  TAddDivisionPayload,
  TDataAddDivisionResponse,
  TDataDeleteDivisionResponse,
  TDataUpdateDivisionResponse,
} from '@/types/division';

export const useAddDivision = (): UseMutationResult<
  TDataAddDivisionResponse,
  TMetaErrorResponse,
  TAddDivisionPayload
> => {
  return useMutation<
    TDataAddDivisionResponse,
    TMetaErrorResponse,
    TAddDivisionPayload
  >({
    mutationKey: ['add-division'],
    mutationFn: async (payload: TAddDivisionPayload) => {
      const response = await addDivisionRequest(payload);
      if (!response) {
        throw new Error('Invalid response');
      }
      return response;
    },
  });
};

export const useUpdateDivision = (): UseMutationResult<
  TDataUpdateDivisionResponse,
  TMetaErrorResponse,
  { payload: TAddDivisionPayload; id: number }
> => {
  return useMutation<
    TDataUpdateDivisionResponse,
    TMetaErrorResponse,
    { payload: TAddDivisionPayload; id: number }
  >({
    mutationKey: ['put-division'],
    mutationFn: async ({
      payload,
      id,
    }: {
      payload: TAddDivisionPayload;
      id: number;
    }) => {
      const response = await updateDivisionRequest({ payload, id });
      if (!response) {
        throw new Error('Invalid response');
      }
      return response;
    },
  });
};

export const useDeleteDivision = (): UseMutationResult<
  TDataDeleteDivisionResponse,
  TMetaErrorResponse,
  number
> => {
  return useMutation<TDataDeleteDivisionResponse, TMetaErrorResponse, number>({
    mutationKey: ['delete-division'],
    mutationFn: async (id) => {
      const response = await deleteDivisionRequest(id);
      if (!response) {
        throw new Error('Invalid response');
      }
      return response;
    },
  });
};
