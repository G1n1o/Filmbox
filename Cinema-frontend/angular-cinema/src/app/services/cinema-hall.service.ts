import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CinemaHallService {
  private apiUrl = environment.filmboxApiUrl + '/cinema-halls';

  constructor(private http: HttpClient) {}

  getAllHalls(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}