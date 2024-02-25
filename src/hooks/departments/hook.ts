import { useQuery, UseQueryResult } from '@tanstack/react-query';

import {
  getDepartmentByIdRequest,
  getDepartmentsTagsRequest,
  getOptionDepartmentsRequest,
} from '@/hooks/departments/request';

import { TMetaErrorResponse } from '@/types';
import {
  TDataGetDepartmentOptionResponse,
  TDataGetDepartmentsByIdResponse,
  TDataGetDepartmentsTagResponse,
} from '@/types/departments';

export const useGetDepartmentById = ({
  id,
}: {
  id: string;
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
