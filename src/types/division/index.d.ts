import { TMetaResponseSingle } from '@/types';

export interface TAddDivisionData {
  id: number;
  name: string;
  department_id: number;
  description: string;
  updatedAt: string;
  createdAt: string;
}

export interface TAddDivisionPayload {
  name: string;
  department_id: number;
  description: string;
}

export interface TUpdateDivisionData {
  id: string;
}

export type TDataAddDivisionResponse = TMetaResponseSingle<TAddDivisionData>;
export type TDataUpdateDivisionResponse =
  TMetaResponseSingle<TUpdateDivisionData>;
export type TDataDeleteDivisionResponse = TMetaResponseSingle<null>;
