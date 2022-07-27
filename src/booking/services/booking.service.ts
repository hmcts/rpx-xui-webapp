import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking, BookingRequest, BookingResponseError, BookingResponseSuccess } from '../models';

@Injectable({ providedIn: 'root' })
export class BookingService {

  constructor(private readonly http: HttpClient) { }

  public getBookings(userId: string): Observable< Booking[]> {
    return this.http.post<Booking[]>(`/am/getBookings`, { userId });
  }

  public getBookingLocation(locationId: string): Observable<any> {
    return this.http.get(`/refdata/location/building-locations?epimms_id=${locationId}`);
  }

  public createBooking(bookingRequest: BookingRequest): Observable<BookingResponseSuccess | BookingResponseError> {
    return this.http.post<BookingResponseSuccess | BookingResponseError>('/am/createBooking', bookingRequest);
  }

  public refreshRoleAssignments(): Observable<any> {
    return this.http.post<BookingResponseSuccess | BookingResponseError>('/am/role-mapping/judicial/refresh', null);
  }
}
