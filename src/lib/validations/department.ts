import { z } from 'zod';

const MAX_FILE_SIZE = 3 * 1024 * 1024;
const ACCEPTED_MEDIA_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const ValidationSchemaAddDepartmentForm = z.object({
  name: z
    .string({
      required_error: 'Department Name should be filled',
    })
    .min(1, 'Department Name should be filled'),
  description: z
    .string({
      required_error: 'Description should be filled with minimum 5 character',
    })
    .min(30, {
      message: 'Description should be filled with minimum 5 character',
    })
    .refine((value) => value.trim() !== '<p></p>', {
      message: 'Description should be filled with minimum 5 character',
    }),
  management_id: z.number().int().positive(),
  cover: z
    .any()
    .refine(
      (files: File[]) => files !== undefined && files?.length >= 1,
      'Cover should be uploaded.'
    )
    .refine((files: File[]) => {
      // console.log(files);
      return files !== undefined && files?.[0]?.size <= MAX_FILE_SIZE;
    }, 'Maximum file size is 3mb.')
    .refine(
      (files: File[]) => ACCEPTED_MEDIA_TYPES.includes(files?.[0]?.type),
      'Accepts only .jpg, .jpeg, .png, and .webp'
    ),
});
