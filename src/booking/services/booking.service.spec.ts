import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { BookingService } from './booking.service';

describe('NocService', () => {

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

  it('should be created', inject([BookingService], (service: BookingService) => {
    expect(service).toBeTruthy();
  }));

});
