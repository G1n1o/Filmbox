package com.example.cinema.controllers;

import com.example.cinema.dao.CinemaHallRepository;
import com.example.cinema.entity.CinemaHall;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/cinema-halls")
public class CinemaHallController {

    private final CinemaHallRepository cinemaHallRepository;

    public CinemaHallController(CinemaHallRepository cinemaHallRepository) {
        this.cinemaHallRepository = cinemaHallRepository;
    }

    @GetMapping
    public List<CinemaHall> getAllCinemaHalls() {
        return cinemaHallRepository.findAll();
    }
}
