import { TMetaResponse, TMetaResponseSingle } from '@/types';

export interface TOptionManagementsData {
  id: number;
  name: string;
  period_year: string;
}

export interface TActiveManagementsData {
  management: Management;
  structure: Structure;
}

export interface Management {
  id: number;
  name: string;
  description: string;
  vision: string;
  mission: string[];
  period_year: string;
  period_start_date: string;
  period_end_date: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  photo: Photo;
  video: Video;
}

export interface Photo {
  id: number;
  alt: string;
  file_url: string;
  caption: string;
  mimetype: string;
}

export interface Video {
  id: number;
  alt: string;
  file_url: string;
  mimetype: string;
}

export interface Structure {
  executives: Execu[];
  departments: Department[];
}

export interface Execu {
  id: number;
  awardee_id: number;
  name: string;
  linkedin_username: string;
  instagram_username: string;
  photo: Photo2;
  department: string;
  division: string;
  position: string;
  created_at: string;
  updated_at: string;
}

export interface Photo2 {
  id: number;
  alt: string;
  file_url: string;
  mimetype: string;
}

export interface Department {
  id: number;
  name: string;
  description: string;
  cover: Cover;
  _links: Links;
}

export interface Cover {
  id: number;
  category: string;
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

export type TDataGetOptionManagementResponse =
  TMetaResponse<TOptionManagementsData>;
export type TDataGetActiveManagementsResponse =
  TMetaResponseSingle<TActiveManagementsData>;
