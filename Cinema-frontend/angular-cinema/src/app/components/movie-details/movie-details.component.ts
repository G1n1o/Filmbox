import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/common/movie';
import { MovieService } from 'src/app/services/movie.service';
import { Location } from '@angular/common';
import { Screening } from 'src/app/common/screening';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css',
})
export class MovieDetailsComponent {
  movie: Movie | undefined;
  screenings: Screening[] = [];

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleMovieDetails();
    });
  }

  getPosterFullUrl(posterUrl: string) {
    return environment.filmboxImage + posterUrl;
  }

  handleMovieDetails() {
    // get the "id" param string . convert string to a nmber using the "+" symbol

    const theMovieId: number = +this.route.snapshot.paramMap.get('id')!;

    this.movieService.getMovie(theMovieId).subscribe((data) => {
      this.movie = data;
    });

    this.movieService.getScreeningsByMovie(theMovieId).subscribe((data) => {
      this.screenings = data;
    });
  }

  goBack(): void {
    this.location.back();
  }

  onReserve(screeningId: number) {
    this.router.navigate(['/screenings', screeningId, 'reservation']);
  }
}
