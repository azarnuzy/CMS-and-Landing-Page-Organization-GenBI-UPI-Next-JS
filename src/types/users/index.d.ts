export interface TUserOptionsData {
  id: number;
  username: string;
  email: string;
  awardee_id: number;
  awardee_name: string;
}

export interface TUserParams {
  sort: string;
  limit: number;
  page: number;
  type: string;
  options?: boolean;
}

export interface TUserOptionSelector {
  value: number;
  label: string;
}

export type TDataGetUsersOptionResponse = TMetaResponse<TUserOptionsData>;
