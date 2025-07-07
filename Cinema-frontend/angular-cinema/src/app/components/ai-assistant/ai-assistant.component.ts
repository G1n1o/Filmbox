import { Component, inject } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { OpenAiService } from 'src/app/services/openai.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ai-assistant',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-assistant.component.html',
  styleUrls: ['./ai-assistant.component.css'],
})
export class AiAssistantComponent {
  movieService = inject(MovieService);
  openAiService = inject(OpenAiService);

  userInput = '';
  aiResponse = '';
  loading = false;
  isError = false;

  get aiResponseHtml() {
    // Prosta konwersja nowej linii na <br>, żeby ładniej wyglądało
    return this.aiResponse.replace(/\n/g, '<br/>');
  }

  askAi() {
    if (!this.userInput.trim()) return;

    this.loading = true;
    this.aiResponse = '';
    this.isError = false;

    this.movieService.getMovies().subscribe({
      next: (movies) => {
        const movieListText = movies
          .map(
            (m, i) =>
              `${i + 1}. "${m.title}" (${new Date(
                m.releaseDate
              ).getFullYear()}): ${m.description}`
          )
          .join('\n');

        const prompt = `Użytkownik napisał: "${this.userInput}"

Lista filmów:
${movieListText}

Jeśli użytkownik pyta o konkretny film, opowiedz o nim na podstawie listy.
Jeśli użytkownik prosi o rekomendacje, zaproponuj do 3 filmów z listy i uzasadnij wybór.
`;

        this.openAiService.askChatGPT(prompt).subscribe({
          next: (response) => {
            this.aiResponse = response;
            this.loading = false;
            this.isError = false;
          },
          error: (err) => {
            console.error('Błąd z OpenAI:', err); 
            if (err.status === 429) {
              this.aiResponse =
                'Przekroczono limit zapytań do AI. Spróbuj ponownie za kilka minut.';
            } else {
              this.aiResponse =
                'Wystąpił błąd: ' + (err.message || JSON.stringify(err));
            }
            this.loading = false;
            this.isError = true;
          },
        });
      },
      error: (err) => {
        this.aiResponse = 'Błąd pobierania filmów: ' + err.message;
        this.loading = false;
        this.isError = true;
      },
    });
  }
}
