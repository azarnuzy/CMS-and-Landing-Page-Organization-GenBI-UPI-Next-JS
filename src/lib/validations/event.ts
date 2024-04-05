import { z } from 'zod';

const MAX_FILE_SIZE = 3 * 1024 * 1024;
export const ACCEPTED_MEDIA_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const ValidationSchemaRegistrationEventForm = z.object({
  name: z
    .string({
      required_error: 'Name should be filled',
    })
    .min(1, 'Name should be filled'),
  email: z
    .string({
      required_error: 'Email should be filled',
    })
    .email('Invalid email format'),
  institution: z
    .string({
      required_error: 'Institution should be filled',
    })
    .min(1, 'Institution should be filled'),
  role: z
    .string({
      required_error: 'Role should be filled',
    })
    .min(1, 'Role should be filled'),
  field: z
    .string({
      required_error: 'Field should be filled',
    })
    .min(1, 'Field should be filled'),
  telp: z
    .string({
      required_error: 'Phone Number should be filled',
    })
    .min(1, 'Phone Number should be filled'),
  city: z
    .string({
      required_error: 'City should be filled',
    })
    .min(1, 'City should be filled'),
});

export const ValidationSchemaAddEventForm = z.object({
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
      (files: File[]) => ACCEPTED_MEDIA_TYPES.includes(files?.[0]?.type),
      'Accepts only .jpg, .jpeg, .png, and .webp'
    ),

  poster: z
    .any()
    .refine(
      (files: File[]) => files !== undefined && files?.length >= 1,
      'Poster should be uploaded.'
    )
    .refine((files: File[]) => {
      // console.log(files);
      return files !== undefined && files?.[0]?.size <= MAX_FILE_SIZE;
    }, 'Maximum file size is 3mb.')
    .refine(
      (files: File[]) => ACCEPTED_MEDIA_TYPES.includes(files?.[0]?.type),
      'Accepts only .jpg, .jpeg, .png, and .webp'
    ),

  banner: z
    .any()
    .refine(
      (files: File[]) => files !== undefined && files?.length >= 1,
      'Banner should be uploaded.'
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
    .min(10, 'Title should be filled with minimum 10 character'),
  type: z
    .string({
      required_error: 'Type should be filled',
    })
    .min(1, 'Type should be filled'),
  program_id: z
    .number({
      required_error: 'Department should be filled',
    })
    .optional(),
  description: z
    .string({
      required_error: 'Description should be filled with minimum 10 character',
    })
    .min(200, {
      message: 'Description should be filled with minimum 150 character',
    }),
  start_date: z.date({
    required_error: 'Start Date should be filled',
  }),
  end_date: z
    .date({
      required_error: 'End Date should be filled',
    })
    .optional(),
  location: z
    .string({
      required_error: 'Location should be filled',
    })
    .min(5, 'Location should be filled with minimum 5 character'),
  location_url: z
    .string({
      required_error: 'Location URL should be filled',
    })
    .url('Invalid URL format')
    .optional(),
  registration_link: z
    .string({
      required_error: 'Registration Link should be filled',
    })
    .url('Invalid URL format')
    .optional(),
  start_reg_date: z.date({
    required_error: 'Start Registration Date should be filled',
  }),
  end_reg_date: z.date({
    required_error: 'End Registration Date should be filled',
  }),
  contact: z
    .string({
      required_error: 'Contact should be filled',
    })
    .min(5, 'Contact should be filled with minimum 5 character'),
  tags: z
    .array(
      z.string({
        required_error: 'Tags should be filled',
      })
    )
    .max(4, 'Maximum tags is 4'),
  //
  scope: z.string({
    required_error: 'Scope should be filled',
  }),
});

export const ValidationSchemaPutEventForm = z.object({
  thumbnail: z.any().optional(),
  poster: z.any().optional(),
  banner: z.any().optional(),
  title: z
    .string({
      required_error: 'Title should be filled',
    })
    .min(10, 'Title should be filled with minimum 10 character'),
  type: z
    .string({
      required_error: 'Type should be filled',
    })
    .min(1, 'Type should be filled'),
  program_id: z
    .number({
      required_error: 'Department should be filled',
    })
    .optional(),
  description: z
    .string({
      required_error: 'Description should be filled with minimum 10 character',
    })
    .min(200, {
      message: 'Description should be filled with minimum 200 character',
    }),
  start_date: z.date({
    required_error: 'Start Date should be filled',
  }),
  end_date: z
    .date({
      required_error: 'End Date should be filled',
    })
    .optional(),
  location: z
    .string({
      required_error: 'Location should be filled',
    })
    .min(5, 'Location should be filled with minimum 5 character')
    .optional(),
  location_url: z
    .string({
      required_error: 'Location URL should be filled',
    })
    .optional(),
  registration_link: z
    .string({
      required_error: 'Registration Link should be filled',
    })
    .optional(),
  start_reg_date: z.date({
    required_error: 'Start Registration Date should be filled',
  }),
  end_reg_date: z
    .date({
      required_error: 'End Registration Date should be filled',
    })
    .optional(),
  contact: z
    .string({
      required_error: 'Contact should be filled',
    })
    .min(5, 'Contact should be filled with minimum 5 character'),
  tags: z
    .array(
      z.string({
        required_error: 'Tags should be filled',
      })
    )
    .max(4, 'Maximum tags is 4')
    .optional(),
  //
  scope: z.string({
    required_error: 'Scope should be filled',
  }),
});
