import { TPutPostData } from '@/types/posts/crud';

export interface TPhotoPayload {
  caption?: string;
  post_id: number | undefined;
  photo_id: number | undefined;
  category: string;
}

export interface TPutPhotoPayload {
  caption?: string;
  category: string;
  featured: boolean;
  post_id: number | undefined;
  file: File;
}

export interface TFileActionProps {
  url: string;
  nameFile?: string;
  typeFile?: string;
  isEdit?: boolean;
  isRemove?: boolean;
  handleEdit?: () => void;
  handleRemove?: () => void;
  payload?: TPhotoPayload;
  invalidateQueryName?: string;
}

export interface TAddPhotoData {
  id: number;
  file_id: number;
  alt: string;
  caption: string;
  category: string;
  featured: boolean;
  post_id: number;
  updatedAt: string;
  createdAt: string;
}

export type TDataPutPostPhotoResponse = TMetaResponseSingle<TPutPostData>;
export type TDataDeletePostPhotoResponse = TMetaResponseSingle<TPutPostData>;
export type TDataAddPostPhotoResponse = TMetaResponseSingle<TAddPhotoData>;
