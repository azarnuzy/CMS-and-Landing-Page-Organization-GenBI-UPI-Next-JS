import { useMutation, UseMutationResult } from '@tanstack/react-query';

import {
  addPhotoRequest,
  deletePhotoRequest,
  putPhotoRequest,
} from '@/hooks/photos/request';

import { TMetaErrorResponse } from '@/types';
import { TDataPutPostPhotoResponse, TPutPhotoPayload } from '@/types/photos';

export const usePutPhoto = (): UseMutationResult<
  TDataPutPostPhotoResponse,
  TMetaErrorResponse,
  { payload: TPutPhotoPayload; id: number }
> => {
  return useMutation<
    TDataPutPostPhotoResponse,
    TMetaErrorResponse,
    { payload: TPutPhotoPayload; id: number }
  >({
    mutationKey: ['put-post-photo'],
    mutationFn: async ({
      payload,
      id,
    }: {
      payload: TPutPhotoPayload;
      id: number;
    }) => {
      const response = await putPhotoRequest({ payload, id });
      if (!response) {
        throw new Error('Invalid response');
      }
      return response;
    },
  });
};

export const useAddPhoto = (): UseMutationResult<
  TDataPutPostPhotoResponse,
  TMetaErrorResponse,
  TPutPhotoPayload
> => {
  return useMutation<
    TDataPutPostPhotoResponse,
    TMetaErrorResponse,
    TPutPhotoPayload
  >({
    mutationKey: ['add-post-photo'],
    mutationFn: async (payload) => {
      const response = await addPhotoRequest(payload);
      if (!response) {
        throw new Error('Invalid response');
      }
      return response;
    },
  });
};

export const useDeletePhoto = (): UseMutationResult<
  TDataPutPostPhotoResponse,
  TMetaErrorResponse,
  number
> => {
  return useMutation<TDataPutPostPhotoResponse, TMetaErrorResponse, number>({
    mutationKey: ['add-post-photo'],
    mutationFn: async (id) => {
      const response = await deletePhotoRequest(id);
      if (!response) {
        throw new Error('Invalid response');
      }
      return response;
    },
  });
};
