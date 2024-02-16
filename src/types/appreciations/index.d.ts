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

export type TDataAppreciationsResponse = TMetaResponse<TAppreciationsData>;
