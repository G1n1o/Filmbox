import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class OpenAiService {
  private apiUrl = 'https://api.openai.com/v1/chat/completions';
  private apiKey = environment.openAiApiKey

  constructor(private http: HttpClient) {}

  askChatGPT(prompt: string): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    });

    const body = {
      model: 'gpt-4o-mini', // lub inny dostępny model
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 300,
    };

    return this.http.post<any>(this.apiUrl, body, { headers }).pipe(
      map((res) => res.choices[0].message.content)
    );
  }
}