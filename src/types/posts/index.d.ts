import { TMetaResponse, TMetaResponseSingle } from '@/types';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TPostsData {
  id: number;
  title: string;
  type: string;
  content: string;
  visitors: number;
  department_id: number;
  department_name: string;
  image_cover: ImageCover;
  created_at: string;
  updated_at: string;
  _links: Links;
}

export interface ImageCover {
  id: number;
  category: string;
  alt: string;
  file_url: string;
}

export interface Links {
  self: Self;
}

export interface Self {
  href: string;
}

export interface TPostDetailData {
  post: Post;
  similarPosts: SimilarPost[];
}

export interface Post {
  id: number;
  title: string;
  type: string;
  content: string;
  visitors: number;
  tags: string[];
  department_id: number;
  department_name: string;
  author: string;
  event: any | string;
  images: Image[];
  created_at: string;
  updated_at: string;
}

export interface Image {
  id: number;
  category: string;
  alt: string;
  file_url: string;
  caption: string;
}

export interface SimilarPost {
  id: number;
  title: string;
  type: string;
  content: string;
  visitors: number;
  department_id: number;
  department_name: string;
  tags: string[];
}

export interface TCommentData {
  id: number;
  post_id: number;
  comment_id: any;
  level: number;
  commenter?: string;
  content: string;
  created_at: string;
  updated_at: string;
  _links: LinksReply;
  replies: Reply2[];
}

export interface LinksReply {
  reply: Reply;
}

export interface Reply {
  href: string;
}

export interface Reply2 {
  id: number;
  post_id: number;
  comment_id: number;
  level: number;
  commenter?: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface TGetAllPostParams {
  sort: string;
  type: string;
  limit: number;
  page: number;
  filter?: string;
}

export interface TVisitorPostData {
  id: number;
  visitors: number;
}

export type TDataGetAllPostResponse = TMetaResponse<TPostsData>;
export type TDataVisitorPostResponse = TMetaResponseSingle<TVisitorPostData>;
export type TDataGetDetailPostResponse = TMetaResponseSingle<TPostDetailData>;
export type TDataCommentPostResponse = TMetaResponse<TCommentData>;
