import { TMetaResponse, TMetaResponseSingle } from '@/types';

export type THomeSummaryData = {
  events: number;
  posts: number;
  years: number;
  visitors: number;
  awardees: number;
};

export type THomeSummaryDataResponse = TMetaResponseSingle<THomeSummaryData>;

export type TContactUsPayload = {
  email: string;
  name: string;
  message: string;
};

export interface THeaderPhotosData {
  id: number;
  alt: string;
  file_url: string;
  category: string;
  featured: boolean;
  caption: string;
  post_id: number;
  mimetype: string;
  created_at: string;
  updated_at: string;
}

export type TContactUsDataResponse = TMetaResponseSingle<null>;
export type TDataHeaderPhotosResponse = TMetaResponse<THeaderPhotosData>;
