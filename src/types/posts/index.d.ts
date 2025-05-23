import { TMetaResponse, TMetaResponseSingle } from '@/types';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TPostsData {
  id: number;
  slug: string;
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
  slug: string;
  title: string;
  content_preview: string;
  type: string;
  content: string;
  visitors: number;
  tags: string[];
  comments: number;
  department_id: number;
  department_name: string;
  event: Event;
  author: Author;
  image_cover: ImageCoverDetail;
  images: Image[];
  created_at: string;
  updated_at: string;
  attachments: Attachments[];
}

export interface Event {
  id: number;
  title: string;
}

export interface Attachments {
  id: number;
  category: string;
  file_name: string;
  file_url: string;
}

export interface Author {
  id: number;
  name: string;
  photo: Photo;
}

export interface Photo {
  id: number;
  alt: string;
  file_url: string;
}

export interface ImageCoverDetail {
  id: number;
  category: string;
  alt: string;
  file_url: string;
  caption: string;
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
  slug: string;
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

export interface TGetSearchPostParams {
  keyword: string;
  sort: string;
  type: string;
  limit: number;
  page: number;
}

export interface TVisitorPostData {
  id: number;
  visitors: number;
}

export type TDataGetAllPostResponse = TMetaResponse<TPostsData>;
export type TDataVisitorPostResponse = TMetaResponseSingle<TVisitorPostData>;
export type TDataGetDetailPostResponse = TMetaResponseSingle<TPostDetailData>;
export type TDataCommentPostResponse = TMetaResponse<TCommentData>;
export type TDataPostTypesResponse = TMetaResponse<string>;
