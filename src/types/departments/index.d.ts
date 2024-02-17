import { TMetaResponse, TMetaResponseSingle } from '@/types';

export interface TDepartmentByIdData {
  department: Department;
  structure: Structure;
}

export interface Department {
  id: number;
  name: string;
  management: string;
  cover: Cover;
  description: string;
  divisions: Division[];
  programs: Program[];
}

export interface Cover {
  id: number;
  alt: string;
  file_url: string;
  mimetype: string;
}

export interface Division {
  id: number;
  name: string;
  description: string;
}

export interface Program {
  id: number;
  name: string;
  description: string;
  implementation_desc: string;
}

export interface Structure {
  manager: Manager;
  awardees: Awardee[];
}

export interface Manager {
  id: number;
  awardee_id: number;
  name: string;
  linkedin_username: string;
  instagram_username: string;
  photo: Photo;
  department: string;
  position: string;
  created_at: string;
  updated_at: string;
}

export interface Photo {
  id: number;
  alt: string;
  file_url: string;
  caption: string;
  mimetype: string;
}

export interface Awardee {
  id: number;
  name: string;
  description: string;
  awardees: Awardee2[];
}

export interface Awardee2 {
  id: number;
  awardee_id: number;
  name: string;
  linkedin_username?: string;
  instagram_username: string;
  photo: Photo2;
  division: string;
  position: string;
}

export interface Photo2 {
  id: number;
  alt: string;
  file_url: string;
  caption: string;
  mimetype: string;
}

export type TDataGetDepartmentsTagResponse = TMetaResponse<string>;
export type TDataGetDepartmentsByIdResponse =
  TMetaResponseSingle<TDepartmentByIdData>;
