import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/common/movie';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment.development';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-edit-movie',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './admin-edit-movie.component.html',
  styleUrls: ['./admin-edit-movie.component.css'],
})
export class AdminEditMovieComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  movies: Movie[] = [];
  selectedMovie: Movie | null = null;
  movieForm: FormGroup;
  selectedFile: File | null = null;
  posterPreview: string | null = null;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private movieService: MovieService,
    private faLibrary: FaIconLibrary
  ) {
    this.faLibrary.addIcons(faTrash);
    this.movieForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.maxLength(500)],
      duration: ['', [Validators.required, Validators.min(1)]],
      releaseDate: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies() {
    this.movieService.getMovies().subscribe((data) => {
      this.movies = data;
    });
  }

  onEditMovie(movie: Movie) {
    this.selectedMovie = movie;
    this.movieForm.patchValue({
      title: movie.title,
      description: movie.description,
      duration: movie.duration,
      releaseDate: movie.releaseDate,
    });
    this.posterPreview = this.getPosterFullUrl(movie.posterUrl);
    this.selectedFile = null;
    this.successMessage = '';
  }

  onDeleteMovie(id: number) {
    if (confirm('Czy na pewno chcesz usunąć ten film?')) {
      this.movieService.deleteMovie(id).subscribe({
        next: () => {
          alert('Film usunięty');
          this.loadMovies();
          if (this.selectedMovie && this.selectedMovie.id === id) {
            this.selectedMovie = null;
            this.posterPreview = null;
            this.movieForm.reset();
          }
        },
        error: (err) => {
          alert('Błąd podczas usuwania filmu');
          console.error(err);
        },
      });
    }
  }

  getPosterFullUrl(posterUrl: string) {
    return environment.filmboxImage + posterUrl;
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => (this.posterPreview = reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    this.errorMessage = '';

    if (!this.movieForm.valid || !this.selectedMovie) return;

    const formData = new FormData();
    formData.append('title', this.movieForm.get('title')?.value);
    formData.append('description', this.movieForm.get('description')?.value);
    formData.append('duration', this.movieForm.get('duration')?.value);
    formData.append('releaseDate', this.movieForm.get('releaseDate')?.value);

    if (this.selectedFile) {
      formData.append('poster', this.selectedFile);
    }

    this.movieService.updateMovie(this.selectedMovie.id!, formData).subscribe({
      next: () => {
        this.successMessage = 'Film został zaktualizowany!';
        this.movieForm.reset();
        this.selectedFile = null;
        this.posterPreview = null;
        this.selectedMovie = null;
        this.loadMovies();

        if (this.fileInput) {
          this.fileInput.nativeElement.value = '';
        }
      },
      error: (err) => {
        console.error('Błąd aktualizacji filmu:', err);
        this.errorMessage =
          'Wystąpił błąd przy aktualizacji filmu. Sprawdź dane i spróbuj ponownie.';
      },
    });
  }
}
