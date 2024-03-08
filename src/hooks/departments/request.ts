import { api } from '@/lib/api';

import {
  TDataGetDepartmentOptionResponse,
  TDataGetDepartmentsByIdResponse,
  TDataGetDepartmentsTagResponse,
} from '@/types/departments';

export const getDepartmentsTagsRequest =
  async (): Promise<TDataGetDepartmentsTagResponse> => {
    const { data } = await api.get(`v1/departments/tags`);

    return data;
  };

export const getDepartmentByIdRequest = async (
  id: string
): Promise<TDataGetDepartmentsByIdResponse> => {
  const { data } = await api.get(`v1/departments/${id}`);

  return data;
};

export const getOptionDepartmentsRequest =
  async (): Promise<TDataGetDepartmentOptionResponse> => {
    const { data } = await api.get(`/v1/departments?options=true&unique=false`);

    return data;
  };
