import { z } from 'zod';

export const ValidationSchemaAddDivisionForm = z.object({
  name: z.string(),

  description: z
    .string({
      required_error: 'Description should be filled with minimum 25 character',
    })
    .min(30, 'Description should be filled with minimum 25 character'),
});
