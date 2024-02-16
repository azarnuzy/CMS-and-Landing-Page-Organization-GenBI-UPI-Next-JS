import { TMetaResponse } from '@/types';

export interface TEventData {
  id: number;
  title: string;
  slug: string;
  type: string;
  status: string;
  thumbnail: Thumbnail;
  description: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  _links: Links;
}

export interface Thumbnail {
  id: number;
  alt: string;
  file_url: string;
  mimetype: string;
}

export interface Links {
  self: Self;
}

export interface Self {
  href: string;
}

export interface TGetAllEventParams {
  sort: string;
  type: string;
  limit: number;
  page: number;
  filter?: string;
}

export type TDataGetAllEventResponse = TMetaResponse<TEventData>;
