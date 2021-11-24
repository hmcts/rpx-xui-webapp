import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NewBooking } from '../../models';

import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Booking } from '../../models/booking.interface';
import { BookingService } from '../../services';
import { BookingHomeComponent } from './booking-home.component';

const DUMMY_BOOKING_1: Booking = {
  userId: 'Dummy User Id',
  appointmentId: 'Dummy Appointment Id',
  roleId: 'Dummy Role Id',
  contract_type_id: 'Dummy Contract Type Id',
  base_location_id: 'Dummy Location Id',
  region_id: 'Dummy Region Id',
  beginTime: new Date(),
  endTime: new Date(),
  created: new Date()
};

const DUMMY_LOCATION_NAME: string = 'Some place name';

describe('BookingHomeComponent', () => {
  let component: BookingHomeComponent;
  let fixture: ComponentFixture<BookingHomeComponent>;
  const bookingService = jasmine.createSpyObj<BookingService>('BookingService', ['getBookings', 'getBookingLocation']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [ BookingHomeComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        { provide: BookingService, useValue: bookingService }
      ]
    })
    .compileComponents();

    bookingService.getBookings.and.returnValue(of({bookings: [
      DUMMY_BOOKING_1
    ]}));
    bookingService.getBookingLocation.and.returnValue(of([{
      building_location_name: DUMMY_LOCATION_NAME
    }]));

    fixture = TestBed.createComponent(BookingHomeComponent);
    component = fixture.componentInstance;
    component.newBooking = {} as NewBooking;
    fixture.detectChanges();
  }));

  it('should display bookings list when there are existing bookings and first radio button is clicked', () => {

    // Click on the first radio button.
    const element = fixture.debugElement.nativeElement;
    const firstRadioButton = element.querySelector('#type-0');
    firstRadioButton.click();
    fixture.detectChanges();
    const bookingsList = element.querySelector('#conditional-booking-type-0');
    expect(bookingsList).toBeTruthy();
  });

  describe('onSelectOption()', () => {

    it('should change bookingOptionIndex', () => {

      // Click on the second radio button.
      const element = fixture.debugElement.nativeElement;
      const secondRadioButton = element.querySelector('#type-1');
      secondRadioButton.click();
      expect(component.newBooking.bookingOptionIndex).toEqual(1);
    });
  });

  describe('onEventTrigger()', () => {

    it('should emit a navigation enum', () => {

      const eventTriggerSpy = spyOn(component.eventTrigger, 'emit');
      // Click on the second radio button.
      const element = fixture.debugElement.nativeElement;
      const secondRadioButton = element.querySelector('#type-1');
      secondRadioButton.click();
      fixture.detectChanges();
      const button = element.querySelector('button.govuk-button');
      button.click();
      expect(eventTriggerSpy).toHaveBeenCalled();
    });
  });

  describe('assignBookingLocation()', () => {

    it('should assign locationName', () => {

      expect(component.existingBookings[0].locationName).toEqual('Some place name');
    });
  });
});
