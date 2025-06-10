package com.example.cinema.mapper;

import com.example.cinema.dto.SeatReservationDto;
import com.example.cinema.entity.SeatReservation;
import com.example.cinema.entity.User;

public class SeatReservationMapper {

    public static SeatReservationDto toDto(SeatReservation entity) {

        return new SeatReservationDto(

                entity.getSeatRow(),
                entity.getSeatNumber()
        );
    }
}
