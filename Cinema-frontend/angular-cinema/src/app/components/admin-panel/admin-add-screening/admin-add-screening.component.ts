import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ScreeningService } from '../../../services/screening.service';
import { MovieService } from '../../../services/movie.service';
import { CinemaHallService } from '../../../services/cinema-hall.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-add-screening',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './admin-add-screening.component.html',
  styleUrls: ['./admin-add-screening.component.css'],
})
export class AdminAddScreeningComponent {
  private fb = inject(FormBuilder);
  private movieService = inject(MovieService);
  private cinemaHallService = inject(CinemaHallService);
  private screeningService = inject(ScreeningService);

  screeningForm: FormGroup = this.fb.group({
    movieId: ['', Validators.required],
    cinemaHallId: ['', Validators.required],
    screeningTime: ['', Validators.required],
  });

  movies: any[] = [];
  cinemaHalls: any[] = [];
  successMessage = '';
  errorMessage = '';
  isLoading = false;

  ngOnInit(): void {
    this.movieService.getMovies().subscribe({
      next: (data) => (this.movies = data),
      error: () => (this.errorMessage = 'Błąd przy ładowaniu filmów.'),
    });

    this.cinemaHallService.getAllHalls().subscribe({
      next: (data) => (this.cinemaHalls = data),
      error: () => (this.errorMessage = 'Błąd przy ładowaniu sal kinowych.'),
    });
  }

  onSubmit(): void {
    if (this.screeningForm.invalid) return;

    const { movieId, cinemaHallId, screeningTime } = this.screeningForm.value;

    const payload = {
      movieId: Number(movieId),
      cinemaHallId: Number(cinemaHallId),
      screeningTime,
    };

    console.log('Wysyłane dane do backendu:', payload);

    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.screeningService.addScreening(payload).subscribe({
      next: () => {
        this.successMessage = 'Seans dodany pomyślnie!';
        this.screeningForm.reset();
        this.isLoading = false;
      },
      error: (err) => {

        this.errorMessage = 'Nie udało się dodać seansu.';
        this.isLoading = false;
      },
    });
  }
}
