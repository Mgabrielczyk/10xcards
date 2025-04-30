import { z } from 'zod';
import type { GenerateFlashcardsCommand } from '../../types';

export const generateFlashcardsSchema = z.object({
  source_text: z
    .string()
    .min(1000, 'Tekst źródłowy musi mieć co najmniej 1000 znaków')
    .max(10000, 'Tekst źródłowy nie może przekraczać 10000 znaków'),
}) satisfies z.ZodType<GenerateFlashcardsCommand>; 