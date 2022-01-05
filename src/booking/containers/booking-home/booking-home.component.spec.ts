import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { WindowService } from '@hmcts/ccd-case-ui-toolkit';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { of } from 'rxjs';
import { BookingProcess } from '../../models';
import { Booking } from '../../models/booking.interface';
import { BookingService } from '../../services';
import { BookingHomeComponent } from './booking-home.component';

const DUMMY_BOOKINGS: Booking[] = [{
  userId: 'Dummy User Id',
  appointmentId: 'Dummy Appointment Id',
  roleId: 'Dummy Role Id',
  contract_type_id: 'Dummy Contract Type Id',
  base_location_id: '101',
  region_id: 'Dummy Region Id',
  beginTime: new Date('2021-12-01T09:58:39.930+0000'),
  endTime: new Date('2022-01-01T09:58:39.930+0000'),
  created: new Date('2021-12-01T09:58:39.930+0000'),
},
{
  userId: 'Dummy User Id',
  appointmentId: 'Dummy Appointment Id',
  roleId: 'Dummy Role Id',
  contract_type_id: 'Dummy Contract Type Id',
  base_location_id: '101',
  region_id: 'Dummy Region Id',
  beginTime: new Date('2021-12-02T09:58:39.930+0000'),
  endTime: new Date('2022-02-01T09:58:39.930+0000'),
  created: new Date('2021-12-01T09:58:39.930+0000'),
},
{
  userId: 'Dummy User Id',
  appointmentId: 'Dummy Appointment Id',
  roleId: 'Dummy Role Id',
  contract_type_id: 'Dummy Contract Type Id',
  base_location_id: '102',
  region_id: 'Dummy Region Id',
  beginTime: new Date('2029-01-01T09:58:39.930+0000'),
  endTime: new Date('2029-03-01T09:58:39.930+0000'),
  created: new Date('2029-12-01T09:58:39.930+0000'),
}];


const DUMMY_LOCATION_NAME: string = 'Some place name';

describe('BookingHomeComponent', () => {
  let component: BookingHomeComponent;
  let fixture: ComponentFixture<BookingHomeComponent>;
  const bookingService = jasmine.createSpyObj<BookingService>('BookingService', ['getBookings', 'getBookingLocation', 'refreshRoleAssignments']);
  const mockWindowService = jasmine.createSpyObj('WindowService', ['removeLocalStorage']);
  const flags = {
    enabledFlag: true,
    disabledFlag: false
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule
      ],
      declarations: [ BookingHomeComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
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

    bookingService.getBookings.and.returnValue(of({bookings: DUMMY_BOOKINGS}));
    bookingService.getBookingLocation.and.returnValue(of([{
      building_location_name: DUMMY_LOCATION_NAME
    }]));
    bookingService.refreshRoleAssignments.and.returnValue(of({}));

    fixture = TestBed.createComponent(BookingHomeComponent);
    component = fixture.componentInstance;
    component.bookingProcess = {} as BookingProcess;
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

  it('should display bookings in sorted order when there are existing bookings and first radio button is clicked', () => {
    const element = fixture.debugElement.nativeElement;
    const firstRadioButton = element.querySelector('#type-0');
    firstRadioButton.click();
    fixture.detectChanges();

    const totalItems = fixture.debugElement.nativeElement.querySelectorAll('div.govuk-grid-column-one-third').length;
    const firstItemDateMessage = fixture.debugElement.nativeElement.querySelector('.govuk-radios__conditional .govuk-form-group').childNodes[1].querySelector('p .govuk-hint');
    const firstItemLocationMessage = fixture.debugElement.nativeElement.querySelector('.govuk-radios__conditional .govuk-form-group').childNodes[1].querySelector('p').childNodes[0];
    const secondItemDateMessage = fixture.debugElement.nativeElement.querySelector('.govuk-radios__conditional .govuk-form-group').childNodes[2].querySelector('p .govuk-hint');
    const thirdItemDateMessage = fixture.debugElement.nativeElement.querySelector('.govuk-radios__conditional .govuk-form-group').childNodes[3].querySelector('p .govuk-hint');
    expect(totalItems).toEqual(DUMMY_BOOKINGS.length);
    expect(firstItemDateMessage.textContent).toContain('01 December 2021 to 01 January 2022');
    expect(firstItemLocationMessage.textContent).toContain('Some place name');
    expect(secondItemDateMessage.textContent).toContain('02 December 2021 to 01 February 2022');
    expect(thirdItemDateMessage.textContent).toContain('01 January 2029 to 01 March 2029');
  });

  it('should display bookings disabled if future booking, enabled if current booking', () => {
    const element = fixture.debugElement.nativeElement;
    const firstRadioButton = element.querySelector('#type-0');
    firstRadioButton.click();
    fixture.detectChanges();
    const firstBookingButton = fixture.debugElement.nativeElement.querySelectorAll('.govuk-button-group button')[0];
    const secondBookingButton = fixture.debugElement.nativeElement.querySelectorAll('.govuk-button-group button')[1];
    const thirdBookingButton = fixture.debugElement.nativeElement.querySelectorAll('.govuk-button-group button')[2];

    expect(firstBookingButton.disabled).toBeFalsy();
    expect(secondBookingButton.disabled).toBeFalsy();
    expect(thirdBookingButton.disabled).toBeTruthy();
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

      expect(component.existingBookings[0].locationName).toEqual('Some place name');
    });
  });

  describe('onExistingBookingSelected()', () => {

    it('should make a call to refreshRoleAssignments', () => {
      component.onExistingBookingSelected(1);
      expect(bookingService.refreshRoleAssignments).toHaveBeenCalled();
    });
  });
});
