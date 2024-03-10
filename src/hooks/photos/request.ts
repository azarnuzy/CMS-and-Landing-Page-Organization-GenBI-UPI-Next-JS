import { serialize } from 'object-to-formdata';

import { api } from '@/lib/api';

import {
  TDataAddPostPhotoResponse,
  TDataPutPostPhotoResponse,
  TPutPhotoPayload,
} from '@/types/photos';

export const putPhotoRequest = async ({
  payload,
  id,
}: {
  payload: TPutPhotoPayload;
  id: number;
}): Promise<TDataPutPostPhotoResponse | undefined> => {
  const { data } = await api({
    method: 'put',
    url: `v1/photos/${id}`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: serialize(payload),
  });

  return data;
};

export const addPhotoRequest = async (
  payload: TPutPhotoPayload
): Promise<TDataAddPostPhotoResponse | undefined> => {
  const { data } = await api({
    method: 'post',
    url: `v1/photos`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: serialize(payload),
  });

  return data;
};

export const deletePhotoRequest = async (
  id: number
): Promise<TDataPutPostPhotoResponse> => {
  const { data } = await api.delete(`v1/photos/${id}`);

  return data;
};
