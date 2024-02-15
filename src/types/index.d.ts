import { AxiosError } from 'axios';

export interface TPaginationMeta {
  totalRows: number;
  totalPages: number;
  thisPageRows: number;
  currentPage: number;
  prev: null | number;
  next: null | number;
}

export type TMetaItem = {
  status: string;
  message: string;
  pagination?: TPaginationMeta;
};

export type TMetaResponse<T> = {
  data: Array<T>;
} & TMetaItem;

export type TMetaResponseSingle<T> = {
  data: T;
} & TMetaItem;

export type TMetaErrorResponse = AxiosError<TMetaItem>;
