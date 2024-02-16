import { atom } from 'recoil';

import { TAppreciationsData } from '@/types/appreciations';

export const appreciationsDataState = atom<Array<TAppreciationsData>>({
  key: 'appreciationsDataState',
  default: [
    {
      id: 0,
      title: '',
      given_date: '',
      instagram_url: '',
      caption: '',
      cover: {
        id: 0,
        alt: '',
        file_url: '',
        caption: '',
        mimetype: '',
      },
      created_at: '',
      updated_at: '',
    },
  ],
});
