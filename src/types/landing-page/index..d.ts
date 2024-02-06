import { TMetaResponseSingle } from '@/types';

export type THomeSummaryData = {
  events: number;
  posts: number;
  years: number;
  visitors: number;
  awardees: number;
};

export type THomeSummaryDataResponse = TMetaResponseSingle<THomeSummaryData>;
