import { TMetaResponse, TMetaResponseSingle } from '@/types';

export interface TAwardeesData {
  id: number;
  nim: string;
  name: string;
  scholarship: number;
  study_program: string;
  ips: string | undefined[];
  ipks: string | undefined[];
  photo: Photo;
  department: string;
  division?: string;
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

export interface TAwardeeDetailData {
  id: number;
  name: string;
  birth_date: Date;
  linkedin_username: string;
  instagram_username: string;
  telp: string;
  member_since: Date;
  scholarship: number;
  nim: string;
  year: number;
  ip1: string;
  ip2: string;
  ip3: string;
  ip4: string;
  ip5: string;
  ip6: string;
  ip7: string;
  ip8: string;
  ipk1: string;
  ipk2: string;
  ipk3: string;
  ipk4: string;
  ipk5: string;
  ipk6: string;
  ipk7: string;
  ipk8: string;
  study_program: string;
  faculty: string;
  created_at: string;
  updated_at: string;
  photo: Photo;
  transcript: Transcript;
  managements: Management[];
}

export interface Transcript {
  id: number;
  file_name: string;
  file_url: string;
}

export interface Management {
  id: number;
  management: string;
  department: string;
  division: string;
  position: string;
}

export interface TAwardeesParams {
  limit: number;
  page: number;
  sort: string;
  type: string;
  management?: string;
  department?: string;
  search?: string;
}

export type TDataGetAllAwardeesResponse = TMetaResponse<TAwardeesData>;
export type TDataDetailAwardeeResponse =
  TMetaResponseSingle<TAwardeeDetailData>;
