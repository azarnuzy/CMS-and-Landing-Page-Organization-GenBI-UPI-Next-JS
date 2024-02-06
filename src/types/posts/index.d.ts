/* eslint-disable @typescript-eslint/no-explicit-any */
import { TMetaResponse, TMetaResponseSingle } from '@/types';

export interface TAllPostData {
  id: number;
  title: string;
  type: string;
  slug: string;
  content: string;
  visitors: number;
  tag1: string;
  tag2: string;
  tag3: string;
  tag4: string;
  tag5: string;
  department_id: number;
  author_id: number;
  created_at: string;
  updated_at: string;
  department?: Department;
  images: Image[];
  _links: Links;
}

export interface Department {
  id: number;
  name: string;
}

export interface File {
  id: number;
  imagekit_url: string;
}

export interface Links {
  self: Self;
}

export interface Self {
  href: string;
}

export interface DataDetailPost {
  post: PostDetail;
  similarPosts: SimilarPost[];
}

export interface PostDetail {
  id: number;
  title: string;
  type: string;
  slug: string;
  content: string;
  visitors: number;
  tag1: string;
  tag2: string;
  tag3: string;
  tag4: string;
  tag5: string;
  department_id: number;
  author_id: number;
  created_at: string;
  updated_at: string;
  department: any;
  author: Author;
  event: any;
  images: Image[];
  attachments: any[];
}

export interface Author {
  uuid: string;
  awardee: Awardee;
}

export interface Awardee {
  name: string;
}

export interface Image {
  id: number;
  category: string;
  alt: string;
  caption?: string;
  file: File;
}

export interface SimilarPost {
  id: number;
  title: string;
  type: string;
  slug: string;
  content: string;
  visitors: number;
  tag1: string;
  tag2: string;
  tag3: string;
  tag4: string;
  tag5: string;
  department_id: number;
  author_id: number;
  created_at: string;
  updated_at: string;
  department: Department;
}

export type TPostVisitorPayload = {
  post_id: number;
};

export type TPostVisitorData = {
  id: number;
  visitors: number;
};

export interface TCommentData {
  id: number;
  post_id: number;
  comment_id?: number;
  user_id?: number;
  level: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  user?: User;
  replies: Reply[];
  _links: Links;
  countReplies: number;
}

export interface User {
  username: string;
  awardee: Awardee;
}

export interface Reply {
  id: number;
  post_id: number;
  comment_id: number;
  user_id?: number;
  level: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  user?: User2;
}

export interface User2 {
  username: string;
  awardee: Awardee2;
}

export interface Awardee2 {
  name: string;
}

export interface Links {
  reply: Reply2;
}

export interface Reply2 {
  href: string;
}

export type TAllPostDataResponse = TMetaResponse<TAllPostData>;
export type TPostDetailDataResponse = TMetaResponseSingle<DataDetailPost>;
export type TPostVisitorDataResponse = TMetaResponse<TPostVisitorData>;
export type TCommentDataResponse = TMetaResponse<TCommentData>;
