import { TMetaResponseSingle } from '@/types';

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

export type TDataAddProgramResponse = TMetaResponseSingle<TAddProgramData>;
export type TDataUpdateProgramResponse =
  TMetaResponseSingle<TUpdateProgramData>;
export type TDataDeleteProgramResponse = TMetaResponseSingle<null>;
