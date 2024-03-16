import { z } from 'zod';

export const ValidationSchemaAddDivisionForm = z.object({
  name: z
    .string({
      required_error: 'Name should be filled',
    })
    .min(5, {
      message: 'Name should be filled with minimum 5 character',
    }),
  description: z
    .string({
      required_error: 'Description should be filled with minimum 25 character',
    })
    .min(30, 'Description should be filled with minimum 25 character'),
});
