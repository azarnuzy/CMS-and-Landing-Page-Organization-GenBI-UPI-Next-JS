import { api } from '@/lib/api';

import {
  TDataGetGalleriesResponse,
  TGetGalleriesParams,
} from '@/types/galleries';

export const getGalleriesRequest = async (
  params: TGetGalleriesParams
): Promise<TDataGetGalleriesResponse> => {
  const { sort, type, limit, page } = params;

  const { data } = await api.get(`v1/photos/gallery`, {
    params: {
      sort,
      type,
      limit,
      page,
    },
  });

  return data;
};
