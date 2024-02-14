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
