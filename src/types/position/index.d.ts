import { TMetaResponse, TMetaResponseSingle } from '@/types';

export interface TGetAllPositionData {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface TGetAllPositionParams {
  sort: string;
  limit: number;
  page: number;
  type: string;
  options?: boolean;
}

export interface TAddPositionPayload {
  name: string;
  description: string;
}

export interface TAddPositionData {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface TUpdatePositionData {
  id: string;
}

export type TDataGetAllPositionResponse = TMetaResponse<TGetAllPositionData>;
export type TDataAddPositionResponse = TMetaResponseSingle<TAddPositionData>;
export type TDataUpdatePositionResponse =
  TMetaResponseSingle<TUpdatePositionData>;
export type TDataDeletePositionResponse = TMetaResponseSingle<null>;
