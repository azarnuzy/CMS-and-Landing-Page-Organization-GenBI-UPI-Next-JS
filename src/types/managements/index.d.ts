import { TMetaResponseSingle } from '@/types';

export interface TManagementData {
  management: Management;
  departments: Department[];
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
  awardees: Awardee[];
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

export interface Awardee {
  id: number;
  name: string;
  linkedin_username: string;
  instagram_username: string;
  photo: Photo2;
  department: string;
  position: string;
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
  cover: Cover;
  _links: Links;
}

export interface Cover {
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

export type TManagementDataResponse = TMetaResponseSingle<TManagementData>;
