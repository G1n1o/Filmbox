import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-admin-add-movie',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './admin-add-movie.component.html',
  styleUrl: './admin-add-movie.component.css',
})
export class AdminAddMovieComponent {
  movieForm: FormGroup;
  selectedFile: File | null = null;
  posterPreview: string | null = null;
  successMessage: string = '';
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private movieService: MovieService) {
    this.movieForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      duration: ['', Validators.required],
      releaseDate: ['', Validators.required],
    });
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.posterPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (!this.movieForm.valid || !this.selectedFile) return;

    const formData = new FormData();
    formData.append('title', this.movieForm.get('title')?.value);
    formData.append('description', this.movieForm.get('description')?.value);
    formData.append('duration', this.movieForm.get('duration')?.value);
    formData.append('releaseDate', this.movieForm.get('releaseDate')?.value);
    formData.append('poster', this.selectedFile);

     this.isLoading = true;

    this.movieService.addMovie(formData).subscribe({
      next: (res) => {
        this.successMessage = 'Film został dodany pomyślnie!';
        this.movieForm.reset();
        this.selectedFile = null;
        this.posterPreview = null;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Błąd przy dodawaniu filmu:', err);
        this.isLoading = false;
      },
    });
  }
}
