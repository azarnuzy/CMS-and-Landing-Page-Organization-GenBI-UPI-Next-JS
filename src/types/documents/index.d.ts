import { TMetaResponseSingle } from '@/types';

export interface TAddDocumentData {
  id: number;
  file_id: number;
  category: string;
  post_id: number;
  updatedAt: string;
  createdAt: string;
}

export interface TAddDocumentPayload {
  category: string;
  post_id: number;
  file: File;
}

export type TDataAddDocumentResponse = TMetaResponseSingle<TAddDocumentData>;
