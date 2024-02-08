import { z } from 'zod';

const MAX_FILE_SIZE = 3 * 1024 * 1024;
const ACCEPTED_MEDIA_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const ValidationSchemaAddNewsForm = z.object({
  title: z
    .string({
      required_error: 'Title should be filled',
    })
    .min(1, 'Title should be filled'),
  type: z
    .string({
      required_error: 'Type should be filled',
    })
    .min(1, 'Type should be filled'),
  department: z
    .string({
      required_error: 'Department should be filled',
    })
    .min(1, 'Department should be filled'),
  content: z
    .string({
      required_error: 'Content should be filled',
    })
    .min(1, 'Content should be filled'),
  hashtag: z
    .string({
      required_error: 'Hashtag should be filled',
    })
    .min(1, 'Hashtag should be filled'),
  thumbnail: z
    .any()
    .refine(
      (files: File[]) => files !== undefined && files?.length >= 1,
      'Thumbnail should be uploaded.'
    )
    .refine((files: File[]) => {
      // console.log(files);
      return files !== undefined && files?.[0]?.size <= MAX_FILE_SIZE;
    }, 'Maximum file size is 3mb.')
    .refine(
      (files: File[]) => ACCEPTED_MEDIA_TYPES.includes(files?.[0].type),
      'Accepts only .jpg, .jpeg, .png, and .webp'
    ),
  othersPhoto: z
    .any()
    .refine((files: File[]) => {
      // console.log(files);
      return files !== undefined && files?.[0]?.size <= MAX_FILE_SIZE;
    }, 'Ukuran maksimun adalah 3mb.')
    .refine(
      (files: File[]) => ACCEPTED_MEDIA_TYPES.includes(files?.[0].type),
      'hanya menerima .jpg, .jpeg, .png, dan .webp'
    ),
});
