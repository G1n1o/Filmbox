package com.example.cinema.service;

import com.example.cinema.dao.CinemaHallRepository;
import com.example.cinema.dao.MovieRepository;
import com.example.cinema.dao.ScreeningRepository;
import com.example.cinema.dao.SeatReservationRepository;
import com.example.cinema.dto.ScreeningRequest;
import com.example.cinema.entity.CinemaHall;
import com.example.cinema.entity.Movie;
import com.example.cinema.entity.Screening;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ScreeningService {

    private final ScreeningRepository screeningRepository;
    private final MovieRepository movieRepository;
    private final CinemaHallRepository cinemaHallRepository;
    private final SeatReservationRepository reservationRepository;

    public ScreeningService(ScreeningRepository screeningRepository,
                            MovieRepository movieRepository,
                            CinemaHallRepository cinemaHallRepository,
                            SeatReservationRepository reservationRepository) {
        this.screeningRepository = screeningRepository;
        this.movieRepository = movieRepository;
        this.cinemaHallRepository = cinemaHallRepository;
        this.reservationRepository = reservationRepository;
    }

    public List<Screening> getAllScreenings() {
        return screeningRepository.findAllByOrderByScreeningTimeAsc();
    }

    public Screening getScreeningById(Integer id) {
        return screeningRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Seans o podanym ID nie istnieje"));
    }

    public void addScreening(ScreeningRequest screeningRequest) {
        Movie movie = movieRepository.getReferenceById(screeningRequest.getMovieId());
        CinemaHall hall = cinemaHallRepository.getReferenceById(screeningRequest.getCinemaHallId());

        Screening screening = new Screening();
        screening.setMovie(movie);
        screening.setCinemaHall(hall);
        screening.setScreeningTime(screeningRequest.getScreeningTime());

        screeningRepository.save(screening);
    }

    public void updateScreening(Integer id, ScreeningRequest screeningRequest) {
        Screening screening = screeningRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Seans o podanym ID nie istnieje"));

        Movie movie = movieRepository.getReferenceById(screeningRequest.getMovieId());
        CinemaHall hall = cinemaHallRepository.getReferenceById(screeningRequest.getCinemaHallId());

        screening.setMovie(movie);
        screening.setCinemaHall(hall);
        screening.setScreeningTime(screeningRequest.getScreeningTime());

        screeningRepository.save(screening);
    }

    @Transactional
    public void deleteScreening(Integer id) {
        reservationRepository.deleteByScreeningId(id);
        screeningRepository.deleteById(id);
    }
}
