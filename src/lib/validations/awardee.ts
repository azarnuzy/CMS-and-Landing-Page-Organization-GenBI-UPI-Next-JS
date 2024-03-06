import { z } from 'zod';

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_MEDIA_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const ACCEPTED_MEDIA_TYPES_TRANSCRIPT = ['application/pdf'];

export const ValidationSchemaAddAwardeeForm = z.object({
  name: z
    .string({
      required_error: 'name should be filled',
    })
    .min(1, 'name  should be filled'),
  birth_date: z.date({
    required_error: 'birth_date should be filled',
  }),
  member_since: z.date({
    required_error: 'member_since should be filled',
  }),

  scholarship: z
    .number({
      required_error: 'scholarship should be filled',
    })
    .gte(1, 'scholarship  should be more than 1')
    .positive({
      message: 'scholarship should be positive',
    })
    .int(),
  year: z
    .number({
      required_error: 'year should be filled',
    })
    .gte(2015, 'year should be more than 2015')
    .positive({
      message: 'year should be positive',
    })
    .int(),
  nim: z
    .string({
      required_error: 'nim should be filled',
    })
    .min(1, 'nim  should be filled'),
  study_program: z
    .number({
      required_error: 'study_program should be filled',
    })
    .gte(1, 'study_program  should be filled'),
  linkedin_username: z
    .string({
      required_error: 'linkedin should be filled',
    })
    // .min(1, 'linkedin should be filled')
    .optional(),
  instagram_username: z
    .string({
      required_error: 'instagram should be filled',
    })
    // .min(1, 'instagram  should be filled')
    .optional(),
  telp: z
    .string({
      required_error: 'whatsapp should be filled',
    })
    // .min(1, 'whatsapp should be filled')
    .optional(),
  photo: z
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
  transcript: z
    .any()
    .refine(
      (files: File[]) => files !== undefined && files?.length >= 1,
      'Transcript should be uploaded.'
    )
    .refine(
      (files: File[]) =>
        ACCEPTED_MEDIA_TYPES_TRANSCRIPT.includes(files?.[0]?.type),
      'Accepts only .pdf'
    )
    .optional(),
  sem1_ip: z
    .string({
      required_error: 'IP should be filled',
    })
    .min(1, 'IP should be filled')
    .optional(),
  sem2_ip: z
    .string({
      required_error: 'IP should be filled',
    })
    .min(1, 'IP should be filled')
    .optional(),
  sem3_ip: z
    .string({
      required_error: 'IP should be filled',
    })
    .min(1, 'IP should be filled')
    .optional(),
  sem4_ip: z
    .string({
      required_error: 'IP should be filled',
    })
    .min(1, 'IP should be filled')
    .optional(),
  sem5_ip: z
    .string({
      required_error: 'IP should be filled',
    })
    .min(1, 'IP should be filled')
    .optional(),
  sem6_ip: z
    .string({
      required_error: 'IP should be filled',
    })
    .min(1, 'IP should be filled')
    .optional(),
  sem7_ip: z
    .string({
      required_error: 'IP should be filled',
    })
    .min(1, 'IP should be filled')
    .optional(),
  sem8_ip: z
    .string({
      required_error: 'IP should be filled',
    })
    .min(1, 'IP should be filled')
    .optional(),
  sem1_ipk: z
    .string({
      required_error: 'IPK should be filled',
    })
    .min(1, 'IPK should be filled')
    .optional(),
  sem2_ipk: z
    .string({
      required_error: 'IPK should be filled',
    })
    .min(1, 'IPK should be filled')
    .optional(),
  sem3_ipk: z
    .string({
      required_error: 'IPK should be filled',
    })
    .min(1, 'IPK should be filled')
    .optional(),
  sem4_ipk: z
    .string({
      required_error: 'IPK should be filled',
    })
    .min(1, 'IPK should be filled')
    .optional(),
  sem5_ipk: z
    .string({
      required_error: 'IPK should be filled',
    })
    .min(1, 'IPK should be filled')
    .optional(),
  sem6_ipk: z
    .string({
      required_error: 'IPK should be filled',
    })
    .min(1, 'IPK should be filled')
    .optional(),
  sem7_ipk: z
    .string({
      required_error: 'IPK should be filled',
    })
    .min(1, 'IPK should be filled')
    .optional(),
  sem8_ipk: z
    .string({
      required_error: 'IPK should be filled',
    })
    .min(1, 'IPK should be filled')
    .optional(),
});
