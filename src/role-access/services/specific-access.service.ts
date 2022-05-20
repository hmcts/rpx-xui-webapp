import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import { Booking, BookingRequest, BookingResponseError, BookingResponseSuccess } from '../models';

@Injectable({ providedIn: 'root' })
export class SpecificAccessService {

  constructor(private readonly http: HttpClient) { }

  // public requestMoreInformation(bookingRequest: BookingRequest): Observable<BookingResponseSuccess | BookingResponseError> {
  //   return this.http.post<BookingResponseSuccess | BookingResponseError>('/api/specific-access-request/request-more-information', bookingRequest);
  // }
  public requestMoreInformation(requestMoreInformationStateData: any): Observable<any> {

    return this.http.post<any>('/api/specific-access-request/request-more-information', requestMoreInformationStateData);
  }
}
