package com.example.cinema.dto;

import lombok.Data;

import java.time.LocalDateTime;


@Data
public class ScreeningRequest {
    private Integer movieId;
    private Integer cinemaHallId;
    private LocalDateTime screeningTime;
}

