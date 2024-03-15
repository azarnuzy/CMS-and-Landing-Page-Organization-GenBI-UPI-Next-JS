import { serialize } from 'object-to-formdata';

import { api } from '@/lib/api';

import {
  TAddDepartmentPayload,
  TDataAddDepartmentResponse,
  TDataDeleteDepartmentResponse,
  TDataGetAllDepartmentResponse,
  TDataGetDepartmentByDivisionResponse,
  TDataGetDepartmentOptionResponse,
  TDataGetDepartmentsByIdResponse,
  TDataGetDepartmentsTagResponse,
  TDataUpdateDepartmentResponse,
  TDepartmentGetAllParams,
  TUpdateDepartmentPayload,
} from '@/types/departments';

export const getDepartmentsTagsRequest =
  async (): Promise<TDataGetDepartmentsTagResponse> => {
    const { data } = await api.get(`v1/departments/tags`);

    return data;
  };

export const getDepartmentByIdRequest = async (
  id: number
): Promise<TDataGetDepartmentsByIdResponse> => {
  const { data } = await api.get(`v1/departments/${id}`);

  return data;
};

export const getOptionDepartmentsRequest =
  async (): Promise<TDataGetDepartmentOptionResponse> => {
    const { data } = await api.get(`/v1/departments?options=true&unique=false`);

    return data;
  };

export const getAllDepartmentRequest = async (
  params: TDepartmentGetAllParams
): Promise<TDataGetAllDepartmentResponse> => {
  const { data } = await api.get(`/v1/departments`, { params });

  return data;
};

export const addDepartmentRequest = async (
  payload: TAddDepartmentPayload
): Promise<TDataAddDepartmentResponse> => {
  const { data } = await api({
    method: 'post',
    url: 'v1/departments',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: serialize(payload),
  });
  return data;
};

export const updateDepartmentRequest = async ({
  id,
  payload,
}: {
  id: number;
  payload: TUpdateDepartmentPayload;
}): Promise<TDataUpdateDepartmentResponse> => {
  const { data } = await api({
    method: 'put',
    url: `v1/departments/${id}`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: serialize(payload),
  });
  return data;
};

export const deleteDepartmentRequest = async (
  id: number
): Promise<TDataDeleteDepartmentResponse> => {
  const { data } = await api.delete(`v1/departments/${id}`);

  return data;
};

export const getDivisionsByDepartment = async (
  id: number
): Promise<TDataGetDepartmentByDivisionResponse> => {
  const { data } = await api.get(`v1/departments/${id}/divisions`);

  return data;
};
