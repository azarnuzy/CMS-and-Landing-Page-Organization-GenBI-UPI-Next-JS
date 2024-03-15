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

export interface TDepartmentOptionData {
  id: number;
  name: string;
}

export interface TDepartmentGetAllParams {
  page: number;
  limit: number;
  sort: string;
  type: string;
  options?: boolean;
}

export interface TAllDepartmentData {
  id: number;
  name: string;
  description: string;
  cover_id?: number;
  management_id?: number;
  createdAt: string;
  updatedAt: string;
  cover?: Cover;
  divisions: Division[];
  _links: Links;
}
export interface Links {
  self: Self;
}

export interface Self {
  href: string;
}

export interface Cover {
  id: number;
  alt: string;
  file: File;
}

export interface File {
  imagekit_url: string;
  mimetype: string;
}

export interface TAddDepartementData {
  id: number;
  name: string;
  description: string;
  cover_id: number;
  management_id: number;
  updatedAt: string;
  createdAt: string;
}

export interface TAddDepartmentPayload {
  cover: File;
  name: string;
  description: string;
  management_id: number;
}

export interface TUpdateDepartmentPayload {
  cover?: File;
  name?: string;
  description?: string;
  management_id?: number;
}

export interface TUpdateDepartmentData {
  id: number;
}

export interface TDepartmentByDivisionData {
  id: number;
  name: string;
  department_id: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export type TDataGetDepartmentsTagResponse = TMetaResponse<string>;
export type TDataGetDepartmentsByIdResponse =
  TMetaResponseSingle<TDepartmentByIdData>;
export type TDataGetDepartmentOptionResponse =
  TMetaResponse<TDepartmentOptionData>;
export type TDataGetAllDepartmentResponse = TMetaResponse<TAllDepartmentData>;
export type TDataAddDepartmentResponse =
  TMetaResponseSingle<TAddDepartementData>;
export type TDataUpdateDepartmentResponse =
  TMetaResponseSingle<TUpdateDepartmentData>;
export type TDataDeleteDepartmentResponse = TMetaResponseSingle<null>;
export type TDataGetDepartmentByDivisionResponse =
  TMetaResponse<TDepartmentByDivisionData>;
