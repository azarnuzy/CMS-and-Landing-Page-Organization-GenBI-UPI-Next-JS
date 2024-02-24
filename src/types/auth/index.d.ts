import { TMetaResponseSingle } from '@/types';

export type TLoginData = {
  data: {
    uuid: string;
    username: string;
    token: string;
  };
} & User;

export type TLoginPayload = {
  username: string;
  password: string;
};

export type TDataLoginResponse = TMetaResponseSingle<TLoginData>;
