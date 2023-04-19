import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SessionStorageService } from '../../../app/services';
import { BookingNavigationEvent, BookingState } from '../../models';
import { BookingWrapperComponent } from './booking-wrapper.component';

describe('BookingWrapperComponent', () => {
  let component: BookingWrapperComponent;
  let fixture: ComponentFixture<BookingWrapperComponent>;
  let sessionStorageService;

  beforeEach(waitForAsync(() => {
    sessionStorageService = jasmine.createSpyObj('sessionStorageService', ['getItem']);

    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [BookingWrapperComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: SessionStorageService, useValue: sessionStorageService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingWrapperComponent);
    component = fixture.componentInstance;
    const userIdType = 'uid';
    sessionStorageService.getItem.and.returnValue(`{"sub":"juser8@mailinator.com","${userIdType}":"44d5d2c2-7112-4bef-8d05-baaa610bf463","roles":["caseworker","caseworker-ia","caseworker-ia-iacjudge"],"name":"XUI test Judge","given_name":"XUI test","family_name":"Judge","token":""}`);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onNavEvent', () => {
    describe('back link events', () => {
      it('should set navEvent', () => {
        // Need to set a valid NoC navigation state on the component
        component.bookingNavigationCurrentState = BookingState.LOCATION;

        // Using the NocNavigationEvent.BACK event here because NocNavigationEvent.CONTINUE isn't handled by noc-home
        // component at present
        component.onNavEvent(BookingNavigationEvent.BACK);
        expect(component.navEvent.event).toEqual(BookingNavigationEvent.BACK);
      });

      it('should determine visibility true', () => {
        const expected = component.isComponentVisible(BookingState.HOME, [BookingState.HOME, BookingState.LOCATION]);
        expect(expected).toBeTruthy();
      });

      it('should determine visibility false', () => {
        const expected = component.isComponentVisible(BookingState.HOME, [BookingState.LOCATION, BookingState.BOOKDATE]);
        expect(expected).toBeFalsy();
      });

      it('should navigate to the location page when back is clicked on the select booking date page', () => {
        component.bookingNavigationCurrentState = BookingState.BOOKDATE as BookingState;
        component.navigationHandler(BookingNavigationEvent.BACK);
        expect(component.bookingNavigationCurrentState).toBe(BookingState.LOCATION);
      });

      it('should navigate to the select booking date page when back is clicked on the check your booking page', () => {
        component.bookingNavigationCurrentState = BookingState.CHECK as BookingState;
        component.navigationHandler(BookingNavigationEvent.BACK);
        expect(component.bookingNavigationCurrentState).toBe(BookingState.BOOKDATE);
      });

      it('should throw an error if an unexpected back event occurs', () => {
        component.bookingNavigationCurrentState = BookingState.HOME as BookingState;
        expect(() => {
          component.navigationHandler(BookingNavigationEvent.BACK);
        }).toThrow(new Error('Invalid Booking Back state'));
      });
    });
  });

  describe('button events', () => {
    it('should navigate to the location page when new booking is selected', () => {
      component.bookingProcess.selectedBookingOption = 1; // new booking option
      component.navigationHandler(BookingNavigationEvent.HOMECONTINUE);
      expect(component.bookingNavigationCurrentState).toBe(BookingState.LOCATION);
    });

    it('should navigate to the booking date page when a location is selected and continue is pressed', () => {
      component.navigationHandler(BookingNavigationEvent.LOCATIONCONTINUE);
      expect(component.bookingNavigationCurrentState).toBe(BookingState.BOOKDATE);
    });

    it('should navigate to the booking date check when the booking dates have been selected and continue is pressed', () => {
      component.navigationHandler(BookingNavigationEvent.BOOKINGDATESUBMIT);
      expect(component.bookingNavigationCurrentState).toBe(BookingState.CHECK);
    });
  });
});
