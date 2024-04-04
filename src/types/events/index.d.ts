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
  scope: string;
  status: string;
  thumbnail: Thumbnail;
  poster: Poster;
  banner: Banner;
  description_preview: string;
  description: string;
  start_date: string;
  end_date: string;
  participants: number;
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

export interface TRegistrationEventPayload {
  event_id: number;
  name: string;
  email: string;
  institution: string;
  role: string;
  field: string;
  telp: string;
  city: string;
}

export interface TRegistrationEventData {
  id: number;
  event_id: number;
  name: string;
  email: string;
  institution: string;
  role: string;
  field: string;
  telp: string;
  city: string;
  updatedAt: string;
  createdAt: string;
}

export interface TUpdateRegistrationEventData {
  id: string;
}

export interface TAddEventPayload {
  thumbnail: File | undefined;
  poster: File | undefined;
  banner: File | undefined;
  title: string;
  program_id?: number | undefined;
  type: string;
  description: string;
  start_date: date | undefined;
  end_date: date | undefined;
  location: string;
  location_url?: string;
  registration_link?: string;
  start_reg_date: date | undefined;
  end_reg_date: date | undefined;
  contact: string;
  tags: string[];
  scope: string;
}

export interface TAddEventData {
  id: number;
  title: string;
  slug: string;
  program_id: number;
  type: string;
  status: string;
  thumbnail_id: number;
  poster_id: number;
  banner_id: number;
  description: string;
  start_date: string;
  end_date: string;
  participants: number;
  location: string;
  location_url: string;
  registration_link: string;
  start_reg_date: string;
  end_reg_date: string;
  contact: string;
  tag1: string;
  tag2: string;
  tag3: string;
  tag4: string;
  tag5: string;
  updatedAt: string;
  createdAt: string;
}

export interface TPutEventPayload {
  title?: string;
  program_id?: number;
  type?: string;
  scope?: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  location?: string;
  location_url?: string;
  registration_link?: string;
  start_reg_date?: string;
  end_reg_date?: string;
  contact?: string;
  tags?: string[];
}

export interface TPutEventData {
  id: string;
}

export interface TEventParticipantsData {
  id: number;
  event_id: number;
  name: string;
  email: string;
  institution: string;
  role: string;
  field: string;
  telp: string;
  city: string;
  createdAt: string;
  updatedAt: string;
}

export type TDataGetAllEventResponse = TMetaResponse<TEventData>;
export type TDataGetDetailEventResponse = TMetaResponseSingle<TDetailEventData>;
export type TDataRegistrationEventResponse =
  TMetaResponseSingle<TRegistrationEventData>;
export type TDataUpdateRegistrationEventResponse =
  TMetaResponseSingle<TUpdateRegistrationEventData>;
export type TDataGetOptionEventParticipantsRolesResponse = TMetaResponse<
  Array<string>
>;
export type TDataGetOptionEventParticipantsFieldsResponse = TMetaResponse<
  Array<string>
>;
export type TDataAddEventResponse = TMetaResponseSingle<TAddEventData>;
export type TDataPutEventResponse = TMetaResponseSingle<TPutEventData>;
export type TDataDeleteEventResponse = TMetaResponseSingle<null>;
export type TDataGetEventParticipansResponse =
  TMetaResponse<TEventParticipantsData>;
export type TDataGetStatusEventResposne = TMetaResponse<string>;
