import { z } from 'zod';

export const ValidationSchemaLoginForm = z.object({
  username: z
    .string({
      required_error: 'Username should be filled',
    })
    .min(1, 'Username should be filled'),
  password: z
    .string({
      required_error: 'Password should be filled',
    })
    .min(1, 'Password should be filled'),
});
