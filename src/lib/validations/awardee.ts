import { z } from 'zod';

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_MEDIA_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const ValidationSchemaAddAwardeeForm = z.object({
  full_name: z
    .string({
      required_error: 'full_name should be filled',
    })
    .min(1, 'full_name  should be filled'),
  birth_date: z.date({
    required_error: 'birth_date should be filled',
  }),
  member_since: z.date({
    required_error: 'member_since should be filled',
  }),

  total_scholarship: z
    .number({
      required_error: 'total_scholarship should be filled',
    })
    .gte(1, 'total_scholarship  should be more than 1')
    .positive({
      message: 'total_scholarship should be positive',
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
    .string({
      required_error: 'study_program should be filled',
    })
    .min(1, 'study_program  should be filled'),
  linkedin: z
    .string({
      required_error: 'linkedin should be filled',
    })
    // .min(1, 'linkedin should be filled')
    .optional(),
  instagram: z
    .string({
      required_error: 'instagram should be filled',
    })
    // .min(1, 'instagram  should be filled')
    .optional(),
  whatsapp: z
    .string({
      required_error: 'whatsapp should be filled',
    })
    // .min(1, 'whatsapp should be filled')
    .optional(),
  profile_photo: z
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
    .optional(),
  ip1: z
    .string({
      required_error: 'IP should be filled',
    })
    .min(1, 'IP should be filled')
    .optional(),
  ip2: z
    .string({
      required_error: 'IP should be filled',
    })
    .min(1, 'IP should be filled')
    .optional(),
  ip3: z
    .string({
      required_error: 'IP should be filled',
    })
    .min(1, 'IP should be filled')
    .optional(),
  ip4: z
    .string({
      required_error: 'IP should be filled',
    })
    .min(1, 'IP should be filled')
    .optional(),
  ip5: z
    .string({
      required_error: 'IP should be filled',
    })
    .min(1, 'IP should be filled')
    .optional(),
  ip6: z
    .string({
      required_error: 'IP should be filled',
    })
    .min(1, 'IP should be filled')
    .optional(),
  ip7: z
    .string({
      required_error: 'IP should be filled',
    })
    .min(1, 'IP should be filled')
    .optional(),
  ip8: z
    .string({
      required_error: 'IP should be filled',
    })
    .min(1, 'IP should be filled')
    .optional(),
});
