import { api } from '@/lib/api';

import {
  TContactUsDataResponse,
  TContactUsPayload,
  TDataHeaderPhotosResponse,
  THomeSummaryDataResponse,
} from '@/types/landing-page/index.';

export const getHomeSummaryRequest =
  async (): Promise<THomeSummaryDataResponse> => {
    const { data } = await api.get(`v1/summary/home`);

    return data;
  };

export const postContactUs = async (
  payload: TContactUsPayload
): Promise<TContactUsDataResponse> => {
  const { data } = await api.post<TContactUsDataResponse>(
    'v1/contact/send-email',
    payload
  );

  return data;
};

export const getFeaturedPhotos =
  async (): Promise<TDataHeaderPhotosResponse> => {
    const { data } = await api.get(`v1/photos/featured`);

    return data;
  };
