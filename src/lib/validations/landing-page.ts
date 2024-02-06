import { z } from 'zod';

export const ValidationSchemaSuggestionForm = z.object({
  name: z
    .string({
      required_error: 'Nama harus diisi',
    })
    .min(1, 'Nama harus diisi'),
  email: z
    .string({
      required_error: 'Email harus diisi',
    })
    .min(1, 'Email harus diisi'),
  message: z
    .string({
      required_error: 'Pertanyaan harus diisi',
    })
    .min(1, 'Pertanyaan harus diisi'),
});
