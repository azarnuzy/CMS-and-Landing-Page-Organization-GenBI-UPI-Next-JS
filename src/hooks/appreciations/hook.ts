import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';

import {
  deleteAppreciations,
  getAppreciations,
  postAppreciations,
  putAppreciations,
} from '@/hooks/appreciations/request';

import { TMetaErrorResponse } from '@/types';
import {
  TDataAppreciationsResponse,
  TDataPostAppreciationResponse,
  TDataPutAppreciationResponse,
  TPostAppreciationPayload,
} from '@/types/appreciations';

export const useGetAppreciations = ({
  sort,
  type,
  limit,
  page,
}: {
  sort: string;
  type: string;
  limit: number;
  page: number;
}): UseQueryResult<TDataAppreciationsResponse, TMetaErrorResponse> =>
  useQuery({
    queryKey: ['all-event', sort, type, limit, page],
    queryFn: async () => await getAppreciations({ sort, type, limit, page }),
  });

export const useAddAppreciations = (): UseMutationResult<
  TDataPostAppreciationResponse,
  TMetaErrorResponse,
  TPostAppreciationPayload
> => {
  return useMutation<
    TDataPostAppreciationResponse,
    TMetaErrorResponse,
    TPostAppreciationPayload
  >({
    mutationKey: ['add-appreciations'],
    mutationFn: async (payload: TPostAppreciationPayload) => {
      const response = await postAppreciations(payload);
      if (!response) {
        throw new Error('Invalid response');
      }
      return response;
    },
  });
};

export const usePutAppreciations = (): UseMutationResult<
  TDataPutAppreciationResponse,
  TMetaErrorResponse,
  { payload: TPostAppreciationPayload; id: number }
> => {
  return useMutation<
    TDataPutAppreciationResponse,
    TMetaErrorResponse,
    { payload: TPostAppreciationPayload; id: number }
  >({
    mutationKey: ['put-appreciations'],
    mutationFn: async ({
      payload,
      id,
    }: {
      payload: TPostAppreciationPayload;
      id: number;
    }) => {
      const response = await putAppreciations({ payload, id });
      if (!response) {
        throw new Error('Invalid response');
      }
      return response;
    },
  });
};

export const useDeleteAppreciations = (): UseMutationResult<
  TDataPutAppreciationResponse,
  TMetaErrorResponse,
  number
> => {
  return useMutation<TDataPutAppreciationResponse, TMetaErrorResponse, number>({
    mutationKey: ['delete-appreciations'],
    mutationFn: async (id) => {
      const response = await deleteAppreciations(id);
      if (!response) {
        throw new Error('Invalid response');
      }
      return response;
    },
  });
};
