import { atom } from 'recoil';

import { TGalleriesData } from '@/types/galleries';

export const galleriesDataState = atom<Array<TGalleriesData>>({
  key: 'galleriesDataState',
  default: [
    {
      alt: '',
      id: 0,
      caption: '',
      category: '',
      created_at: '',
      file_url: '',
      mimetype: '',
      post_id: 0,
      updated_at: '',
    },
  ],
});
