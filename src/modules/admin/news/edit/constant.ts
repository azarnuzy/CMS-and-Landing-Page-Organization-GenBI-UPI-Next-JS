import { z } from 'zod';

import logger from '@/lib/logger';
import { ValidationSchemaAddNewsForm } from '@/lib/validations/news';

import { TPostDetailData } from '@/types/posts';
import { TPutFileData, TPutPostPayload } from '@/types/posts/crud';

export const breadcrumbEditNewsData = (id: string) => [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'News',
    link: '/admin/news',
  },
  {
    name: 'Edit News',
    link: `/admin/news/edit/${id}`,
  },
];

export const defaultValuesPutPost = (
  data: TPostDetailData
): TPutPostPayload & TPutFileData => {
  return {
    type: data?.post?.type || '',
    title: data?.post?.title || '',
    author_id: data?.post?.author.id || undefined,
    content: data?.post?.content || '<p></p>\n',
    department_id: data?.post?.department_id || undefined,
    event_id: data?.post?.event?.id || undefined,
    tags: data?.post?.tags.filter((_, index) => index > 1) || [],
    caption_cover: data?.post?.image_cover?.caption || '',
    caption_other1: data?.post?.images[0]?.caption || '',
    caption_other2: data?.post?.images[1]?.caption || '',
    caption_other3: data?.post?.images[2]?.caption || '',
    caption_other4: data?.post?.images[3]?.caption || '',
    cover: undefined,
    attachment: undefined,
    other: undefined,
  };
};

export const putPayloadPost = (
  data: z.infer<typeof ValidationSchemaAddNewsForm>
): TPutPostPayload => {
  return {
    title: data.title,
    type: data.type,
    department_id: data.department_id,
    author_id: data.author_id,
    event_id: data.event_id,
    content: data.content,
    tags: data.tags,
  };
};

export function createFormDataPutPostPayload({
  data,
  id,
}: {
  data: z.infer<typeof ValidationSchemaAddNewsForm>;
  id: number;
}): FormData {
  const formData = new FormData();
  logger(id);
  formData.append('cover', data.cover[0]);
  formData.append('caption_cover', data.caption_cover);

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
