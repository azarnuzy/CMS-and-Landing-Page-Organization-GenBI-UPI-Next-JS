import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
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
    .string({
      required_error: 'year should be filled',
    })
    .refine((year) => {
      const yearNum = parseInt(year);
      return yearNum >= 2010 && yearNum <= new Date().getFullYear();
    }),
  nim: z
    .string({
      required_error: 'nim should be filled',
    })
    .min(1, 'nim  should be filled'),
  study_program_id: z
    .number({
      required_error: 'study_program should be filled',
    })
    .gte(1, 'study_program  should be filled'),
  linkedin_username: z
    .string({
      required_error: 'linkedin should be filled',
    })
    .min(1, 'linkedin should be filled'),

  instagram_username: z
    .string({
      required_error: 'instagram should be filled',
    })
    .min(1, 'instagram  should be filled'),

  telp: z
    .string({
      required_error: 'whatsapp should be filled',
    })
    .min(1, 'whatsapp should be filled'),

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
    ),
  smt1_ip: z
    .number({
      required_error: 'IP should be filled',
    })
    .gte(1, 'IP should be more than 1'),
  smt2_ip: z
    .number({
      required_error: 'IP should be filled',
    })
    .gte(1, 'IP should be more than 1'),
  smt3_ip: z
    .number({
      required_error: 'IP should be filled',
    })
    .gte(1, 'IP should be more than 1'),
  smt4_ip: z
    .number({
      required_error: 'IP should be filled',
    })
    .optional(),
  smt5_ip: z
    .number({
      required_error: 'IP should be filled',
    })
    .optional(),
  smt6_ip: z
    .number({
      required_error: 'IP should be filled',
    })
    .optional(),
  smt7_ip: z
    .number({
      required_error: 'IP should be filled',
    })
    .optional(),
  smt8_ip: z
    .number({
      required_error: 'IP should be filled',
    })
    .optional(),
  smt1_ipk: z
    .number({
      required_error: 'IPK should be filled',
    })
    .gte(1, 'IPK should be more than 1'),
  smt2_ipk: z
    .number({
      required_error: 'IPK should be filled',
    })
    .gte(1, 'IPK should be more than 1'),
  smt3_ipk: z
    .number({
      required_error: 'IPK should be filled',
    })
    .gte(1, 'IPK should be more than 1'),
  smt4_ipk: z
    .number({
      required_error: 'IPK should be filled',
    })
    .optional(),
  smt5_ipk: z
    .number({
      required_error: 'IPK should be filled',
    })
    .optional(),
  smt6_ipk: z
    .number({
      required_error: 'IPK should be filled',
    })
    .optional(),
  smt7_ipk: z
    .number({
      required_error: 'IPK should be filled',
    })
    .optional(),
  smt8_ipk: z
    .number({
      required_error: 'IPK should be filled',
    })
    .optional(),
});
export const ValidationSchemaPutAwardeeForm = z.object({
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

  scholarship: z.string({
    required_error: 'scholarship should be filled',
  }),
  year: z
    .string({
      required_error: 'year should be filled',
    })
    .refine((year) => {
      const yearNum = parseInt(year);
      return yearNum >= 2010 && yearNum <= new Date().getFullYear();
    }),
  nim: z
    .string({
      required_error: 'nim should be filled',
    })
    .min(1, 'nim  should be filled'),
  study_program_id: z
    .number({
      required_error: 'study_program should be filled',
    })
    .gte(1, 'study_program  should be filled'),
  linkedin_username: z
    .string({
      required_error: 'linkedin should be filled',
    })
    .min(1, 'linkedin should be filled'),

  instagram_username: z
    .string({
      required_error: 'instagram should be filled',
    })
    .min(1, 'instagram  should be filled'),

  telp: z
    .string({
      required_error: 'whatsapp should be filled',
    })
    .min(1, 'whatsapp should be filled'),

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
    )
    .optional(),
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
  smt1_ip: z
    .number({
      required_error: 'IP should be filled',
    })
    .gte(1, 'IP should be more than 1'),
  smt2_ip: z
    .number({
      required_error: 'IP should be filled',
    })
    .gte(1, 'IP should be more than 1'),
  smt3_ip: z
    .number({
      required_error: 'IP should be filled',
    })
    .gte(1, 'IP should be more than 1'),
  smt4_ip: z
    .number({
      required_error: 'IP should be filled',
    })
    .optional(),
  smt5_ip: z
    .number({
      required_error: 'IP should be filled',
    })
    .optional(),
  smt6_ip: z
    .number({
      required_error: 'IP should be filled',
    })
    .optional(),
  smt7_ip: z
    .number({
      required_error: 'IP should be filled',
    })
    .optional(),
  smt8_ip: z
    .number({
      required_error: 'IP should be filled',
    })
    .optional(),
  smt1_ipk: z
    .number({
      required_error: 'IPK should be filled',
    })
    .gte(1, 'IPK should be more than 1'),
  smt2_ipk: z
    .number({
      required_error: 'IPK should be filled',
    })
    .gte(1, 'IPK should be more than 1'),
  smt3_ipk: z
    .number({
      required_error: 'IPK should be filled',
    })
    .gte(1, 'IPK should be more than 1'),
  smt4_ipk: z
    .number({
      required_error: 'IPK should be filled',
    })
    .optional(),
  smt5_ipk: z
    .number({
      required_error: 'IPK should be filled',
    })
    .optional(),
  smt6_ipk: z
    .number({
      required_error: 'IPK should be filled',
    })
    .optional(),
  smt7_ipk: z
    .number({
      required_error: 'IPK should be filled',
    })
    .optional(),
  smt8_ipk: z
    .number({
      required_error: 'IPK should be filled',
    })
    .optional(),
});
