import { z } from 'zod';

export const ValidationSchemaAddProgramForm = z.object({
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
  type: z
    .string({
      required_error: 'Type should be filled',
    })
    .min(5, 'Type should be filled with minimum 5 character'),
  implementation_desc: z
    .string({
      required_error: 'Implementation Description should be filled',
    })
    .min(
      5,
      'Implementation Description should be filled with minimum 5 character'
    ),
  date_start: z.date({
    required_error: 'Start Date should be filled',
  }),
  date_end: z.date({
    required_error: 'End Date should be filled',
  }),
});
