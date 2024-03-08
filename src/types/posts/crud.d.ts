import { TMetaResponse, TMetaResponseSingle } from '@/types';

export interface TAddPostResponse {
  post: Post;
  cover: Cover;
  others: Other[];
  attachments: Attachments[];
}

export interface Post {
  visitors: number;
  id: number;
  type: string;
  title: string;
  slug: string;
  content: string;
  department_id: number;
  author_id: number;
  event_id: number;
  tag1: string;
  tag2: string;
  tag3: string;
  tag4: string;
  tag5: string;
  search: string;
  updatedAt: string;
  createdAt: string;
}

export interface Cover {
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

export interface Other {
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

export interface Attachments {
  id: number;
  category: string;
  file_name: string;
  file_url: string;
}

export interface TAddPostPayload {
  title: string;
  content: string;
  type: string;
  department_id: number | undefined;
  author_id: number | undefined;
  event_id?: number | undefined;
  tags: string[];
  caption_cover: string;
  caption_other1?: string;
  caption_other2?: string;
  caption_other3?: string;
  caption_other4?: string;
  cover: File | undefined;
  other?: Array<File> | undefined;
  attachment?: Array<File> | undefined;
}

export interface TPutPostPayload {
  title?: string;
  content?: string;
  type?: string;
  department_id?: number | undefined;
  author_id?: number | undefined;
  event_id?: number | undefined;
  tags?: string[];
}

export interface TPutPostPhotoPayload {
  file: File;
  caption: string;
  category: string;
  featured: boolean;
  post_id: number | undefined;
}

export interface TPutPostData {
  id: string;
}

export interface TPutFileData {
  caption_cover?: string;
  caption_other1?: string;
  caption_other2?: string;
  caption_other3?: string;
  caption_other4?: string;
  caption_other4?: string;
  cover: File | undefined;
  other?: Array<File> | undefined;
  attachment?: Array<File> | undefined;
}

export interface TDataPhotoNewsState {
  alt: string;
  caption: string;
  file_url: string;
  id: number;
  post_id: number;
  category: string;
}

export type TDataAddPostResponse = TMetaResponseSingle<TAddPostResponse>;
export type TDataGetPostTypeResponse = TMetaResponse<Array<string>>;
export type TDataPutPostResponse = TMetaResponseSingle<TPutPostData>;
export type TDataPutPostPhotoResponse = TMetaResponseSingle<TPutPostData>;
