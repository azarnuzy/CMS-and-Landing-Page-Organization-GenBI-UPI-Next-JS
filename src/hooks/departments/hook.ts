import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';

import {
  addAwardeeToManagementRequest,
  addDepartmentRequest,
  deleteAwardeeFromManagementRequest,
  deleteDepartmentRequest,
  getAllDepartmentRequest,
  getDepartmentByIdRequest,
  getDepartmentsTagsRequest,
  getDivisionsByDepartment,
  getOptionDepartmentsRequest,
  updateDepartmentRequest,
} from '@/hooks/departments/request';

import { TMetaErrorResponse } from '@/types';
import {
  TAddAwardeeToManagementPayload,
  TAddDepartmentPayload,
  TDataAddAwardeeToManagementResponse,
  TDataAddDepartmentResponse,
  TDataDeleteAwardeeToManagementResponse,
  TDataDeleteDepartmentResponse,
  TDataGetAllDepartmentResponse,
  TDataGetDepartmentByDivisionResponse,
  TDataGetDepartmentOptionResponse,
  TDataGetDepartmentsByIdResponse,
  TDataGetDepartmentsTagResponse,
  TDataUpdateDepartmentResponse,
  TDeleteAwardeeToManagementPayload,
  TDepartmentGetAllParams,
  TUpdateDepartmentPayload,
} from '@/types/departments';

export const useGetDepartmentById = ({
  id,
}: {
  id: number;
}): UseQueryResult<TDataGetDepartmentsByIdResponse, TMetaErrorResponse> =>
  useQuery({
    queryKey: ['get-department-by-id', id],
    queryFn: async () => await getDepartmentByIdRequest(id),
  });

export const useGetDepartmentsTags = (): UseQueryResult<
  TDataGetDepartmentsTagResponse,
  TMetaErrorResponse
> =>
  useQuery({
    queryKey: ['get-department-tags'],
    queryFn: async () => await getDepartmentsTagsRequest(),
  });

export const useGetOptionDepartments = (): UseQueryResult<
  TDataGetDepartmentOptionResponse,
  TMetaErrorResponse
> =>
  useQuery({
    queryKey: ['get-option-departments'],
    queryFn: async () => await getOptionDepartmentsRequest(),
  });

export const useGetAllDepartment = ({
  params,
}: {
  params: TDepartmentGetAllParams;
}): UseQueryResult<TDataGetAllDepartmentResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ['get-all-managements', params],
    queryFn: async () => await getAllDepartmentRequest(params),
  });
};

export const useAddDepartments = (): UseMutationResult<
  TDataAddDepartmentResponse,
  TMetaErrorResponse,
  TAddDepartmentPayload
> => {
  return useMutation<
    TDataAddDepartmentResponse,
    TMetaErrorResponse,
    TAddDepartmentPayload
  >({
    mutationKey: ['add-department'],
    mutationFn: async (payload: TAddDepartmentPayload) => {
      const response = await addDepartmentRequest(payload);
      if (!response) {
        throw new Error('Invalid response');
      }
      return response;
    },
  });
};

export const useUpdateDepartment = (): UseMutationResult<
  TDataUpdateDepartmentResponse,
  TMetaErrorResponse,
  { payload: TUpdateDepartmentPayload; id: number }
> => {
  return useMutation<
    TDataUpdateDepartmentResponse,
    TMetaErrorResponse,
    { payload: TUpdateDepartmentPayload; id: number }
  >({
    mutationKey: ['update-department'],
    mutationFn: async ({
      payload,
      id,
    }: {
      payload: TUpdateDepartmentPayload;
      id: number;
    }) => {
      const response = await updateDepartmentRequest({ payload, id });
      if (!response) {
        throw new Error('Invalid response');
      }
      return response;
    },
  });
};

export const useDeleteDepartment = (): UseMutationResult<
  TDataDeleteDepartmentResponse,
  TMetaErrorResponse,
  number
> => {
  return useMutation<TDataDeleteDepartmentResponse, TMetaErrorResponse, number>(
    {
      mutationKey: ['delete-department'],
      mutationFn: async (id) => {
        const response = await deleteDepartmentRequest(id);
        if (!response) {
          throw new Error('Invalid response');
        }
        return response;
      },
    }
  );
};

export const useGetDivisionByDepartment = ({
  id,
}: {
  id: number;
}): UseQueryResult<TDataGetDepartmentByDivisionResponse, TMetaErrorResponse> =>
  useQuery({
    queryKey: ['get-division-by-department', id],
    queryFn: async () => await getDivisionsByDepartment(id),
  });

export const useAddAwardeeToManagement = (): UseMutationResult<
  TDataAddAwardeeToManagementResponse,
  TMetaErrorResponse,
  TAddAwardeeToManagementPayload
> => {
  return useMutation<
    TDataAddAwardeeToManagementResponse,
    TMetaErrorResponse,
    TAddAwardeeToManagementPayload
  >({
    mutationKey: ['add-awardee-to-management'],
    mutationFn: async (payload: TAddAwardeeToManagementPayload) => {
      const response = await addAwardeeToManagementRequest(payload);
      if (!response) {
        throw new Error('Invalid response');
      }
      return response;
    },
  });
};

export const useDeleteAwardeeToManagement = (): UseMutationResult<
  TDataDeleteAwardeeToManagementResponse,
  TMetaErrorResponse,
  TDeleteAwardeeToManagementPayload
> => {
  return useMutation<
    TDataDeleteAwardeeToManagementResponse,
    TMetaErrorResponse,
    TDeleteAwardeeToManagementPayload
  >({
    mutationKey: ['delete-awardee-to-management'],
    mutationFn: async (payload: TDeleteAwardeeToManagementPayload) => {
      const response = await deleteAwardeeFromManagementRequest(payload);
      if (!response) {
        throw new Error('Invalid response');
      }
      return response;
    },
  });
};
