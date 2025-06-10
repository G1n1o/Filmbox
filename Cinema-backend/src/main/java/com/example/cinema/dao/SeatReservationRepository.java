package com.example.cinema.dao;

import com.example.cinema.entity.SeatReservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SeatReservationRepository extends JpaRepository<SeatReservation,Integer> {

    List<SeatReservation> findByScreeningId(Long screeningId);

    boolean existsByScreeningIdAndSeatRowAndSeatNumber(Long screeningId, int row, int seat);
}
