import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';

import {
  addManagementRequest,
  deleteManagementRequest,
  getActiveManagementsRequest,
  getAllManagementsRequest,
  getManagementByIdRequest,
  getOptionManagementsRequest,
  updateManagementRequest,
} from '@/hooks/managements/request';

import { TMetaErrorResponse } from '@/types';
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

export const useGetActiveManagements = (): UseQueryResult<
  TDataGetActiveManagementsResponse,
  TMetaErrorResponse
> =>
  useQuery({
    queryKey: ['active-management'],
    queryFn: async () => await getActiveManagementsRequest(),
  });

export const useGetOptionManagements = (): UseQueryResult<
  TDataGetOptionManagementResponse,
  TMetaErrorResponse
> =>
  useQuery({
    queryKey: ['get-option-managements'],
    queryFn: async () => await getOptionManagementsRequest(),
  });

export const useGetManagementsById = ({
  id,
}: {
  id: number;
}): UseQueryResult<TDataGetActiveManagementsResponse, TMetaErrorResponse> =>
  useQuery({
    queryKey: ['get-management-by-id', id],
    queryFn: async () => await getManagementByIdRequest(id),
  });

export const useGetAllManagements = ({
  params,
}: {
  params: TGetAllManagementParams;
}): UseQueryResult<TDataGetAllManagementsResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ['get-all-managements', params],
    queryFn: async () => await getAllManagementsRequest({ params }),
  });
};

export const useAddManagement = (): UseMutationResult<
  TDataPostManagementResponse,
  TMetaErrorResponse,
  TPostManagamentPayload
> => {
  return useMutation<
    TDataPostManagementResponse,
    TMetaErrorResponse,
    TPostManagamentPayload
  >({
    mutationKey: ['add-management'],
    mutationFn: async (payload: TPostManagamentPayload) =>
      await addManagementRequest(payload),
  });
};

export const useUpdateManagement = (): UseMutationResult<
  TDataPutManagementResponse,
  TMetaErrorResponse,
  { payload: TPutManagamentPayload; id: number }
> => {
  return useMutation<
    TDataPutManagementResponse,
    TMetaErrorResponse,
    { payload: TPutManagamentPayload; id: number }
  >({
    mutationKey: ['update-management'],
    mutationFn: async ({
      payload,
      id,
    }: {
      payload: TPutManagamentPayload;
      id: number;
    }) => {
      const response = await updateManagementRequest({ id, payload });
      if (!response) {
        throw new Error('Invalid response');
      }
      return response;
    },
  });
};

export const useDeleteManagement = (): UseMutationResult<
  TDataDeleteManagementResponse,
  TMetaErrorResponse,
  number
> => {
  return useMutation<TDataDeleteManagementResponse, TMetaErrorResponse, number>(
    {
      mutationKey: ['delete-management'],
      mutationFn: async (id: number) => {
        const response = await deleteManagementRequest(id);
        if (!response) {
          throw new Error('Invalid response');
        }
        return response;
      },
    }
  );
};
