import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Screening } from '../common/screening';
import { HttpClient } from '@angular/common/http';
import { CinemaHall } from '../common/cinema-hall';
import { ReservedSeat } from '../common/reserved-seat';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ScreeningService {
  private baseUrl = environment.filmboxApiUrl;

  constructor(private http: HttpClient) {}

  getAllScreenings(): Observable<Screening[]> {
    return this.http.get<Screening[]>(`${this.baseUrl}/screenings`);
  }

    getScreeningById(screeningId: number): Observable<Screening> {
    return this.http.get<Screening>(
      `${this.baseUrl}/screenings/${screeningId}`
    );
  }

  getReservedSeats(screeningId: number): Observable<ReservedSeat[]> {
    return this.http.get<ReservedSeat[]>(
      `${this.baseUrl}/reservations/${screeningId}`
    );
  }


}
