package com.example.cinema.controllers;

import com.example.cinema.dao.ScreeningRepository;
import com.example.cinema.entity.Movie;
import com.example.cinema.entity.Screening;
import com.example.cinema.services.MovieService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/movies")
public class MovieController {

    private final MovieService movieService;
    private final ScreeningRepository screeningRepository;

    public MovieController(MovieService movieService, ScreeningRepository screeningRepository) {
        this.movieService = movieService;
        this.screeningRepository = screeningRepository;
    }

    @GetMapping
    public List<Movie> getMovies(@RequestParam(required = false) String search) {
        if (search != null && !search.isEmpty()) {
            return movieService.searchMoviesByTitle(search);
        }
        return movieService.getAllMovies();
    }

    @GetMapping("/{id}")
    public Movie getMovieById(@PathVariable Integer id) {
        return movieService.getMovieById(id);
    }

    @GetMapping("/{id}/screenings")
    public List<Screening> getScreeningsByMovie(@PathVariable Integer id) {
        return screeningRepository.findByMovieId(id);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addMovie(
            @RequestParam String title,
            @RequestParam(required = false) String description,
            @RequestParam int duration,
            @RequestParam String releaseDate,
            @RequestParam MultipartFile poster
    ) {
        try {
            movieService.saveMovieWithPoster(title, description, duration, releaseDate, poster);
            return ResponseEntity.ok(
                    java.util.Map.of("message", "Film zapisany pomyślnie")
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(java.util.Map.of("error", "Błąd podczas zapisywania filmu: " + e.getMessage()));
        }
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateMovie(
            @PathVariable Integer id,
            @RequestParam String title,
            @RequestParam(required = false) String description,
            @RequestParam int duration,
            @RequestParam String releaseDate,
            @RequestParam(required = false) MultipartFile poster
    ) {
        try {
            movieService.updateMovie(id, title, description, duration, releaseDate, poster);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Film został zaktualizowany.");
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Błąd przy aktualizacji filmu: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMovie(@PathVariable Integer id) {
        movieService.deleteMovie(id);
        return ResponseEntity.ok().build();
    }
}
