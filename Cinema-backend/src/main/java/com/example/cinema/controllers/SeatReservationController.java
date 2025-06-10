package com.example.cinema.controllers;

import com.example.cinema.dto.PaymentInfo;
import com.example.cinema.dto.ReservationRequest;
import com.example.cinema.dto.SeatReservationDto;
import com.example.cinema.entity.SeatReservation;
import com.example.cinema.mapper.SeatReservationMapper;
import com.example.cinema.services.SeatReservationService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/reservations")
public class SeatReservationController {

    private final SeatReservationService reservationService;
    private Logger logger = Logger.getLogger(getClass().getName());

    public SeatReservationController(SeatReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @GetMapping("/{screeningId}")
    public ResponseEntity<List<SeatReservationDto>> getReservationsForScreening(@PathVariable Long screeningId) {
        List<SeatReservation> reservations = reservationService.getReservedSeats(screeningId);

        List<SeatReservationDto> dtoList = reservations.stream()
                .map(SeatReservationMapper::toDto)
                .toList();
        return ResponseEntity.ok(dtoList);
    }

    @PostMapping
    public ResponseEntity<?> reserveSeats(@RequestBody ReservationRequest request) {
        try {
            List<SeatReservation> result = reservationService.reserveSeatsBatch(request);
            return ResponseEntity.ok(result);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @PostMapping("/payment-intent")
    public ResponseEntity<String> createPaymentIntent(@RequestBody PaymentInfo paymentInfo) throws StripeException {

        logger.info("paymentInfo.amount: " + paymentInfo.getAmount());
        PaymentIntent paymentIntent = reservationService.createPaymentIntent(paymentInfo);

        String paymentStr = paymentIntent.toJson();

        return new ResponseEntity<>(paymentStr, HttpStatus.OK);
    }

}
