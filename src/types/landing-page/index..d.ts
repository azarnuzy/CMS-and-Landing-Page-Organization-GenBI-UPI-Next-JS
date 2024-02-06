import { TMetaResponseSingle } from '@/types';

export type THomeSummaryData = {
  events: number;
  posts: number;
  years: number;
  visitors: number;
  awardees: number;
};

export type THomeSummaryDataResponse = TMetaResponseSingle<THomeSummaryData>;

export type TContactUsPayload = {
  email: string;
  name: string;
  message: string;
};

export type TContactUsDataResponse = TMetaResponseSingle<null>;
