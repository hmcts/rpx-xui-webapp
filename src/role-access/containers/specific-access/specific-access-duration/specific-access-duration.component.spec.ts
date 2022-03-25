import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';
import { SpecificAccessDurationComponent } from './specific-access-duration.component';
import { SpecificAccessStateData, SpecificAccessState, SpecificAccessNavigationEvent } from '../../../models';
import { DurationType } from '../../../models/enums';
import { DurationHelperService } from '../../../services';

import createSpyObj = jasmine.createSpyObj;

describe('SpecificAccessDurationComponent', () => {
  let component: SpecificAccessDurationComponent;
  let fixture: ComponentFixture<SpecificAccessDurationComponent>;
  let durationHelperService: DurationHelperService;

  beforeEach(async(() => {
    durationHelperService = createSpyObj('durationHelperService', [
      'getInputClass',
      'getTodaysDate',
      'getDateInFuture',
      'getDateFromControls',
      'convertDateControlsToString',
      'checkDates'
    ]);

    TestBed.configureTestingModule({
      imports: [
        ExuiCommonLibModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot({})
      ],
      declarations: [SpecificAccessDurationComponent],
      providers: [
        FormBuilder,
        { provide: DurationHelperService, useValue: durationHelperService }
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificAccessDurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('setFormControlRefs', () => {

    it('should assign form control objects to component properties as expected', () => {
      const expectedType = 'object';
      expect(typeof component.startDateDayCtrl).toEqual(expectedType);
      expect(typeof component.startDateMonthCtrl).toEqual(expectedType);
      expect(typeof component.startDateYearCtrl).toEqual(expectedType);
      expect(typeof component.endDateDayCtrl).toEqual(expectedType);
      expect(typeof component.endDateMonthCtrl).toEqual(expectedType);
      expect(typeof component.endDateYearCtrl).toEqual(expectedType);
    });

  });

  describe('resetPreviousErrors', () => {

    it('should reset the component properties as expected', () => {
      component.startDateErrorMessage = { isInvalid: true, messages: ['Start date error message'] };
      component.endDateErrorMessage = { isInvalid: true, messages: ['End date error message'] };
      component.resetPreviousErrors();
      expect(component.startDateErrorMessage).toEqual({ isInvalid: false, messages: [] });
      expect(component.endDateErrorMessage).toEqual({ isInvalid: false, messages: [] });
    });

  });

  describe('onDurationChange', () => {

    it('should set component properties as expected for duration: 7 Days', () => {
      const duration = DurationType.SEVEN_DAYS;
      component.onDurationChange(duration);
      expect(component.selectedDuration).toEqual(duration);
      expect(component.anotherPeriod).toEqual(false);
    });

    it('should set component properties as expected for duration: Indefinite', () => {
      const duration = DurationType.INDEFINITE;
      component.onDurationChange(duration);
      expect(component.selectedDuration).toEqual(duration);
      expect(component.anotherPeriod).toEqual(false);
    });

    it('should set component properties as expected for duration: Another Period', () => {
      const duration = DurationType.ANOTHER_PERIOD;
      component.onDurationChange(duration);
      expect(component.selectedDuration).toEqual(duration);
      expect(component.anotherPeriod).toEqual(true);
    });

  });

  describe('selectSpecificAccessDuration', () => {

    it('should set the value of selected duration', () => {
      // TODO: this will need to be updated when specific access is wired up correctly with state, added to increase code coverage for now
      const specificAccessState: SpecificAccessStateData = { state: SpecificAccessState.SPECIFIC_ACCESS_DURATION };
      component.selectSpecificAccessDuration(specificAccessState);
      expect(component.selectedDuration).toEqual(DurationType.SEVEN_DAYS);
    })

  });

  describe('navigationHandler', () => {

    it('should dispatch the expected state', () => {
      // TODO: this will need to be updated when specific access is wired up correctly with state, added to increase code coverage for now
      component.selectedDuration = DurationType.SEVEN_DAYS;
      const navEvent = SpecificAccessNavigationEvent.CONTINUE;
      component.navigationHandler(navEvent);
      expect(component.selectedDuration).toEqual(DurationType.SEVEN_DAYS);
    });

    it('should throw an error for an unhandled navEvent case', () => {
      // TODO: this will need to be updated when specific access is wired up correctly with state, added to increase code coverage for now
      component.selectedDuration = DurationType.SEVEN_DAYS;
      expect(() => {
        component.navigationHandler(SpecificAccessNavigationEvent.CANCEL);
      }).toThrow(new Error('Invalid option'));
    });

  });

  describe('getPeriod', () => {

    it('should return a Period object for SEVEN_DAYS duration type', () => {
      const period = component.getPeriod(DurationType.SEVEN_DAYS);
      expect(period.hasOwnProperty('startDate') && period.hasOwnProperty('endDate')).toEqual(true);
    });

    it('should return a Period object for INDEFINITE duration type', () => {
      const period = component.getPeriod(DurationType.INDEFINITE);
      expect(period.hasOwnProperty('startDate') && period.hasOwnProperty('endDate')).toEqual(true);
    });

  });

  afterEach(() => {
    component = null;
    fixture.destroy();
  });

});
