import { z } from 'zod';

export const ValidationSchemaSuggestionForm = z.object({
  name: z.string({
    required_error: 'Nama harus diisi',
  }),
  email: z.string({
    required_error: 'Email harus diisi',
  }),
  question: z.string({
    required_error: 'Pertanyaan harus diisi',
  }),
});
