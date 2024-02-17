import { TMetaResponse } from '@/types';

export interface TOptionManagementsData {
  id: number;
  name: string;
  period_year: string;
}

export type TDataGetOptionManagement = TMetaResponse<TOptionManagementsData>;
