import { TMetaResponse } from '@/types';

export interface TGalleriesData {
  id: number;
  alt: string;
  file_url: string;
  category: string;
  caption: string;
  post_id: number;
  mimetype: string;
  created_at: string;
  updated_at: string;
}

export interface TGetGalleriesParams {
  sort: string;
  type: string;
  limit: number;
  page: number;
}

export type TDataGetGalleriesResponse = TMetaResponse<TGalleriesData>;
