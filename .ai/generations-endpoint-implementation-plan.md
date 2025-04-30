# API Endpoint Implementation Plan: POST /generations

## 1. Przegląd punktu końcowego
Endpoint `POST /generations` umożliwia zainicjowanie procesu generowania propozycji fiszek (flashcards) przy użyciu silnika AI. Użytkownik przekazuje tekst źródłowy, a system zwraca zestaw wygenerowanych pytań i odpowiedzi wraz z metadanymi generacji.

## 2. Szczegóły żądania
- Metoda HTTP: POST
- Ścieżka URL: `/api/generations`
- Nagłówki:
  - `Content-Type: application/json`
  - `Authorization: Bearer <token>` (wymagane)
- Parametry:
  - Wymagane:
    - `source_text` (string): tekst źródłowy o długości od 1000 do 10000 znaków
  - Opcjonalne: brak
- Request Body (JSON):
  ```json
  {
    "source_text": "..."
  }
  ```

## 3. Wykorzystywane typy
- `GenerateFlashcardsCommand` (z `src/types.ts`): model wejściowy
- `FlashcardProposalDto` (z `src/types.ts`): pojedyncza propozycja fiszki
- `GenerationCreateResponseDto` (z `src/types.ts`): format odpowiedzi na udaną generację
- Zod schema dla walidacji wejścia

## 4. Szczegóły odpowiedzi
- **201 Created** – generacja zakończona pomyślnie
  ```json
  {
    "generation_id": 123,
    "flashcards_proposals": [
      { "front": "Pytanie", "back": "Odpowiedź", "source": "ai-full" },
      ...
    ],
    "generated_count": 5
  }
  ```
- Błędy:
  - **400 Bad Request** – nieprawidłowe dane wejściowe (np. za krótki lub za długi `source_text`)
  - **401 Unauthorized** – brak lub nieważny token
  - **500 Internal Server Error** – błąd serwera lub AI; dodatkowo zapis w tabeli `generation_error_logs`

## 5. Przepływ danych
1. **Autoryzacja**: middleware weryfikuje JWT i inicjalizuje `supabase` w `context.locals`.
2. **Walidacja**: przy użyciu Zod schema sprawdzamy długość `source_text`.
3. **Biznesowa logika generacji** (w `src/lib/services/generation.service.ts`):
   - Oblicz hash źródła (`SHA-256` lub inny)
   - Zmierz długość tekstu
   - Wywołaj API AI (Openrouter/OpenAI)
   - Odbierz propozycje fiszek
   - Wstaw rekord do tabeli `generations`
   - Wstaw fiszki do tabeli `flashcards` z `generation_id`
4. **Odpowiedź**: zwróć `generation_id`, listę `FlashcardProposalDto` i `generated_count`

## 6. Względy bezpieczeństwa
- Uwierzytelnianie przez Supabase Auth (`context.locals.supabase`)
- Autoryzacja – tylko uwierzytelniony użytkownik może wywołać endpoint
- Limit długości i sanityzacja `source_text` (1000–10000 znaków)
- Ochrona przed nadmiernym obciążeniem (rate limiting)
- Zapis błędów AI w osobnej tabeli, bez wycieku szczegółów do klienta

## 7. Obsługa błędów
- **400**: Zod `formatErrors()`, brak danych lub złe typy
- **401**: brak kontekstu użytkownika lub nieważny token
- **500**: wszelkie wyjątki podczas wywołania AI lub operacji DB
  - Zapis w `generation_error_logs`
  - Logowanie w Sentry/Logflare

## 8. Rozważania dotyczące wydajności
- Asynchroniczne wywołanie AI i równoległe wstawianie fiszek
- Batch insert do `flashcards`
- Użycie transakcji DB do zachowania spójności
- Ograniczenie zbyt dużych żądań poprzez rate limiting i wstępne odrzucanie krótkich/dużych payloadów

## 9. Kroki implementacji
1. Utworzyć Zod schema `generateFlashcardsSchema` (w `src/lib/schemas/generation.schema.ts`)
2. Zaimplementować `GenerationService` w `src/lib/services/generation.service.ts`:
   - Metoda `generate(command: GenerateFlashcardsCommand, userId: string)`
3. Dodać trasę w `src/pages/api/generations.ts` (lub odpowiednim pliku Astro endpoint):
   - `export const POST`
   - Uwierzytelnienie z `context.locals.supabase`
   - Walidacja przez Zod
   - Wywołanie `GenerationService.generate` w try/catch
   - Zwrócenie odpowiedniego statusu i JSON
4. Stworzyć tabelę `generation_error_logs` poprzez migrations (jeśli brak)
7. Przeprowadzić code review i wdrożenie 