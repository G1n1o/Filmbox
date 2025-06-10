package com.example.cinema.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SeatReservationDto {


    private int seatRow;
    private int seatNumber;

    public SeatReservationDto() {
    }

    public SeatReservationDto( int seatRow, int seatNumber) {

        this.seatRow = seatRow;
        this.seatNumber = seatNumber;
    }
}
