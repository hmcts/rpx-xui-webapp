import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { WindowService } from '@hmcts/ccd-case-ui-toolkit';
import { of } from 'rxjs';
import { BookingProcess } from '../../models';
import { BookingService } from '../../services';
import * as HandleError from '../utils/booking-error-handler';
import {BookingCheckComponent} from './booking-check.component';

describe('BookingCheckComponent', () => {
  let component: BookingCheckComponent;
  let fixture: ComponentFixture<BookingCheckComponent>;
  const mockBookingServiceSpy = jasmine.createSpyObj('BookingService', ['createBooking', 'refreshRoleAssignments']);
  const mockWindowService = jasmine.createSpyObj('WindowService', ['removeLocalStorage']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookingCheckComponent],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        {
          provide: BookingService,
          useValue: mockBookingServiceSpy
        },
        {
          provide: WindowService,
          useValue: mockWindowService
        }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(BookingCheckComponent);
    component = fixture.componentInstance;
    component.bookingProcess = { location: { court_name: 'London Court' } } as BookingProcess;
    component.userId = '21334a2b-79ce-44eb-9168-2d49a744be9c';
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('page display events', () => {
    it('should display the correct page caption and heading', () => {
      const caption = fixture.debugElement.nativeElement.querySelector('.govuk-caption-l');
      const heading = fixture.debugElement.nativeElement.querySelector('h1');

      expect(caption.textContent).toContain('Work access');
      expect(heading.textContent).toContain('Check your new booking');
    });

    it('should display the correct location', () => {
      const location = fixture.debugElement.nativeElement.querySelector('.govuk-summary-list__row').childNodes[1];
      component.bookingProcess = { location: { court_name: 'London Court' } } as BookingProcess;

      fixture.detectChanges();
      expect(location.textContent).toContain('London Court');
    });

    it('should display the correct values on row for today only case', () => {
      const dateInterval = fixture.debugElement.nativeElement.querySelector('.govuk-summary-list__row').nextElementSibling.childNodes[1];
      component.bookingProcess = {
        startDate: new Date('Thu Dec 02 2021 09:00:00 GMT+0000'),
        endDate: new Date('Sun Dec 02 2021 23:59:59 GMT+0000'),
        location: { court_name: 'London Court' }
      } as BookingProcess;

      fixture.detectChanges();
      expect(dateInterval.textContent).toContain(
        '02 December 2021 to 02 December 2021'
      );
    });

    it('should display the correct values on row for this week case', () => {
      const dateInterval = fixture.debugElement.nativeElement.querySelector('.govuk-summary-list__row').nextElementSibling.childNodes[1];
      component.bookingProcess = {
        startDate: new Date('Thu Dec 02 2021 09:00:00 GMT+0000'),
        endDate: new Date('Sun Dec 05 2021 23:59:59 GMT+0000'),
        location: { court_name: 'London Court' }
      } as BookingProcess;

      fixture.detectChanges();
      expect(dateInterval.textContent).toContain(
        '02 December 2021 to 05 December 2021'
      );
    });

    it('should display the correct values on row for date range case', () => {
      const dateInterval = fixture.debugElement.nativeElement.querySelector('.govuk-summary-list__row').nextElementSibling.childNodes[1];
      component.bookingProcess = {
        startDate: new Date('Thu Dec 02 2021 09:00:00 GMT+0000'),
        endDate: new Date('Sun Dec 12 2021 23:59:59 GMT+0000'),
        location: { court_name: 'London Court' }
      } as BookingProcess;

      fixture.detectChanges();
      expect(dateInterval.textContent).toContain(
        '02 December 2021 to 12 December 2021'
      );
    });

    describe('page link events', () => {
      let mockRouter: any;
      let eventTriggerSpy: jasmine.Spy;
      beforeEach(() => {
        eventTriggerSpy = spyOn(component, 'onEventTrigger').and.callThrough();
      });

      it('should not call RefreshBookingHandleError when bookingService.createBooking return error', () => {
        mockRouter = {
          navigate: jasmine.createSpy('navigate')
        };
        mockBookingServiceSpy.createBooking.and.returnValue(of({status: 403}));
        const confirmButton = fixture.debugElement.query(By.css('button'));
        confirmButton.triggerEventHandler('click', null);
        fixture.detectChanges();
        const mockComponentHandleError = spyOn(HandleError, 'RefreshBookingHandleError');
        expect(mockComponentHandleError).not.toHaveBeenCalled();
      });

      it('should call the change location event trigger if the change location link is clicked', () => {
        const changeLocationLink = fixture.debugElement.nativeElement.querySelector('a#change-location');
        changeLocationLink.click();

        expect(eventTriggerSpy).toHaveBeenCalledWith(component.bookingNavigationEvent.CHANGELOCATIONCLICK);
      });

      it('should call the change duration event trigger if the change duration link is clicked', () => {
        const changeDurationLink = fixture.debugElement.nativeElement.querySelector('a#change-duration');
        changeDurationLink.click();

        expect(eventTriggerSpy).toHaveBeenCalledWith(component.bookingNavigationEvent.CHANGEDURATIONCLICK);
      });

      it('should call the cancel event trigger if the cancel link is clicked', () => {
        const cancelLink = fixture.debugElement.nativeElement.querySelector('a#cancel');
        cancelLink.click();

        expect(eventTriggerSpy).toHaveBeenCalledWith(component.bookingNavigationEvent.CANCEL);
      });

      it('should trigger the confirm booking event and call the submitBooking method when the confirm button is clicked', () => {
        const confirmButton = fixture.debugElement.query(By.css('button'));
        confirmButton.triggerEventHandler('click', null);

        expect(eventTriggerSpy).toHaveBeenCalledWith(component.bookingNavigationEvent.CONFIRM);
        expect(mockBookingServiceSpy.refreshRoleAssignments).toHaveBeenCalledTimes(2);
      });
    });
  });
});
