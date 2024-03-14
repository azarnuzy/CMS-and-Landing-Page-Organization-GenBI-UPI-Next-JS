import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_MEDIA_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const ValidationSchemaPutAppreciation = z.object({
  cover: z
    .any()
    .refine(
      (files: File[]) => files !== undefined && files?.length >= 1,
      'Profile Photo should be uploaded.'
    )
    .refine((files: File[]) => {
      // console.log(files);
      return files !== undefined && files?.[0]?.size <= MAX_FILE_SIZE;
    }, 'Maximum file size is 3mb.')
    .refine(
      (files: File[]) => ACCEPTED_MEDIA_TYPES.includes(files?.[0]?.type),
      'Accepts only .jpg, .jpeg, .png, and .webp'
    )
    .optional(),
  title: z
    .string({
      required_error: 'Title should be filled',
    })
    .min(15, 'Title should be filled with minimum 15 character'),
  given_date: z.date({
    required_error: 'birth_date should be filled',
  }),
  instagram_url: z.string({
    required_error: 'instagram_url should be filled',
  }),
  caption: z
    .string({
      required_error: 'Content should be filled with minimum 50 character',
    })
    .min(75, {
      message: 'Content should be filled with minimum 50 character',
    })
    .refine((value) => value.trim() !== '<p></p>', {
      message: 'Content should be filled with minimum 50 character',
    }),
});
export const ValidationSchemaAddAppreciation = z.object({
  cover: z
    .any()
    .refine(
      (files: File[]) => files !== undefined && files?.length >= 1,
      'Profile Photo should be uploaded.'
    )
    .refine((files: File[]) => {
      // console.log(files);
      return files !== undefined && files?.[0]?.size <= MAX_FILE_SIZE;
    }, 'Maximum file size is 3mb.')
    .refine(
      (files: File[]) => ACCEPTED_MEDIA_TYPES.includes(files?.[0]?.type),
      'Accepts only .jpg, .jpeg, .png, and .webp'
    ),
  title: z
    .string({
      required_error: 'Title should be filled',
    })
    .min(15, 'Title should be filled with minimum 15 character'),
  given_date: z.date({
    required_error: 'birth_date should be filled',
  }),
  instagram_url: z.string({
    required_error: 'instagram_url should be filled',
  }),
  caption: z
    .string({
      required_error: 'Content should be filled with minimum 50 character',
    })
    .min(75, {
      message: 'Content should be filled with minimum 50 character',
    })
    .refine((value) => value.trim() !== '<p></p>', {
      message: 'Content should be filled with minimum 50 character',
    }),
});
