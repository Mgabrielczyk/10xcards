import type { APIContext } from 'astro';
import { GenerationService } from '../../lib/services/generation.service';
import { generateFlashcardsSchema } from '../../lib/schemas/generation.schema';

// Wyłączenie prerenderowania - endpoint dynamiczny
export const prerender = false;

export async function POST(context: APIContext) {
  const supabase = context.locals.supabase;
  
  // 1. Walidacja danych wejściowych
  let body;
  try {
    body = await context.request.json();
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Bad Request',
        message: 'Nieprawidłowy format JSON',
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
  
  const parseResult = generateFlashcardsSchema.safeParse(body);
  if (!parseResult.success) {
    const formattedErrors = parseResult.error.format();
    
    return new Response(
      JSON.stringify({
        error: 'Validation Error',
        errors: formattedErrors,
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
  
  const command = parseResult.data;
  
  // 2. Wywołanie logiki biznesowej
  try {
    const generationService = new GenerationService();
    const result = await generationService.generate(command, supabase);
    
    // 3. Zwrócenie odpowiedzi
    return new Response(
      JSON.stringify(result),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Błąd podczas generowania fiszek:', error);
    
    return new Response(
      JSON.stringify({
        error: 'Internal Server Error',
        message: 'Wystąpił błąd podczas generowania fiszek. Spróbuj ponownie później.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
} 