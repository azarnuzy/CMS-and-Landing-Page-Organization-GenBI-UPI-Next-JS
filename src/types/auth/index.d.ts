import { TMetaResponseSingle } from '@/types';

export type TLoginData = {
  data: {
    uuid: string;
    username: string;
    token: string;
    roles: number[];
  };
} & User;

export type TLoginPayload = {
  username: string;
  password: string;
};

export interface TWhoAmIData {
  id: number;
  username: string;
  email: string;
  roles: string[];
  created_at: string;
  updated_at: string;
  awardee: Awardee;
}

export interface Awardee {
  id: number;
  name: string;
  photo: Photo;
  department: string;
  division: string;
  position: string;
}

export interface Photo {
  id: number;
  alt: string;
  file_url: string;
  caption: string;
  mimetype: string;
}

export type TDataLoginResponse = TMetaResponseSingle<TLoginData>;
export type TDataWhoAmIResponse = TMetaResponseSingle<TWhoAmIData>;
