import { TMetaResponse } from '@/types';

export interface TStudyProgramData {
  id: number;
  name: string;
  jenjang: string;
  faculty_name: string;
  faculty_abbr: string;
}

export interface TStudyProgramDataSelect {
  value: number;
  label: string;
}

export type TDataGetAllStudyProgramResponse = TMetaResponse<TStudyProgramData>;
