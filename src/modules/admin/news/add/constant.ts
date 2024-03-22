import { z } from 'zod';

import { ValidationSchemaAddNewsForm } from '@/lib/validations/news';

import { TAddPostPayload } from '@/types/posts/crud';
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

export function createFormData(
  data: z.infer<typeof ValidationSchemaAddNewsForm>
): FormData {
  const formData = new FormData();

  formData.append('title', data.title);
  formData.append('type', data.type);
  formData.append('department_id', String(data.department_id));
  formData.append('author_id', String(data.author_id));
  formData.append('content', data.content);
  formData.append('tags', JSON.stringify(data.tags));
  formData.append('cover', data.cover[0]);
  formData.append('caption_cover', data.caption_cover);
  formData.append('event_id', String(data.event_id));

  if (data.other) {
    data.other.forEach((file: File) => {
      formData.append('other', file);
    });
  }

  if (data.attachment) {
    data.attachment.forEach((file: File) => {
      formData.append('attachment', file);
    });
  }

  if (data.caption_other1) {
    formData.append('caption_other1', data.caption_other1);
  }

  if (data.caption_other2) {
    formData.append('caption_other2', data.caption_other2);
  }

  if (data.caption_other3) {
    formData.append('caption_other3', data.caption_other3);
  }

  if (data.caption_other4) {
    formData.append('caption_other4', data.caption_other4);
  }

  return formData;
}
