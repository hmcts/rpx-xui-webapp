import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { BookingService } from './booking.service';

describe('BookingService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        BookingService,
      ]
    });
  });

  describe('getBookings()', () => {

    it('should make a get call', inject([HttpTestingController, BookingService], (httpMock: HttpTestingController, service: BookingService) => {
      service.getBookings().subscribe(response => {
        expect(response).toBeNull();
      });

      const req = httpMock.expectOne('/am/bookings');
      expect(req.request.method).toEqual('GET');
      req.flush(null);
    }));
  });

  describe('getBookingLocation()', () => {

    it('should make a get call', inject([HttpTestingController, BookingService], (httpMock: HttpTestingController, service: BookingService) => {
      service.getBookingLocation('123').subscribe(response => {
        expect(response).toBeNull();
      });

      const req = httpMock.expectOne('/refdata/location/building-locations?epimms_id=123');
      expect(req.request.method).toEqual('GET');
      req.flush(null);
    }));
  });

});
