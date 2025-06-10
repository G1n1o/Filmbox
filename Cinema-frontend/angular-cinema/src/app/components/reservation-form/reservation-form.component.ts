import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { Seat } from 'src/app/common/seat';
import { FilmboxValidators } from 'src/app/validators/filmbox-validators';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ReservationService } from 'src/app/services/reservation.service';
import { environment } from 'src/environments/environment.development';
import { PaymentInfo } from 'src/app/common/payment-info';

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css'],
})
export class ReservationFormComponent implements OnInit {
  selectedSeats: Seat[] = [];
  screeningId!: number;
  userForm!: FormGroup;
  ticketPrice: number = environment.ticketPrice;

  isDisabled: boolean = false;

  // initialize Stripe API
  stripe = Stripe(environment.stripePublishableKey);
  paymentInfo: PaymentInfo = new PaymentInfo();
  cardElement: any;
  displayError: any = '';

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private router: Router,
    private snackBar: MatSnackBar,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    const state = history.state as {
      selectedSeats: Seat[];
      screeningId: number;
    };

    this.selectedSeats = state.selectedSeats || [];
    this.screeningId = state.screeningId || 0;

    // setup Stripe payment form
    this.setupStripePaymentForm();

    this.userForm = this.fb.group({
      customer: this.fb.group({
        firstName: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            FilmboxValidators.notOnlyWhitespace,
          ],
        ],
        lastName: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            FilmboxValidators.notOnlyWhitespace,
          ],
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          ],
        ],
      }),
      creditCard: this.fb.group({}),
    });
  }

  setupStripePaymentForm() {
    // get a handle to stripe elements
    var elements = this.stripe.elements();

    // Create a card element ... and hide the zip-code field
    this.cardElement = elements.create('card', { hidePostalCode: true });

    // Add an instance of card UI component into the 'card-element' div
    this.cardElement.mount('#card-element');

    // Add event binding for the 'change' event on the card element
    this.cardElement.on('change', (event: any) => {
      // get a handle to card-errors element
      this.displayError = document.getElementById('card-errors');

      if (event.error) {
        // show validation error to customer
        this.displayError.textContent = event.error.message;
        this.displayError.classList.add('alert', 'alert-danger', 'mt-2');
      } else {
        this.displayError.textContent = '';
        this.displayError.classList.remove('alert', 'alert-danger', 'mt-2');
      }
    });
  }

  get firstName() {
    return this.userForm.get('customer.firstName');
  }
  get lastName() {
    return this.userForm.get('customer.lastName');
  }
  get email() {
    return this.userForm.get('customer.email');
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const user = this.userForm.get('customer')?.value;

    const reservationRequest = {
      screeningId: this.screeningId,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      seats: this.selectedSeats.map((seat) => ({
        seatRow: seat.rowNumber,
        seatNumber: seat.seatNumber,
      })),
    };

    //compute payment info
    this.paymentInfo.amount = Math.round(this.totalPrice * 100);
    this.paymentInfo.currency = 'PLN';
    this.paymentInfo.receiptEmail = reservationRequest.user.email;

    if (!this.userForm.invalid && this.displayError.textContent === '') {
      this.isDisabled = true;

      this.reservationService
        .createPaymentIntent(this.paymentInfo)
        .subscribe((paymentIntentResponse) => {
          this.stripe
            .confirmCardPayment(
              paymentIntentResponse.client_secret,
              {
                payment_method: {
                  card: this.cardElement,
                  billing_details: {
                    email: reservationRequest.user.email,
                    name: `${reservationRequest.user.firstName} ${reservationRequest.user.lastName}`,
                  },
                },
              },
              { handleActions: false }
            )
            .then((result: any) => {
              if (result.error) {
                // inform the customer there was an error
                alert(`There was an error: ${result.error.message}`);
                this.isDisabled = false;
              } else {
                //call REST API via the ReservationService
                this.reservationService
                  .makeReservation(reservationRequest)
                  .subscribe({
                    next: () => {
                      this.router.navigate(['/summary'], {
                        state: { reservationData: reservationRequest },
                      });
                      this.isDisabled = false;
                    },
                    error: (err) => {
                      this.snackBar.open(
                        'Wystąpił błąd podczas rezerwacji: ' +
                          (err.error || err.message || 'Nieznany błąd'),
                        'Zamknij',
                        {
                          duration: 5000,
                          panelClass: ['error-snackbar'],
                        }
                      );
                      this.isDisabled = false;
                    },
                  });
              }
            });
        });
    } else {
      this.userForm.markAllAsTouched();
      return;
    }
  }

  get totalPrice(): number {
    return this.selectedSeats.length * this.ticketPrice;
  }

  goBack(): void {
    this.location.back();
  }
}
