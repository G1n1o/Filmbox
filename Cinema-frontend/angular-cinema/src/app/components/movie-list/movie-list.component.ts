import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/common/movie';
import { MovieService } from 'src/app/services/movie.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit, AfterViewInit {
  movies: Movie[] = [];
  searchMode: boolean = false;
  isLoading: boolean = false;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listMovies();
    });
  }

  listMovies() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchListMovie();
    } else {
      this.handleListMovie();
    }
  }

  handleSearchListMovie() {
    this.isLoading = true;
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    this.movieService.searchMovies(theKeyword).subscribe((data) => {
      this.movies = data;
      this.isLoading = false;
    });
  }

  handleListMovie() {
    this.isLoading = true;
    this.movieService.getMovies().subscribe((data) => {
      this.movies = data;
      this.isLoading = false;
    });
  }

  ngAfterViewInit(): void {
    const swiperEl: any = document.querySelector('swiper-container');

    Object.assign(swiperEl, {
      navigation: {
        nextEl: '#nextBtn',
        prevEl: '#prevBtn',
      },
      breakpoints: {
        0: { slidesPerView: 1 },
        576: { slidesPerView: 2 },
        992: { slidesPerView: 3 },
        1200: { slidesPerView: 4 },
        1600: { slidesPerView: 5 },
      },
    });

    swiperEl.initialize();
  }
}
