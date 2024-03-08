import { atom, selector } from 'recoil';

import { TDepartmentOptionData } from '@/types/departments';
import { TPostDetailData } from '@/types/posts';

export const searchAdminNewsState = atom<string>({
  key: 'searchAdminNewsState',
  default: '',
});

export const dataStatusAdminNewsState = atom<string>({
  key: 'dataStatusAdminNewsState',
  default: 'data',
});

export const parentRefAdminNewsState =
  atom<React.RefObject<HTMLTableElement> | null>({
    key: 'parentRefAdminNewsState',
    default: null,
  });

export const dataAddDepartmentAtomNewsState = atom<TDepartmentOptionData[]>({
  key: 'dataAddDepartmentAtomNewsState',
  default: [
    {
      id: 0,
      name: '',
    },
  ],
});

export const dataDepartmentSelectorNewsState = selector({
  key: 'dataDepartmentSelectorNewsState',
  get: ({ get }) => {
    const data = get(dataAddDepartmentAtomNewsState);

    return data.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  },
});

export const postAdminDetailDataState = atom<TPostDetailData>({
  key: 'postAdminDetailDataState',
  default: {
    post: {
      id: 0,
      content_preview: '',
      title: '',
      type: '',
      slug: '',
      content: '',
      visitors: 0,
      tags: [],
      department_id: 0,
      department_name: '',
      author: {
        id: 0,
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
      event: {
        id: 0,
        title: '',
      },
      images: [],
      created_at: '',
      updated_at: '',
      attachments: [],
    },
    similarPosts: [
      {
        id: 0,
        title: '',
        slug: '',
        type: '',
        content: '',
        visitors: 0,
        tags: [],
        department_id: 0,
        department_name: '',
      },
    ],
  },
});

// export const dataPhotoNewsState = atom<TDataPhotoNewsState[]>({
//   key: 'dataPhotoNewsState',
//   default:[ {
//     alt: '',
//     caption: '',
//     file_url: '',
//     id: 0,
//     post_id: 0,
//     category: '',
//   }],
// })

// export const dataPhotoSelectorNewsState = selector({
//  key: 'dataPhotoSelectorNewsState',
//   get: ({ get }) => {

//     const dataDetail = get(postAdminDetailDataState)

//     const cover = dataDetail.post.image_cover.

//   },
// })
