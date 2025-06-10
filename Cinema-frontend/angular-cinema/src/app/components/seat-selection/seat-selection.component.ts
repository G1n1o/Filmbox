import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservedSeat } from 'src/app/common/reserved-seat';
import { Screening } from 'src/app/common/screening';
import { Seat } from 'src/app/common/seat';
import { ScreeningService } from 'src/app/services/screening.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-seat-selection',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './seat-selection.component.html',
  styleUrl: './seat-selection.component.css',
})
export class SeatSelectionComponent implements OnInit {
  screening!: Screening;
  seats: Seat[][] = [];
  reservedSeats: ReservedSeat[] = [];
  selectedSeats: Seat[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private screeningService: ScreeningService
  ) {}

  ngOnInit(): void {
    const screeningId = Number(this.route.snapshot.paramMap.get('id'));


    this.screeningService
      .getScreeningById(screeningId)
      .subscribe((screening) => {
        this.screening = screening;

  
        const hall = this.screening.cinemaHall;
        this.generateSeats(hall.rows, hall.seatsPerRow);

        this.screeningService
          .getReservedSeats(this.screening.id)
          .subscribe((reservations) => {
            this.reservedSeats = reservations;
            this.markReservedSeats();
          });
      });
  }

  generateSeats(rows: number, seatsPerRow: number): void {
    this.seats = [];

    for (let row = 0; row < rows; row++) {
      const seatRow: Seat[] = [];

      for (let seat = 0; seat < seatsPerRow; seat++) {
        seatRow.push({
          rowNumber: row + 1,
          seatNumber: seat + 1,
          reserved: false,
        });
      }

      this.seats.push(seatRow);
    }
  }

  isSeatReserved(rowNumber: number, seatNumber: number): boolean {
    return this.reservedSeats.some(
      (seat) => seat.seatRow === rowNumber && seat.seatNumber === seatNumber
    );
  }

  markReservedSeats(): void {
    for (const reservation of this.reservedSeats) {
      const { seatRow, seatNumber } = reservation;
      const rowIndex = seatRow - 1;
      const seatIndex = seatNumber - 1;

      if (this.seats[rowIndex] && this.seats[rowIndex][seatIndex]) {
        this.seats[rowIndex][seatIndex].reserved = true;
      }
    }
  }

  toggleSeatSelection(seat: Seat): void {
    if (seat.reserved) return;

    const index = this.selectedSeats.findIndex(
      (s) => s.rowNumber === seat.rowNumber && s.seatNumber === seat.seatNumber
    );

    if (index > -1) {
      this.selectedSeats.splice(index, 1);
    } else {
      this.selectedSeats.push(seat);
    }
  }

  isSeatSelected(seat: Seat): boolean {
    return this.selectedSeats.some(
      (s) => s.rowNumber === seat.rowNumber && s.seatNumber === seat.seatNumber
    );
  }

  

  reserveSeats() {
   this.router.navigate(['/reservation'], {
      state: {
        selectedSeats: this.selectedSeats,
        screeningId: this.screening.id
      }
    });
  }

  getSeatLabel(count: number): string {
  if (count === 1) return 'miejsce';
  if (count > 1 && count < 5) return 'miejsca';
  return 'miejsc';
}


  toRoman(num: number): string {
    const romans: { [key: number]: string } = {
      1: 'I',
      2: 'II',
      3: 'III',
      4: 'IV',
      5: 'V',
      6: 'VI',
      7: 'VII',
      8: 'VIII',
      9: 'IX',
      10: 'X',
      11: 'XI',
      12: 'XII',
    };
    return romans[num] || num.toString();
  }

   goBack(): void {
    this.location.back();
  }
}
