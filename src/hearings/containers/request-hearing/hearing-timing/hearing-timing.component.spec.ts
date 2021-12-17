import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Component, Input, NO_ERRORS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {Store} from '@ngrx/store';
import {provideMockStore} from '@ngrx/store/testing';
import * as moment from 'moment';
import {of} from 'rxjs';
import {ErrorMessage} from '../../../../app/models';
import {ACTION, HearingDatePriorityEnum, RadioOptions} from '../../../models/hearings.enum';
import {PartyUnavailabilityRange} from '../../../models/partyUnavilabilityRange.model';
import {RefDataModel} from '../../../models/refData.model';
import {HearingsService} from '../../../services/hearings.service';
import {ValidatorsUtils} from '../../../utils/validators.utils';
import {HearingTimingComponent} from './hearing-timing.component';

@Component({
  selector: 'exui-hearing-parties-title',
  template: '',
})
class MockHearingPartiesComponent {
  @Input() public error: ErrorMessage;
}

describe('HearingTimingComponent', () => {
  const mockedHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post']);
  const hearingsService = new HearingsService(mockedHttpClient);
  hearingsService.navigateAction$ = of(ACTION.CONTINUE);

  let component: HearingTimingComponent;
  let fixture: ComponentFixture<HearingTimingComponent>;
  let router: Router;
  let mockStore: any;
  const priorities: RefDataModel[] = [
    {
      key: 'urgent',
      value_en: 'Urgent',
      value_cy: '',
      hintText_EN: 'Urgent',
      hintTextCY: '',
      order: 1,
      parentKey: null,
    }];

  const initialState = {
    hearings: {
      hearingList: {
        caseHearingMainModel: [
          {
            hmctsServiceID: 'SSCS'
          }
        ]
      },
      hearingValues: null,
      hearingRequest: null,
      hearingConditions: null,
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule,
        HttpClientTestingModule],
      declarations: [HearingTimingComponent, MockHearingPartiesComponent],
      providers: [
        provideMockStore({initialState}),
        {provide: HearingsService, useValue: hearingsService},
        ValidatorsUtils,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                hearingPriorities: priorities
              }
            },
          }
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  });

  beforeEach(() => {
    mockStore = TestBed.get(Store);
    mockStore = jasmine.createSpyObj('Store', ['pipe', 'dispatch']);
    fixture = TestBed.createComponent(HearingTimingComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set checkedHearingAvailability', () => {
    const hearingAvailability = component.priorityForm.controls.specificDate;
    component.showDateAvailability();
    expect(component.checkedHearingAvailability).toBe('');
    hearingAvailability.setValue(RadioOptions.YES);
    component.showDateAvailability();
    expect(component.checkedHearingAvailability).toBe(RadioOptions.YES);
    hearingAvailability.setValue(RadioOptions.CHOOSE_DATE_RANGE);
    component.showDateAvailability();
    expect(component.checkedHearingAvailability).toBe(RadioOptions.CHOOSE_DATE_RANGE);
  });

  it('should set showHearingDateError', () => {
    const hearingAvailability = component.priorityForm.controls.specificDate;
    component.showHearingDateError();
    expect(component.hearingPriorityDateError).toBe(HearingDatePriorityEnum.PriorityDateError);
    hearingAvailability.setValue(RadioOptions.YES);
    component.showHearingDateError();
    expect(component.hearingPriorityDateError).toBe(HearingDatePriorityEnum.PriorityDateError);
    hearingAvailability.setValue(RadioOptions.CHOOSE_DATE_RANGE);
    component.showHearingDateError();
    expect(component.hearingPriorityDateError).toBe(HearingDatePriorityEnum.PriorityDateError);
  });

  it('should check unavailable dates list', () => {
    component.partiesNotAvailableDates = [];
    const unavailabilityDates: PartyUnavailabilityRange[] = [
      {
        start: '2021-12-10T09:00:00.000+0000',
        end: '2021-12-31T09:00:00.000+0000',
      },
      {
        start: '2021-12-10T09:00:00.000+0000',
        end: '2021-12-31T09:00:00.000+0000',
      },
    ];
    component.checkUnavailableDatesList(unavailabilityDates);
    expect(component.partiesNotAvailableDates[2]).toBe('14 December 2021');
    expect(component.partiesNotAvailableDates.length).toBe(16);
  });

  it('should set unavailable dates', () => {
    component.partiesNotAvailableDates = [];
    const unavailabilityDate: PartyUnavailabilityRange = {
      start: '2021-12-10T09:00:00.000+0000',
      end: '2021-12-11T09:00:00.000+0000',
    };
    component.checkUnavailableDatesList([unavailabilityDate]);
    expect(component.partiesNotAvailableDates[0]).toBe('10 December 2021');
  });


  it('should set unavailable dates', () => {
    component.partiesNotAvailableDates = [];
    const unavailabilityDate: PartyUnavailabilityRange = {
      start: '2021-12-10T09:00:00.000+0000',
      end: '2021-12-11T09:00:00.000+0000',
    };
    component.checkUnavailableDatesList([unavailabilityDate]);
    expect(component.partiesNotAvailableDates[0]).toBe('10 December 2021');
  });

  it('should check isWeekDay', () => {
    expect(component.isWeekDay(moment('9-12-2021'))).toBe(false);
  });

  it('should get Formatted Date', () => {
    const form = new FormGroup({
      given_day: new FormControl(),
      given_month: new FormControl(),
      given_year: new FormControl()
    });
    form.controls.given_day.setValue('12');
    expect((component as any).getDateFormatted(form, 'given')).toBe('12-null-null');
  });

  it('should get empty Formatted Date', () => {
    const form = new FormGroup({
      given_day: new FormControl(),
      given_month: new FormControl(),
      given_year: new FormControl()
    });
    form.controls.given_day.setValue('');
    form.controls.given_month.setValue('');
    form.controls.given_year.setValue('');
    expect((component as any).getDateFormatted(form, 'given')).toBe(null);
  });

  it('should check Hearing Length', () => {
    component.showHearingLengthError();
    expect(component.hearingLengthErrorValue).toBe(HearingDatePriorityEnum.LengthError);
    component.priorityForm.controls.durationLength.markAsDirty();
    component.priorityForm.controls.durationLength.get('hours').setValue('1');
    component.priorityForm.controls.durationLength.get('minutes').setValue('qer');
    component.showHearingLengthError();
    expect(component.hearingLengthErrorValue).toBe(HearingDatePriorityEnum.LengthMinutesError);
    component.priorityForm.controls.durationLength.markAsTouched();
    component.priorityForm.controls.durationLength.get('hours').setValue('1');
    component.priorityForm.controls.durationLength.get('minutes').setValue('3000');
    component.showHearingLengthError();
    expect(component.hearingLengthErrorValue).toBe(HearingDatePriorityEnum.TotalLengthError);
  });

  it('should check date selection invalid', () => {
    component.firstDateOfHearingError = null;
    component.firstHearingFormGroup.get('firstHearingDate_day').setValue('12');
    component.showChoosenDateError();
    expect(component.firstDateOfHearingError.isInvalid).toBeTruthy();
  });

  it('should check date selection valid', () => {
    component.firstDateOfHearingError = null;
    component.firstHearingFormGroup.get('firstHearingDate_day').setValue('25');
    component.firstHearingFormGroup.get('firstHearingDate_month').setValue('10');
    component.firstHearingFormGroup.get('firstHearingDate_year').setValue('2022');
    component.showChoosenDateError();
    expect(component.firstDateOfHearingError).toBe(null);
  });

  it('should check date selection weekend', () => {
    component.firstDateOfHearingError = null;
    component.firstHearingFormGroup.get('firstHearingDate_day').setValue('15');
    component.firstHearingFormGroup.get('firstHearingDate_month').setValue('10');
    component.firstHearingFormGroup.get('firstHearingDate_year').setValue('2022');
    component.showChoosenDateError();
    expect(component.firstDateOfHearingError.isInvalid).toBeTruthy();
  });

  it('should check date selection past date', () => {
    component.firstDateOfHearingError = null;
    component.firstHearingFormGroup.get('firstHearingDate_day').setValue('15');
    component.firstHearingFormGroup.get('firstHearingDate_month').setValue('10');
    component.firstHearingFormGroup.get('firstHearingDate_year').setValue('2020');
    component.showChoosenDateError();
    expect(component.firstDateOfHearingError.isInvalid).toBeTruthy();
  });

  it('should check date selection format', () => {
    component.firstDateOfHearingError = null;
    component.firstHearingFormGroup.get('firstHearingDate_day').setValue('ewr');
    component.firstHearingFormGroup.get('firstHearingDate_month').setValue('10');
    component.firstHearingFormGroup.get('firstHearingDate_year').setValue('2020');
    component.showChoosenDateError();
    expect(component.firstDateOfHearingError.isInvalid).toBeTruthy();
  });

  it('should check date selection format', () => {
    component.checkFormData();
    expect(component.priorityForm.valid).toBeFalsy();
  });

  afterEach(() => {
    fixture.destroy();
  });
});
