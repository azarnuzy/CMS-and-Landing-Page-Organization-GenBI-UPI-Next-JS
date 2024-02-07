import { TMetaResponseSingle } from '@/types';

export interface TDataManagement {
  management: Management;
  departments: Department2[];
}

export interface Management {
  id: number;
  name: string;
  photo_id: number;
  video_id: number;
  description: string;
  vision: string;
  mission: string[];
  period_year: string;
  period_start_date: string;
  period_end_date: string;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
  photo: Photo;
  video: Video;
  awardees: Awardee[];
}

export interface Photo {
  alt: string;
  caption: string;
  file: File;
}

export interface File {
  imagekit_url: string;
  mimetype: string;
}

export interface Video {
  alt: string;
  file: File2;
}

export interface File2 {
  imagekit_url: string;
  mimetype: string;
}

export interface Awardee {
  id: number;
  name: string;
  linkedin_username: string;
  instagram_username: string;
  department: Department;
  position: Position;
  photo: Photo2;
}

export interface Department {
  name: string;
}

export interface Position {
  name: string;
}

export interface Photo2 {
  alt: string;
  caption: string;
  file: File3;
}

export interface File3 {
  imagekit_url: string;
  mimetype: string;
}

export interface Department2 {
  id: number;
  name: string;
  management_department: ManagementDepartment[];
  _links: Links;
}

export interface ManagementDepartment {
  cover_id?: number;
  cover?: Cover;
}

export interface Cover {
  alt: string;
  file: File4;
}

export interface File4 {
  imagekit_url: string;
  mimetype: string;
}

export interface Links {
  self: Self;
}

export interface Self {
  href: string;
}

export type TDataManagementResponse = TMetaResponseSingle<TDataManagement>;
