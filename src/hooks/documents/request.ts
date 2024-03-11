import { serialize } from 'object-to-formdata';

import { api } from '@/lib/api';

import {
  TAddDocumentPayload,
  TDataAddDocumentResponse,
} from '@/types/documents';
import { TDataPutPostPhotoResponse } from '@/types/photos';

export const putDocumentRequest = async ({
  payload,
  id,
}: {
  payload: TAddDocumentPayload;
  id: number;
}): Promise<TDataPutPostPhotoResponse | undefined> => {
  const { data } = await api({
    method: 'put',
    url: `v1/documents/${id}`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: serialize(payload),
  });

  return data;
};

export const addDocumentRequest = async (
  payload: TAddDocumentPayload
): Promise<TDataAddDocumentResponse | undefined> => {
  const { data } = await api({
    method: 'post',
    url: `v1/documents`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: serialize(payload),
  });

  return data;
};

export const deleteDocumentRequest = async (
  id: number
): Promise<TDataPutPostPhotoResponse> => {
  const { data } = await api.delete(`v1/documents/${id}`);

  return data;
};
