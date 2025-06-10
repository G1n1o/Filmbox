package com.example.cinema.dto;

import java.util.List;

import com.example.cinema.entity.User;
import lombok.Data;


@Data
public class ReservationRequest {

    private int screeningId;
    private User user;
    private List<SeatReservationDto> seats;
}
