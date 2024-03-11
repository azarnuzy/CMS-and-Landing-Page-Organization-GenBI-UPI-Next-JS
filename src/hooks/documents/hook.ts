import { useMutation, UseMutationResult } from '@tanstack/react-query';

import {
  addDocumentRequest,
  deleteDocumentRequest,
  putDocumentRequest,
} from '@/hooks/documents/request';

import { TMetaErrorResponse } from '@/types';
import { TAddDocumentPayload } from '@/types/documents';
import { TDataPutPostPhotoResponse } from '@/types/photos';

export const usePutDocument = (): UseMutationResult<
  TDataPutPostPhotoResponse,
  TMetaErrorResponse,
  { payload: TAddDocumentPayload; id: number }
> => {
  return useMutation<
    TDataPutPostPhotoResponse,
    TMetaErrorResponse,
    { payload: TAddDocumentPayload; id: number }
  >({
    mutationKey: ['put-post-document'],
    mutationFn: async ({
      payload,
      id,
    }: {
      payload: TAddDocumentPayload;
      id: number;
    }) => {
      const response = await putDocumentRequest({ payload, id });
      if (!response) {
        throw new Error('Invalid response');
      }
      return response;
    },
  });
};

export const useAddDocument = (): UseMutationResult<
  TDataPutPostPhotoResponse,
  TMetaErrorResponse,
  TAddDocumentPayload
> => {
  return useMutation<
    TDataPutPostPhotoResponse,
    TMetaErrorResponse,
    TAddDocumentPayload
  >({
    mutationKey: ['add-post-document'],
    mutationFn: async (payload) => {
      const response = await addDocumentRequest(payload);
      if (!response) {
        throw new Error('Invalid response');
      }
      return response;
    },
  });
};

export const useDeleteDocument = (): UseMutationResult<
  TDataPutPostPhotoResponse,
  TMetaErrorResponse,
  number
> => {
  return useMutation<TDataPutPostPhotoResponse, TMetaErrorResponse, number>({
    mutationKey: ['delete-post-document'],
    mutationFn: async (id) => {
      const response = await deleteDocumentRequest(id);
      if (!response) {
        throw new Error('Invalid response');
      }
      return response;
    },
  });
};
