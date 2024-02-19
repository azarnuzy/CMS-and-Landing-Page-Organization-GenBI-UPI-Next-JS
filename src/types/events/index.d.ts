import { TMetaResponse, TMetaResponseSingle } from '@/types';

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

export interface TDetailEventData {
  event: DetailEvent;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  recommendations: any[];
}

export interface DetailEvent {
  id: number;
  title: string;
  slug: string;
  type: string;
  status: string;
  thumbnail: Thumbnail;
  poster: Poster;
  banner: Banner;
  description: string;
  start_date: string;
  end_date: string;
  location: string;
  location_url: string;
  registration_link: string;
  start_reg_date: string;
  end_reg_date: string;
  contact: string;
  related_posts: RelatedPost[];
  program_name: string;
  department_name: string;
  period_year: string;
  created_at: string;
  updated_at: string;
}

export interface Poster {
  id: number;
  alt: string;
  file_url: string;
  mimetype: string;
}

export interface Banner {
  id: number;
  alt: string;
  file_url: string;
  mimetype: string;
}

export interface RelatedPost {
  id: number;
  title: string;
  slug: string;
  type: string;
  content: string;
  visitors: number;
  department_id: number;
  department_name: string;
  tags: string[];
  image_cover: ImageCover;
  created_at: string;
  updated_at: string;
}

export interface ImageCover {
  id: number;
  category: string;
  alt: string;
  file_url: string;
  caption: string;
}

export interface TGetAllEventParams {
  sort: string;
  type: string;
  limit: number;
  page: number;
  filter?: string;
}

export type TDataGetAllEventResponse = TMetaResponse<TEventData>;
export type TDataGetDetailEventResponse = TMetaResponseSingle<TDetailEventData>;
