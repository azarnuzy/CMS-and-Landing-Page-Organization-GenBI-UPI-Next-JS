import { atom } from 'recoil';

import { TPostDetailData } from '@/types/posts';

export const postDetailDataState = atom<TPostDetailData>({
  key: 'newsDetailDataState',
  default: {
    post: {
      id: 0,
      title: '',
      type: '',
      content: '',
      visitors: 0,
      tags: [],
      department_id: 0,
      department_name: '',
      author: {
        name: '',
        photo: {
          id: 0,
          alt: '',
          file_url: '',
        },
      },
      image_cover: {
        id: 0,
        category: '',
        alt: '',
        file_url: '',
        caption: '',
      },
      event: '',
      images: [],
      created_at: '',
      updated_at: '',
      attachments: [],
    },
    similarPosts: [],
  },
});
