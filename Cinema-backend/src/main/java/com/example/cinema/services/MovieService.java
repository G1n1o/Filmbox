package com.example.cinema.services;

import com.example.cinema.dao.MovieRepository;
import com.example.cinema.entity.Movie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    public Movie getMovieById(Integer id) {
        return movieRepository.findById(id).orElse(null);
    }

    public List<Movie> searchMoviesByTitle(String title) {
        return movieRepository.findByTitleContainingIgnoreCase(title);
    }

    public void saveMovieWithPoster(String title, String description, int duration, String releaseDate, MultipartFile poster) throws IOException {
        String filename = UUID.randomUUID() + "_" + poster.getOriginalFilename();
        Path path = Paths.get("uploads/posters", filename);
        Files.createDirectories(path.getParent());
        Files.write(path, poster.getBytes());


        Movie movie = new Movie();
        movie.setTitle(title);
        movie.setDescription(description);
        movie.setDuration(duration);
        movie.setReleaseDate(LocalDate.parse(releaseDate));
        movie.setPosterUrl("/uploads/posters/" + filename);

        movieRepository.save(movie);
    }

    public void updateMovie(Integer id, String title, String description, int duration, String releaseDate, MultipartFile poster) throws IOException {
        Movie movie = movieRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Film nie znaleziony"));

        movie.setTitle(title);
        movie.setDescription(description);
        movie.setDuration(duration);
        movie.setReleaseDate(LocalDate.parse(releaseDate));

        if (poster != null && !poster.isEmpty()) {
            String filename = UUID.randomUUID() + "_" + poster.getOriginalFilename();
            Path path = Paths.get("uploads/posters", filename);
            Files.createDirectories(path.getParent());
            Files.write(path, poster.getBytes());

            movie.setPosterUrl("/uploads/posters/" + filename);
        }

        movieRepository.save(movie);
    }

    public void deleteMovie(Integer id) {
        Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Film nie znaleziony"));


        if (movie.getPosterUrl() != null) {
            Path posterPath = Paths.get(movie.getPosterUrl().replaceFirst("/", ""));
            try {
                Files.deleteIfExists(posterPath);
            } catch (IOException e) {
                System.err.println("Nie udało się usunąć plakatu: " + e.getMessage());
            }
        }

        movieRepository.deleteById(id);
    }

}
