import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';

import {
  getFeaturedPhotos,
  getHomeSummaryRequest,
  postContactUs,
} from '@/hooks/landing-page/request';

import { TMetaErrorResponse } from '@/types';
import {
  TContactUsDataResponse,
  TContactUsPayload,
  TDataHeaderPhotosResponse,
  THomeSummaryDataResponse,
} from '@/types/landing-page/index.';

export const useGetHomeSummary = (): UseQueryResult<
  THomeSummaryDataResponse,
  TMetaErrorResponse
> =>
  useQuery({
    queryKey: ['home-summary'],
    queryFn: async () => await getHomeSummaryRequest(),
  });

export const usePostContactUs = (): UseMutationResult<
  TContactUsDataResponse,
  TMetaErrorResponse,
  TContactUsPayload
> => {
  return useMutation({
    mutationKey: ['contact-us'],
    mutationFn: async (payload: TContactUsPayload) =>
      await postContactUs(payload),
  });
};

export const useGetFeaturedPhotos = (): UseQueryResult<
  TDataHeaderPhotosResponse,
  TMetaErrorResponse
> =>
  useQuery({
    queryKey: ['featured-photos'],
    queryFn: async () => await getFeaturedPhotos(),
  });
