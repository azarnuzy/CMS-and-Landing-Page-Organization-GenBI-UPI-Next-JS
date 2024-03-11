import { TMetaResponseSingle } from '@/types';

export interface TCreateCommentData {
  id: number;
  post_id: number;
  comment_id: number | null;
  level: number;
  commenter: string;
  content: string;
  created_at: string;
  updated_at: string;
  _links: Links;
}

export interface Links {
  reply: Reply;
}

export interface Reply {
  href: string;
}

export type TCreateCommentPayload = {
  post_id: number;
  name: string;
  content: string;
};

export interface TCreateReplyData {
  id: number;
  post_id: number;
  comment_id: number;
  level: number;
  commenter: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export type TCreateReplyPayload = {
  comment_id: number;
  name: string;
  content: string;
};

export type TPutCommentPayload = {
  name?: string;
  content: string;
};

export type TPutCommentData = {
  id: number;
};

export type TDataPutCommentResposne = TMetaResponseSingle<TPutCommentData>;
export type TDataDeleteCommentResposne = TMetaResponseSingle<null>;
export type TDataCreateCommentResponse =
  TMetaResponseSingle<TCreateCommentData>;
export type TDataCreateReplyResponse = TMetaResponseSingle<TCreateReplyData>;
