import { z } from 'zod';

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
