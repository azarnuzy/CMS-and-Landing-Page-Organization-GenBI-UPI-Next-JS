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
  year: string;
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
  study_program_id: number;
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

export interface TAwardeeAddData {
  id: number;
  user_id: number;
  name: string;
  photo_id: number;
  birth_date: string;
  linkedin_username: string;
  instagram_username: string;
  telp: string;
  member_since: string;
  scholarship: number;
  nim: string;
  study_program_id: number;
  year: string;
  smt1_ip: string;
  smt2_ip: string;
  smt3_ip: string;
  smt4_ip: string;
  smt5_ip: string;
  smt6_ip: string;
  smt7_ip: string;
  smt8_ip: string;
  smt1_ipk: string;
  smt2_ipk: string;
  smt3_ipk: string;
  smt4_ipk: string;
  smt5_ipk: string;
  smt6_ipk: string;
  smt7_ipk: string;
  smt8_ipk: string;
  transcript_id: number;
  updatedAt: string;
  createdAt: string;
}

export interface TAwardeeAddPayload {
  name: string;
  birth_date: Date | undefined;
  linkedin_username?: string;
  instagram_username?: string;
  telp?: string;
  member_since: Date | undefined;
  scholarship?: number;
  nim: string;
  study_program_id?: number;
  photo: FILE;
  year: string;
  smt1_ip?: number;
  smt2_ip?: number;
  smt3_ip?: number;
  smt4_ip?: number;
  smt5_ip?: number;
  smt6_ip?: number;
  smt7_ip?: number;
  smt8_ip?: number;
  smt1_ipk?: number;
  smt2_ipk?: number;
  smt3_ipk?: number;
  smt4_ipk?: number;
  smt5_ipk?: number;
  smt6_ipk?: number;
  smt7_ipk?: number;
  smt8_ipk?: number;
  transcript?: FILE;
}

export interface TAwardeePutPayload {
  name?: string;
  photo?: FILE;
  birth_date?: Date | undefined;
  linkedin_username?: string;
  instagram_username?: string;
  telp?: string;
  member_since?: Date | undefined;
  scholarship?: number;
  nim?: string;
  study_program_id?: number;
  year?: string;
  smt1_ip?: number;
  smt2_ip?: number;
  smt3_ip?: number;
  smt4_ip?: number;
  smt5_ip?: number;
  smt6_ip?: number;
  smt7_ip?: number;
  smt8_ip?: number;
  smt1_ipk?: number;
  smt2_ipk?: number;
  smt3_ipk?: number;
  smt4_ipk?: number;
  smt5_ipk?: number;
  smt6_ipk?: number;
  smt7_ipk?: number;
  smt8_ipk?: number;
  transcript?: FILE;
}

export interface TAwardeePutData {
  id: number;
}

export type TDataGetAllAwardeesResponse = TMetaResponse<TAwardeesData>;
export type TDataDetailAwardeeResponse =
  TMetaResponseSingle<TAwardeeDetailData>;
export type TDataAddAwardeeResponse = TMetaResponseSingle<TAwardeeAddData>;
export type TDataPutAwardeeResponse = TMetaResponseSingle<TAwardeePutData>;
export type TDataDeleteAwardeeResponse = TMetaResponseSingle<TAwardeePutData>;
