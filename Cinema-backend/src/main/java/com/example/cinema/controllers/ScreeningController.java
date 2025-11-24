package com.example.cinema.controllers;

import com.example.cinema.dto.ScreeningRequest;
import com.example.cinema.entity.Screening;
import com.example.cinema.services.ScreeningService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/screenings")
public class ScreeningController {

    private final ScreeningService screeningService;

    public ScreeningController(ScreeningService screeningService) {
        this.screeningService = screeningService;
    }

    @GetMapping
    public List<Screening> getAllScreenings() {
        return screeningService.getAllScreenings();
    }

    @GetMapping("/{id}")
    public Screening getScreeningById(@PathVariable Integer id) {
        return screeningService.getScreeningById(id);
    }

    @PostMapping
    public ResponseEntity<?> addScreening(@RequestBody ScreeningRequest screeningRequest) {
        screeningService.addScreening(screeningRequest);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateScreening(@PathVariable Integer id, @RequestBody ScreeningRequest screeningRequest) {
        screeningService.updateScreening(id, screeningRequest);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteScreening(@PathVariable Integer id) {
        screeningService.deleteScreening(id);
        return ResponseEntity.ok().build();
    }
}
