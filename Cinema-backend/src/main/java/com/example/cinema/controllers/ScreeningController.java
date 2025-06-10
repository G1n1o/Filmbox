package com.example.cinema.controllers;

import com.example.cinema.dao.ScreeningRepository;
import com.example.cinema.entity.CinemaHall;
import com.example.cinema.entity.Screening;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/screenings")
public class ScreeningController {

    private final ScreeningRepository screeningRepository;

    public ScreeningController(ScreeningRepository screeningRepository) {
        this.screeningRepository = screeningRepository;
    }

    @GetMapping
    public List<Screening> getAllScreenings() {
        return screeningRepository.findAllByOrderByScreeningTimeAsc();
    }

    @GetMapping("/{id}")
    public Screening getScreeningById(@PathVariable Integer id) {
        return screeningRepository.getScreeningById(id);
    }

}
