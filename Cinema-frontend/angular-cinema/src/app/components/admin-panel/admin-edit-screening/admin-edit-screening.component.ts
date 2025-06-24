import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { CinemaHall } from 'src/app/common/cinema-hall';
import { Movie } from 'src/app/common/movie';
import { Screening } from 'src/app/common/screening';
import { CinemaHallService } from 'src/app/services/cinema-hall.service';
import { MovieService } from 'src/app/services/movie.service';
import { ScreeningService } from 'src/app/services/screening.service';

@Component({
  selector: 'app-edit-delete-screening',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './admin-edit-screening.component.html',
  styleUrl: './admin-edit-screening.component.css',
})
export class AdminEditScreeningComponent implements OnInit {
  screenings: Screening[] = [];
  selectedScreening: Screening | null = null;
  screeningForm: FormGroup;
  movies: Movie[] = [];
  cinemaHalls: CinemaHall[] = [];
  successMessage = '';
  errorMessage = '';

  constructor(
    private faLibrary: FaIconLibrary,
    private fb: FormBuilder,
    private screeningService: ScreeningService,
    private movieService: MovieService,
    private hallService: CinemaHallService
  ) {
    this.faLibrary.addIcons(faTrash);
    this.screeningForm = this.fb.group({
      movieId: ['', Validators.required],
      cinemaHallId: ['', Validators.required],
      screeningTime: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadScreenings();
    this.movieService.getMovies().subscribe((data) => (this.movies = data));
    this.hallService
      .getAllHalls()
      .subscribe((data) => (this.cinemaHalls = data));
  }

  loadScreenings() {
    this.screeningService.getAllScreenings().subscribe((data) => {
      this.screenings = data;
    });
  }
  onEditScreening(screening: Screening) {
    this.selectedScreening = screening;
    this.screeningForm.patchValue({
      movieId: screening.movie.id,
      cinemaHallId: screening.cinemaHall.id,
      screeningTime: screening.screeningTime,
    });
    this.successMessage = '';
    this.errorMessage = '';
  }

  onDeleteScreening(id: number) {
    if (confirm('Czy na pewno chcesz usunąć ten seans?')) {
      this.screeningService.deleteScreening(id).subscribe({
        next: () => {
          this.loadScreenings();
          if (this.selectedScreening?.id === id) {
            this.selectedScreening = null;
            this.screeningForm.reset();
          }
        },
        error: (err) => {
          alert('Błąd podczas usuwania seansu');
          console.error(err);
        },
      });
    }
  }

  onSubmit() {
    if (!this.screeningForm.valid || !this.selectedScreening) return;

    const payload = {
      movieId: this.screeningForm.get('movieId')?.value,
      cinemaHallId: this.screeningForm.get('cinemaHallId')?.value,
      screeningTime: this.screeningForm.get('screeningTime')?.value,
    };
    console.log('payload: ', payload);

    this.screeningService
      .updateScreening(this.selectedScreening.id, payload)
      .subscribe({
        next: () => {
          this.successMessage = 'Seans został zaktualizowany!';
          this.loadScreenings();
          this.screeningForm.reset();
          this.selectedScreening = null;
        },
        error: (err) => {
          this.errorMessage = 'Wystąpił błąd przy aktualizacji seansu.';
          console.error(err);
        },
      });
  }
}
