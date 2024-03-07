import { TAddPostPayload } from '@/types/posts/add';
import { TUserParams } from '@/types/users';

export const breadcrumbAddNewsData = [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'News',
    link: '/admin/news',
  },
  {
    name: 'Add News',
    link: '/admin/news/add',
  },
];

export const addNewsDefaultValues: TAddPostPayload = {
  title: '',
  type: '',
  content: '<p></p>\n',
  department_id: undefined,
  event_id: undefined,
  author_id: undefined,
  tags: [''],
  cover: undefined,
  caption_cover: '',
  other: undefined,
  caption_other1: '',
  caption_other2: '',
  caption_other3: '',
  caption_other4: '',
  attachment: undefined,
};

export const usersGetOptionParams: TUserParams = {
  page: 1,
  options: true,
  sort: 'created_at',
  type: 'desc',
  limit: 10,
};
