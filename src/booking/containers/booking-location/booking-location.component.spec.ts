import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { UserDetails, UserInfo } from '../../../app/models';
import { BookingNavigationEvent, BookingProcess } from '../../models';

import { BookingLocationComponent } from './booking-location.component';

describe('BookingLocationComponent', () => {
  let component: BookingLocationComponent;
  let fixture: ComponentFixture<BookingLocationComponent>;
  const storeMock = jasmine.createSpyObj('mockStore', ['pipe']);
  const userInfo: UserInfo = { id: '1', forename: 'Test', surname: 'User', email: 'testemail', active: true, roles: ['pui-case-manager'] };
  const roleAssignmentInfo = [];
  const userDetails: UserDetails = {
    sessionTimeout: {
      idleModalDisplayTime: 100,
      totalIdleTime: 0
    },
    canShareCases: true,
    userInfo,
    roleAssignmentInfo
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BookingLocationComponent],
      imports: [
        ReactiveFormsModule,
        StoreModule.forRoot({})
      ],
      providers: [
        {
          provide: Store,
          useValue: storeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingLocationComponent);
    component = fixture.componentInstance;
    component.bookingProcess = {} as BookingProcess;
    storeMock.pipe.and.returnValue(of(userDetails));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('page link events', () => {
    let eventTriggerSpy: jasmine.Spy;
    beforeEach(() => {
      eventTriggerSpy = spyOn(component.eventTrigger, 'emit');
      component.bookingProcess = { location: { court_name: 'London Court' } } as BookingProcess;
      fixture.detectChanges();
    });

    it('should NOT call the change location event trigger if the continue button is clicked and no location is selected', () => {
      const continueButton = fixture.debugElement.query(By.css('button'));
      continueButton.triggerEventHandler('click', null);
      expect(eventTriggerSpy).toHaveBeenCalledWith(BookingNavigationEvent.LOCATIONCONTINUE);
    });

    it('should call the change location event trigger if the continue button is clicked and a location is selected', () => {
      const continueButton = fixture.debugElement.query(By.css('button'));
      continueButton.triggerEventHandler('click', null);
      expect(eventTriggerSpy).toHaveBeenCalledWith(BookingNavigationEvent.LOCATIONCONTINUE);
    });
  });

  describe('on events', () => {
    let eventTriggerSpy: jasmine.Spy;
    let locationSearchFocusSpy: jasmine.Spy;
    beforeEach(() => {
      eventTriggerSpy = spyOn(component.eventTrigger, 'emit');
      locationSearchFocusSpy = spyOn(component, 'getLocationSearchFocus').and.callThrough();
      fixture.detectChanges();
    });

    it('should return focus to the location search field if no location is selected', () => {
      component.bookingProcess = { location: undefined } as BookingProcess;
      const continueButton = fixture.debugElement.query(By.css('button'));
      continueButton.triggerEventHandler('click', null);

      expect(locationSearchFocusSpy).toHaveBeenCalled();
      expect(eventTriggerSpy).not.toHaveBeenCalled();
    });

    it('should not have a form error if there is a valid location', () => {
      component.bookingProcess = { location: { court_name: 'London Court' } } as BookingProcess;
      component.onLocationChanged(component.bookingProcess.location);
      expect(component.formError).toBeFalsy();
    });
  });

  describe('getJurisdictions()', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should have no jurisdictions if the user does not have any role assignment info', () => {
      userDetails.roleAssignmentInfo = [];
      component.ngOnInit();
      expect(component.jurisdictions).toEqual('');
    });

    it('should compile a comma separated list of unique jurisdictions from the role assignment jurisdictions', () => {
      userDetails.roleAssignmentInfo = [{ jurisdiction: 'IA', isCaseAllocator: true, primaryLocation: '', bookable: true }, { jurisdiction: 'IA', isCaseAllocator: true, primaryLocation: '' }, { jurisdiction: 'IA', isCaseAllocator: true, primaryLocation: '' }, { jurisdiction: 'SSCS', isCaseAllocator: true, primaryLocation: '', bookable: true }];
      component.ngOnInit();
      expect(component.jurisdictions).toEqual('IA,SSCS');
    });
  });
});
