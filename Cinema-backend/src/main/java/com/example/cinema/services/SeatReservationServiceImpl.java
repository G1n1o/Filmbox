package com.example.cinema.services;

import com.example.cinema.dao.ScreeningRepository;
import com.example.cinema.dao.SeatReservationRepository;
import com.example.cinema.dao.UserRepository;
import com.example.cinema.dto.PaymentInfo;
import com.example.cinema.dto.ReservationRequest;
import com.example.cinema.dto.SeatReservationDto;
import com.example.cinema.entity.Screening;
import com.example.cinema.entity.SeatReservation;
import com.example.cinema.entity.User;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SeatReservationServiceImpl implements SeatReservationService {

    private final SeatReservationRepository reservationRepository;
    private final ScreeningRepository screeningRepository;
    private final UserRepository userRepository;

    public SeatReservationServiceImpl(SeatReservationRepository seatReservationRepository,
                                      ScreeningRepository screeningRepository,
                                      UserRepository userRepository,
                                      @Value("${stripe.key.secret}") String secretKey) {
        this.reservationRepository = seatReservationRepository;
        this.screeningRepository = screeningRepository;
        this.userRepository = userRepository;
        //initialize Stripe Api with secret key
        Stripe.apiKey = secretKey;
    }

    @Override
    public List<SeatReservation> getReservedSeats(Long screeningId) {
        return reservationRepository.findByScreeningId(screeningId);
    }

    @Override
    public boolean isSeatTaken(long screeningId, int row, int seat) {
        return reservationRepository.existsByScreeningIdAndSeatRowAndSeatNumber(screeningId, row, seat);
    }

    @Override
    public List<SeatReservation> reserveSeatsBatch(ReservationRequest request) {
        Screening screening = screeningRepository.findById(request.getScreeningId())
                .orElseThrow(() -> new RuntimeException("Nie znaleziono seansu"));

        User incomingUser = request.getUser();

        // Find user by email or create new one
        User user = userRepository.findByEmail(incomingUser.getEmail())
                .orElseGet(() -> userRepository.save(incomingUser));

        List<SeatReservation> savedReservations = new ArrayList<>();

        for (SeatReservationDto seatDto : request.getSeats()) {
            if (isSeatTaken(screening.getId(), seatDto.getSeatRow(), seatDto.getSeatNumber())) {
                throw new RuntimeException("Miejsce zajęte: Rząd " + seatDto.getSeatRow() + ", Miejsce " + seatDto.getSeatNumber());
            }

            SeatReservation reservation = new SeatReservation();
            reservation.setSeatRow(seatDto.getSeatRow());
            reservation.setSeatNumber(seatDto.getSeatNumber());
            reservation.setScreening(screening);
            reservation.setUser(user);

            savedReservations.add(reservationRepository.save(reservation));
        }

        return savedReservations;
    }

    @Override
    public PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws StripeException {
        List<String> paymentMethodTypes = new ArrayList<>();
        paymentMethodTypes.add("card");

        Map<String, Object> params = new HashMap<>();
        params.put("amount", paymentInfo.getAmount());
        params.put("currency", paymentInfo.getCurrency());
        params.put("payment_method_types", paymentMethodTypes);
        params.put("description", "Filmbox purchase");
        params.put("receipt_email", paymentInfo.getReceiptEmail());

        return PaymentIntent.create(params);
    }

}

