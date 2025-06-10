import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../common/movie';
import { Screening } from '../common/screening';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
 
  private apiUrl = environment.filmboxApiUrl + '/movies';

  constructor(private http: HttpClient) {}

  getMovie(theMovieId: number): Observable<Movie> {
  

      const movieUrl = `${this.apiUrl}/${theMovieId}`
      return this.http.get<Movie>(movieUrl);
  }

  getMovies(): Observable<Movie[]> {
    
    return this.http.get<Movie[]>(this.apiUrl);
  }

  searchMovies(theKeyword: string): Observable<Movie[]> {
    

    const searchUrl = `${this.apiUrl}?search=${theKeyword}`;
     return this.http.get<Movie[]>(searchUrl);
  }

  getScreeningsByMovie(theMovieId:number):Observable<Screening[]> {

    const screeningUrl = `${this.apiUrl}/${theMovieId}/screenings`;
    return this.http.get<Screening[]>(screeningUrl);
  }

 

}
