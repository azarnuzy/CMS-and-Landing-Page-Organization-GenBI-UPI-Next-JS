import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';

import {
  addAwardeeRequest,
  deleteAwardeeRequest,
  getAwardeesRequest,
  getDetailAwardeeRequest,
  putAwardeeRequest,
} from '@/hooks/awardee/request';

import { TMetaErrorResponse } from '@/types';
import {
  TAwardeeAddPayload,
  TAwardeePutPayload,
  TAwardeesParams,
  TDataAddAwardeeResponse,
  TDataDetailAwardeeResponse,
  TDataGetAllAwardeesResponse,
  TDataPutAwardeeResponse,
} from '@/types/awardees';

export const useGetAllAwardees = (
  params: TAwardeesParams
): UseQueryResult<TDataGetAllAwardeesResponse, TMetaErrorResponse> => {
  const { sort, type, limit, page, search, management, department } = params;
  return useQuery({
    queryKey: [
      'all-awardees',
      sort,
      type,
      limit,
      page,
      search,
      management,
      department,
    ],
    queryFn: async () => await getAwardeesRequest(params),
  });
};

export const useGetDetailAwardee = ({
  id,
}: {
  id: number;
}): UseQueryResult<TDataDetailAwardeeResponse, TMetaErrorResponse> =>
  useQuery({
    queryKey: ['get-detail-awardee', id],
    queryFn: async () => await getDetailAwardeeRequest(id),
  });

export const useAddAwardee = (): UseMutationResult<
  TDataAddAwardeeResponse,
  TMetaErrorResponse,
  TAwardeeAddPayload
> => {
  return useMutation<
    TDataAddAwardeeResponse,
    TMetaErrorResponse,
    TAwardeeAddPayload
  >({
    mutationKey: ['add-awardee'],
    mutationFn: async (payload: TAwardeeAddPayload) => {
      const response = await addAwardeeRequest(payload);
      if (!response) {
        throw new Error('Invalid response');
      }
      return response;
    },
  });
};

export const usePutAwardee = (): UseMutationResult<
  TDataPutAwardeeResponse,
  TMetaErrorResponse,
  { payload: TAwardeePutPayload; id: number }
> => {
  return useMutation<
    TDataPutAwardeeResponse,
    TMetaErrorResponse,
    { payload: TAwardeePutPayload; id: number }
  >({
    mutationKey: ['put-awardee'],
    mutationFn: async ({
      payload,
      id,
    }: {
      payload: TAwardeePutPayload;
      id: number;
    }) => {
      const response = await putAwardeeRequest({ payload, id });
      if (!response) {
        throw new Error('Invalid response');
      }
      return response;
    },
  });
};
export const useDeleteAwardee = (): UseMutationResult<
  TDataPutAwardeeResponse,
  TMetaErrorResponse,
  number
> => {
  return useMutation<TDataPutAwardeeResponse, TMetaErrorResponse, number>({
    mutationKey: ['delete-awardee'],
    mutationFn: async (id) => {
      const response = await deleteAwardeeRequest(id);
      if (!response) {
        throw new Error('Invalid response');
      }
      return response;
    },
  });
};
