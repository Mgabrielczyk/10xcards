import { createHash } from 'crypto';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { 
  FlashcardProposalDto, 
  GenerateFlashcardsCommand, 
  GenerationCreateResponseDto 
} from '../../types';
import { DEFAULT_USER_ID } from '../../db/supabase.client';
import type { Database } from '../../db/database.types';

export class GenerationService {
  async generate(
    command: GenerateFlashcardsCommand,
    supabase: SupabaseClient<Database>
  ): Promise<GenerationCreateResponseDto> {
    try {
      // 1. Obliczenie hasha tekstu źródłowego (MD5)
      const sourceTextHash = this.createSourceTextHash(command.source_text);
      const sourceTextLength = command.source_text.length;
      
      // 2. Wywołanie AI do generowania fiszek
      const startTime = Date.now();
      const flashcardsProposals = await this.callAiService(command.source_text);
      const generationDuration = Date.now() - startTime;
      
      // 3. Zapis metadanych generacji w bazie danych
      const { data: generationData, error: generationError } = await supabase
        .from('generations')
        .insert({
          user_id: DEFAULT_USER_ID,
          model: 'gpt-4',
          generated_count: flashcardsProposals.length,
          source_text_hash: sourceTextHash,
          source_text_length: sourceTextLength,
          generation_duration: generationDuration,
        })
        .select('id')
        .single();
        
      if (generationError) {
        throw new Error(`Błąd podczas zapisywania generacji: ${generationError.message}`);
      }
      
      const generationId = generationData.id;
      
      // 4. Zapis propozycji fiszek w bazie danych
      const flashcardsToInsert = flashcardsProposals.map(proposal => ({
        front: proposal.front,
        back: proposal.back,
        source: proposal.source,
        generation_id: generationId,
        user_id: DEFAULT_USER_ID
      }));
      
      const { error: flashcardsError } = await supabase
        .from('flashcards')
        .insert(flashcardsToInsert);
        
      if (flashcardsError) {
        throw new Error(`Błąd podczas zapisywania fiszek: ${flashcardsError.message}`);
      }
      
      // 5. Zwrócenie rezultatu
      return {
        generation_id: generationId,
        flashcards_proposals: flashcardsProposals,
        generated_count: flashcardsProposals.length
      };
    } catch (error) {
      // Zapisz błąd w tabeli generation_error_logs
      await this.logGenerationError(
        error,
        command.source_text,
        supabase
      );
      throw error;
    }
  }
  
  private createSourceTextHash(sourceText: string): string {
    return createHash('md5').update(sourceText).digest('hex');
  }
  
  private async callAiService(sourceText: string): Promise<FlashcardProposalDto[]> {
    // Implementacja wywołania API AI (OpenAI/OpenRouter)
    // Docelowo powinna być tu prawdziwa implementacja, na razie mock
    return [
      {
        front: "Co to jest React?",
        back: "React to biblioteka JavaScript do budowania interfejsów użytkownika stworzona przez Facebooka.",
        source: "ai-full"
      },
      {
        front: "Czym jest wirtualny DOM w React?",
        back: "Wirtualny DOM to lekka kopia rzeczywistego DOM, która pozwala Reactowi na optymalizację renderowania.",
        source: "ai-full" 
      }
    ];
  }
  
  private async logGenerationError(
    error: any,
    sourceText: string,
    supabase: SupabaseClient<Database>
  ): Promise<void> {
    const sourceTextHash = this.createSourceTextHash(sourceText);
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    await supabase
      .from('generation_error_logs')
      .insert({
        user_id: DEFAULT_USER_ID,
        error_code: error.code || 'UNKNOWN_ERROR',
        error_message: errorMessage,
        model: 'gpt-4',
        source_text_hash: sourceTextHash,
        source_text_length: sourceText.length,
      });
  }
} 