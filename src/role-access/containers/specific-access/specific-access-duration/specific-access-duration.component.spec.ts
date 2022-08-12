import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';
import { StoreModule } from '@ngrx/store';

import { SpecificAccessStateData, SpecificAccessState, SpecificAccessNavigationEvent } from '../../../models';
import { AccessReason, DurationType } from '../../../models/enums';
import { DurationHelperService } from '../../../services';
import { SpecificAccessDurationComponent } from './specific-access-duration.component';

describe('SpecificAccessDurationComponent', () => {
  let component: SpecificAccessDurationComponent;
  let fixture: ComponentFixture<SpecificAccessDurationComponent>;

  beforeEach(async(() => {
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
        { provide: DurationHelperService, useClass: DurationHelperService }
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
      const period = component.getPeriod(DurationType.INDEFINITE);
      const specificAccessState: SpecificAccessStateData = {
        state: SpecificAccessState.SPECIFIC_ACCESS_DURATION,
        accessReason: AccessReason.APPROVE_REQUEST,
        typeOfRole: {id: 'specific-access-granted', name: 'specific-access-granted'},
        period,
        caseName: 'Example name',
        actorId: 'N/A',
        requestCreated: null,
        caseId: '1594717367271986',
        taskId: 'd3f939d2-d4f3-11ec-8d51-b6ad61ebbb09',
        requestId: '59bedc19-9cc6-4bff-9f58-041c3ba664a0',
        jurisdiction: 'IA',
        roleCategory: 'LEGAL_OPERATIONS',
        requestedRole: 'specific-access-legal-ops',
        person: {id: 'db17f6f7-1abf-4223-8b5e-1eece04ee5d8', name: null, domain: null},
        specificAccessFormData: {
          specificAccessDurationForm: {
            selectedOption: DurationType.SEVEN_DAYS,
            selectedDuration: {
              startDate: {
                day: 11,
                month: 11,
                year: 2024
              },
              endDate: {
                day: 11,
                month: 11,
                year: 2024
              }
            }
          }
        }
      }
      component.selectSpecificAccessDuration(specificAccessState);
      expect(component.selectedDuration).toEqual(DurationType.SEVEN_DAYS);
    })

  });

  describe('selectSpecificAccessDuration with formdata', () => {

    it('should set the value of selected duration', () => {
      const period = component.getPeriod(DurationType.INDEFINITE);
      const specificAccessState: SpecificAccessStateData = {
        state: SpecificAccessState.SPECIFIC_ACCESS_DURATION,
        accessReason: AccessReason.APPROVE_REQUEST,
        typeOfRole: {id: 'specific-access-granted', name: 'specific-access-granted'},
        period,
        actorId: 'N/A',
        caseName: 'Example case name',
        requestCreated: 'null',
        caseId: '1594717367271987',
        taskId: 'd3f939d2-d4f3-11ec-8d51-b6ad61ebbb09',
        requestId: '59bedc19-9cc6-4bff-9f58-041c3ba664a0',
        jurisdiction: 'IA',
        roleCategory: 'LEGAL_OPERATIONS',
        requestedRole: 'specific-access-legal-ops',
        person: {id: 'db17f6f7-1abf-4223-8b5e-1eece04ee5d8', name: null, domain: null},
        specificAccessFormData: {
          specificAccessDurationForm: {
            selectedOption: DurationType.ANOTHER_PERIOD,
            selectedDuration: {
              startDate: {
              },
              endDate: {
              }
            }
          }
        }
      }
      // fake form group and form control values
      component.startDateDayCtrl = new FormControl(7);
      component.startDateMonthCtrl = new FormControl(7);
      component.startDateYearCtrl = new FormControl(2025);
      component.endDateDayCtrl = new FormControl(8);
      component.endDateMonthCtrl = new FormControl(7);
      component.endDateYearCtrl = new FormControl(2025);
      component.formGroup = new FormGroup({});

      component.selectSpecificAccessDuration(specificAccessState);
      expect(component.selectedDuration).toEqual(DurationType.ANOTHER_PERIOD);
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

    it('should throw an error if Period is undefined', () => {
      // TODO: this will need to be updated when specific access is wired up correctly with state, added to increase code coverage for now
      component.selectedDuration = DurationType.ANOTHER_PERIOD;
      expect(() => {
        component.navigationHandler(SpecificAccessNavigationEvent.CONTINUE);
      }).toThrow(new Error('Invalid period'));
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

    it('should return a Period object for ANOTHER_PERIOD duration type', () => {
      // fake form group and form control values
      component.startDateDayCtrl = new FormControl(7);
      component.startDateMonthCtrl = new FormControl(7);
      component.startDateYearCtrl = new FormControl(2025);

      component.endDateDayCtrl = new FormControl(8);
      component.endDateMonthCtrl = new FormControl(7);
      component.endDateYearCtrl = new FormControl(2025);

      component.formGroup = new FormGroup({});

      const period = component.getPeriod(DurationType.ANOTHER_PERIOD);
      expect(period.hasOwnProperty('startDate') && period.hasOwnProperty('endDate')).toEqual(true);
    });

    it('should return control values when getRawData called', () => {
      // fake form group and form control values
      component.startDateDayCtrl = new FormControl(7);
      component.startDateMonthCtrl = new FormControl(7);
      component.startDateYearCtrl = new FormControl(2025);

      component.endDateDayCtrl = new FormControl(8);
      component.endDateMonthCtrl = new FormControl(7);
      component.endDateYearCtrl = new FormControl(2025);

      component.formGroup = new FormGroup({});

      const period = component.getRawData();
      expect(period.endDate.day).toEqual(8);
      expect(period.endDate.month).toEqual(7);
      expect(period.endDate.year).toEqual(2025);
      expect(period.startDate.day).toEqual(7);
      expect(period.startDate.month).toEqual(7);
      expect(period.startDate.year).toEqual(2025);
      expect(period.hasOwnProperty('startDate') && period.hasOwnProperty('endDate')).toEqual(true);
    });

    it('should display invalid date messages', () => {
      component.startDateDayCtrl = new FormControl(99);
      component.startDateMonthCtrl = new FormControl(99);
      component.startDateYearCtrl = new FormControl(2025);

      component.endDateDayCtrl = new FormControl(99);
      component.endDateMonthCtrl = new FormControl(99);
      component.endDateYearCtrl = new FormControl(2025);

      component.getPeriod(DurationType.ANOTHER_PERIOD);
      expect(component.startDateErrorMessage).toEqual({ isInvalid : true, messages: ['Invalid Start date'] });
      expect(component.endDateErrorMessage).toEqual({ isInvalid : true, messages: ['Invalid End date'] });
    });

    it('should display start date in past error message', () => {
      component.startDateDayCtrl = new FormControl(1);
      component.startDateMonthCtrl = new FormControl(1);
      component.startDateYearCtrl = new FormControl(2021);

      component.endDateDayCtrl = new FormControl(2);
      component.endDateMonthCtrl = new FormControl(1);
      component.endDateYearCtrl = new FormControl(2021);

      component.getPeriod(DurationType.ANOTHER_PERIOD);
      expect(component.startDateErrorMessage).toEqual({ isInvalid : true, messages: ['The access start date must not be in the past'] });
    });

    it('should display end date must be after start date message', () => {
      component.startDateDayCtrl = new FormControl(2);
      component.startDateMonthCtrl = new FormControl(1);
      component.startDateYearCtrl = new FormControl(2021);

      component.endDateDayCtrl = new FormControl(1);
      component.endDateMonthCtrl = new FormControl(1);
      component.endDateYearCtrl = new FormControl(2021);

      component.getPeriod(DurationType.ANOTHER_PERIOD);
      expect(component.endDateErrorMessage).toEqual( { isInvalid: true, messages: ['The access end date must be after the access start date']});
    });

  });

  afterEach(() => {
    component = null;
    fixture.destroy();
  });

});
