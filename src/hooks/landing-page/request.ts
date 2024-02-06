import { api } from '@/lib/api';

import { THomeSummaryDataResponse } from '@/types/landing-page/index.';

export const getHomeSummaryRequest =
  async (): Promise<THomeSummaryDataResponse> => {
    const { data } = await api.get(`v1/summary/home`);

    return data;
  };
