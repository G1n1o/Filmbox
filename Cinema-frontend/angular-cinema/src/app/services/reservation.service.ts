import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReservationRequest } from '../common/reservation-request';
import { environment } from 'src/environments/environment.development';
import { PaymentInfo } from '../common/payment-info';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservationUrl = environment.filmboxApiUrl + '/reservations';

  private paymentIntentUrl = environment.filmboxApiUrl + "/reservations/payment-intent";

  constructor(private http: HttpClient) { }

  makeReservation(request: ReservationRequest): Observable<any> {
    return this.http.post(this.reservationUrl, request);
  }

  createPaymentIntent(paymentInfo: PaymentInfo): Observable<any> {
    return this.http.post<PaymentInfo>(this.paymentIntentUrl, paymentInfo);
  }
}
