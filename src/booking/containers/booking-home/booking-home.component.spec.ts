import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { WindowService } from '@hmcts/ccd-case-ui-toolkit';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { of, throwError } from 'rxjs';

import { BookingProcess, BookingResponseSuccess } from '../../models';
import { Booking } from '../../models/booking.interface';
import { BookingService } from '../../services';
import { BookingHomeComponent } from './booking-home.component';

const DUMMY_BOOKINGS: Booking[] = [{
  id: 'd9d4f711-1ffe-4a22-a949-7286907422f1',
  userId: '7954b105-1014-4504-bb47-602639df24eb',
  regionId: '5',
  locationId: '512401',
  created: '2022-06-14T13:25:39Z',
  beginTime: '2022-06-14T00:00:00Z',
  endTime: '2022-06-20T00:00:00Z',
  locationName: 'Manchester Tribunal Hearing Centre'
},
{
  id: '0457a99c-b1e3-49a1-9deb-8ab322706981',
  userId: '7954b105-1014-4504-bb47-602639df24eb',
  regionId: '9',
  locationId: '366559',
  created: '2022-06-15T13:26:27Z',
  beginTime: '2022-06-14T00:00:00Z',
  endTime: '2022-06-20T00:00:00Z',
  locationName: 'Glasgow Tribunals Centre'
}];

const bookableSuccessResponse: BookingResponseSuccess = {
  bookingResponse: {
    userId: '1',
    locationId: '1',
    regionId: '1',
    beginTime: new Date(),
    endTime: new Date(),
    created: new Date(),
    log: ''
  }
};

describe('BookingHomeComponent', () => {
  let component: BookingHomeComponent;
  let fixture: ComponentFixture<BookingHomeComponent>;
  const bookingService = jasmine.createSpyObj<BookingService>('BookingService', ['getBookings', 'getBookingLocation', 'refreshRoleAssignments']);
  const mockWindowService = jasmine.createSpyObj('WindowService', ['removeLocalStorage']);
  const flags = {
    enabledFlag: true,
    disabledFlag: false
  };
  let mockRouter: any;
  const error = {
    status: 400,
    message: 'Service down'
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(
          [{ path: 'work/my-work/list', component: BookingHomeComponent }]
        )
      ],
      declarations: [BookingHomeComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: BookingService,
          useValue: bookingService
        },
        {
          provide: WindowService,
          useValue: mockWindowService
        },
        {
          provide: FeatureToggleService,
          useValue: {
            isEnabled: (flag) => of(flags[flag])
          }
        }
      ]
    })
      .compileComponents();

    bookingService.getBookings.and.returnValue(of(DUMMY_BOOKINGS));
    bookingService.refreshRoleAssignments.and.returnValue(of(bookableSuccessResponse));

    fixture = TestBed.createComponent(BookingHomeComponent);
    component = fixture.componentInstance;
    component.bookingProcess = {} as BookingProcess;
    component.userId = '21334a2b-79ce-44eb-9168-2d49a744be9c';
    fixture.detectChanges();
  }));

  it('should send back the status if it is 400', () => {
    bookingService.getBookings.and.returnValue(throwError({ error }));
    fixture.detectChanges();
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };
    component.NavigationErrorHandler(error, mockRouter);
    expect(mockRouter.navigate).toHaveBeenCalled();
  });

  it('should attempt to navigate to the correct error pages', () => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };
    // should get correct redirect for 401, 403
    error.status = 401;
    component.NavigationErrorHandler(error, mockRouter);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/not-authorised']);

    // correct redirect for 500
    error.status = 500;
    component.NavigationErrorHandler(error, mockRouter);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/service-down']);

    // correct redirect for 404
    error.status = 404;
    component.NavigationErrorHandler(error, mockRouter);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/booking-system-error']);
  });

  it('should display bookings list when there are existing bookings and first radio button is clicked', () => {
    // Click on the first radio button.
    const element = fixture.debugElement.nativeElement;
    const firstRadioButton = element.querySelector('#type-0');
    firstRadioButton.click();
    fixture.detectChanges();
    const bookingsList = element.querySelector('#conditional-booking-type-0');
    expect(bookingsList).toBeTruthy();
  });

  it('should get previous date', () => {
    const date = new Date('2022-12-24T00:00:00Z');
    const expectedDate = new Date('2022-12-23T00:00:00Z');
    expect(component.getPreviousDate(date)).toEqual(expectedDate);
  });

  it('should display bookings in sorted order when there are existing bookings and first radio button is clicked', () => {
    const element = fixture.debugElement.nativeElement;
    const firstRadioButton = element.querySelector('#type-0');
    firstRadioButton.click();
    fixture.detectChanges();
    const totalItems = fixture.debugElement.nativeElement.querySelectorAll('div.govuk-grid-column-one-third').length;
    const firstItemDateMessage = fixture.debugElement.nativeElement.querySelector('.govuk-radios__conditional .govuk-form-group').childNodes[0].querySelector('p .govuk-hint');
    const firstItemLocationMessage = fixture.debugElement.nativeElement.querySelector('.govuk-radios__conditional .govuk-form-group').childNodes[0].querySelector('p').childNodes[0];
    const secondItemDateMessage = fixture.debugElement.nativeElement.querySelector('.govuk-radios__conditional .govuk-form-group').childNodes[0].querySelector('p .govuk-hint');
    // const thirdItemDateMessage = fixture.debugElement.nativeElement.querySelector('.govuk-radios__conditional .govuk-form-group').childNodes[3].querySelector('p .govuk-hint');
    expect(totalItems).toEqual(DUMMY_BOOKINGS.length);
    expect(firstItemDateMessage.textContent).toContain('14 June 2022 to 19 June 2022');
    expect(firstItemLocationMessage.textContent).toContain('Glasgow Tribunals Centre');
    expect(secondItemDateMessage.textContent).toContain('14 June 2022 to 19 June 2022');
    // expect(thirdItemDateMessage.textContent).toContain('01 January 2029 to 01 March 2029');
  });

  it('should display bookings disabled if future booking, enabled if current booking', () => {
    const element = fixture.debugElement.nativeElement;
    const firstRadioButton = element.querySelector('#type-0');
    firstRadioButton.click();
    fixture.detectChanges();
    const firstBookingButton = fixture.debugElement.nativeElement.querySelectorAll('.govuk-button-group button')[0];
    const secondBookingButton = fixture.debugElement.nativeElement.querySelectorAll('.govuk-button-group button')[1];
    // const thirdBookingButton = fixture.debugElement.nativeElement.querySelectorAll('.govuk-button-group button')[2];

    expect(firstBookingButton.disabled).toBeFalsy();
    expect(secondBookingButton.disabled).toBeFalsy();
    // expect(thirdBookingButton.disabled).toBeTruthy();
  });

  describe('onSelectOption()', () => {
    it('should change selectedBookingOption', () => {
      // Click on the second radio button.
      const element = fixture.debugElement.nativeElement;
      const secondRadioButton = element.querySelector('#type-1');
      secondRadioButton.click();
      expect(component.bookingProcess.selectedBookingOption).toEqual(1);
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
      expect(component.existingBookings[0].locationName).toEqual('Glasgow Tribunals Centre');
    });
  });

  describe('onExistingBookingSelected()', () => {
    it('should make a call to refreshRoleAssignments', fakeAsync(() => {
      mockRouter = {
        navigate: jasmine.createSpy('navigate')
      };
      fixture.detectChanges();
      component.onExistingBookingSelected(1);
      expect(bookingService.refreshRoleAssignments).toHaveBeenCalled();
    }));
  });
});
