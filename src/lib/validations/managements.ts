import { z } from 'zod';

import {
  ACCEPTED_VIDEO_TYPES,
  MAX_FILE_SIZE,
  MAX_VIDEO_SIZE,
} from '@/lib/validations/constant';
import { ACCEPTED_MEDIA_TYPES } from '@/lib/validations/news';

export const ValidationSchemaAddManagementForm = z.object({
  name: z
    .string({
      required_error: 'Name should be filled',
    })
    .min(15, 'Name should be filled with minimum 15 character'),
  description: z
    .string({
      required_error: 'Description should be filled',
    })
    .min(50, 'Description should be filled with minimum 50 character'),
  vision: z
    .string({
      required_error: 'Vision should be filled',
    })
    .min(50, 'Vision should be filled with minimum 50 character'),
  missions: z
    .array(
      z.object({
        value: z
          .string({
            required_error: 'Mission should be filled',
          })
          .min(30, 'Mission should be filled with minimum 30 character'),
      })
    )
    .optional(),
  period_year: z
    .string({
      required_error: 'Period Year should be filled',
    })
    .min(1, 'Period Year should be filled with minimum 1 character'),
  period_start_date: z.date({
    required_error: 'Period Start Date should be filled',
  }),
  period_end_date: z.date({
    required_error: 'Period End Date should be filled',
  }),
  is_active: z.boolean({
    required_error: 'Is Active should be filled',
  }),
  photo: z
    .any()
    .refine(
      (files: File[]) => files !== undefined && files?.length >= 1,
      ' Photo should be uploaded.'
    )
    .refine((files: File[]) => {
      // console.log(files);
      return files !== undefined && files?.[0]?.size <= MAX_FILE_SIZE;
    }, 'Maximum file size is 3mb.')
    .refine(
      (files: File[]) => ACCEPTED_MEDIA_TYPES.includes(files?.[0]?.type),
      'Accepts only .jpg, .jpeg, .png, and .webp'
    ),
  video: z
    .any()
    .refine(
      (files: File[]) => files !== undefined && files?.length >= 1,
      'Video should be uploaded.'
    )
    .refine((files: File[]) => {
      // console.log(files);
      return files !== undefined && files?.[0]?.size <= MAX_VIDEO_SIZE;
    }, 'Maximum file size is 3mb.')
    .refine(
      (files: File[]) => ACCEPTED_VIDEO_TYPES.includes(files?.[0]?.type),
      'Accepts only .mp4, .webm, and .ogg'
    ),
});
