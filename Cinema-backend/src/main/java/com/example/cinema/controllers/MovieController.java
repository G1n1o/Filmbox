package com.example.cinema.controllers;

import com.example.cinema.dao.ScreeningRepository;
import com.example.cinema.entity.Movie;
import com.example.cinema.entity.Screening;
import com.example.cinema.services.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @PostMapping
    public Movie addMovie(@RequestBody Movie movie) {
        return movieService.saveMovie(movie);
    }
}
