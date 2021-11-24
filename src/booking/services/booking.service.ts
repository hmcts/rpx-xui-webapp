import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from '../models/booking.interface';

@Injectable()
export class BookingService {

  constructor(private readonly http: HttpClient) {}

  public getBookings(): Observable<{bookings: Booking[]}> {
    return this.http.get<{bookings: Booking[]}>(`/am/bookings`);
  }

  public getBookingLocation(locationId: string): Observable<any> {
    return this.http.get(`/refdata/location/building-locations?epimms_id=${locationId}`);
  }
}
