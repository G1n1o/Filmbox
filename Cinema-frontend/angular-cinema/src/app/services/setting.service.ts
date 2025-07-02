import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  private apiUrl = environment.filmboxApiUrl;

  constructor(private http: HttpClient) {}

  getTicketPrice(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/settings/ticket-price`);
  }

  setTicketPrice(value: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/settings/ticket-price`, {
      value,
    });
  }
}
