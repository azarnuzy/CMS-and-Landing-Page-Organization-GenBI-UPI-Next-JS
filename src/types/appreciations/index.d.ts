import { TMetaResponse } from '@/types';

export interface TAppreciationsData {
  id: number;
  title: string;
  given_date: string;
  instagram_url: string;
  caption: string;
  cover: Cover;
  created_at: string;
  updated_at: string;
}

export interface Cover {
  id: number;
  alt: string;
  file_url: string;
  caption: string;
  mimetype: string;
}

export interface TAppreciationsParams {
  sort: string;
  type: string;
  limit: number;
  page: numbers;
}

export interface TPostAppreciationData {
  id: number;
  title: string;
  cover_id: number;
  given_date: string;
  instagram_url: string;
  post_id: number;
  caption: string;
  updatedAt: string;
  createdAt: string;
}

export interface TPostAppreciationPayload {
  cover: File;
  title: string;
  given_date: string;
  instagram_url: string;
  caption: string;
}

export interface TPutAppreciationData {
  id: string;
}

export type TDataAppreciationsResponse = TMetaResponse<TAppreciationsData>;
export type TDataPostAppreciationResponse =
  TMetaResponse<TPostAppreciationData>;
export type TDataPutAppreciationResponse = TMetaResponse<TPutAppreciationData>;
