import { z } from 'zod';

export const ValidationSchemaAddCommentForm = z.object({
  name: z
    .string()

    .optional(),
  content: z
    .string({
      required_error: 'Komentar harus diisi',
    })
    .min(5, 'Komentar minimal 5 karakter'),
});
