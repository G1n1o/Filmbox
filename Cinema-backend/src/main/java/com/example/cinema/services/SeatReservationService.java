package com.example.cinema.services;

import com.example.cinema.dto.PaymentInfo;
import com.example.cinema.dto.ReservationRequest;
import com.example.cinema.entity.SeatReservation;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

import java.util.List;

public interface SeatReservationService {

    List<SeatReservation> getReservedSeats(Long screeningId);

    boolean isSeatTaken(long screeningId, int row, int seat);

    List<SeatReservation> reserveSeatsBatch(ReservationRequest request);

    PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws StripeException;
}
