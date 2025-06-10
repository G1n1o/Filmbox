export interface ReservationRequest {
  screeningId: number;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
  seats: { seatRow: number; seatNumber: number }[];
}
