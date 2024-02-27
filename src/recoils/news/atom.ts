import { atom } from 'recoil';

import { TPostsData } from '@/types/posts';

export const postsDataState = atom<Array<TPostsData>>({
  key: 'postsDataState',
  default: [
    {
      id: 0,
      slug: '',
      title: '',
      type: '',
      content: '',
      visitors: 0,
      department_id: 0,
      department_name: '',
      image_cover: {
        id: 0,
        category: '',
        alt: '',
        file_url: '',
      },
      created_at: '',
      updated_at: '',
      _links: {
        self: {
          href: '',
        },
      },
    },
  ],
});
