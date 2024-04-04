import { TMetaResponse, TMetaResponseSingle } from '@/types';

export interface TAddProgramPayload {
  name: string;
  description: string;
  type: string;
  implementation_desc: string;
  date_start: Date;
  date_end: Date;
  department_id: number;
}

export interface TAddProgramData {
  id: number;
  name: string;
  description: string;
  type: string;
  implementation_desc: string;
  date_start: string;
  date_end: string;
  department_id: number;
  management_id: number;
  updatedAt: string;
  createdAt: string;
}

export interface TUpdateProgramData {
  id: string;
}

export interface TProgramDetailData {
  id: number;
  name: string;
  description: string;
  type: string;
  implementation_desc: string;
  date_start: string;
  date_end: string;
  department_id: number;
  management_id: number;
  createdAt: string;
  updatedAt: string;
  department: Department;
  management: Management;
}

export interface Department {
  id: number;
  name: string;
}

export interface Management {
  id: number;
  name: string;
  period_year: string;
}

export type TDataAddProgramResponse = TMetaResponseSingle<TAddProgramData>;
export type TDataUpdateProgramResponse =
  TMetaResponseSingle<TUpdateProgramData>;
export type TDataDeleteProgramResponse = TMetaResponseSingle<null>;
export type TDataGetProgramTypeResponse = TMetaResponse<string[]>;
export type TDataGetProgramDetailResponse =
  TMetaResponseSingle<TProgramDetailData>;
export type TDataGetProgramOptionsResponse = TMetaResponse<TProgramDetailData>;
