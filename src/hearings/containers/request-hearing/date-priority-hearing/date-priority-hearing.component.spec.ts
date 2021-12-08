import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import * as moment from 'moment';
import { HearingDatePriorityEnum } from 'src/hearings/models/hearings.enum';
import { ErrorMessage } from '../../../../app/models';
import { PartyUnavailabilityRange } from '../../../../hearings/models/partyUnavilabilityRange.model';
import { RefDataModel } from '../../../../hearings/models/refData.model';
import { HearingsService } from '../../../../hearings/services/hearings.service';
import { ValidatorsService } from '../../../../hearings/services/validators.service';
import { DatePriorityHearingComponent } from './date-priority-hearing.component';
import createSpyObj = jasmine.createSpyObj;

@Component({
  selector: 'exui-hearing-parties-title',
  template: '',
})
class MockHearingPartiesComponent {
  @Input() public error: ErrorMessage;
}

describe('DatePriorityHearingComponent', () => {
  let component: DatePriorityHearingComponent;
  let fixture: ComponentFixture<DatePriorityHearingComponent>;
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule,
        HttpClientTestingModule],
      declarations: [DatePriorityHearingComponent, MockHearingPartiesComponent],
      providers: [
        provideMockStore(),
        HearingsService,
        ValidatorsService,
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
    fixture = TestBed.createComponent(DatePriorityHearingComponent);
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
    hearingAvailability.setValue('yes');
    component.showDateAvailability();
    expect(component.checkedHearingAvailability).toBe('yes');
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

  it('should get Hearing Length check', () => {
    component.checkFormData();
    expect(component.hearingLengthErrorValue).toBe(HearingDatePriorityEnum.LengthError);
    component.priorityForm.controls.durationLength.markAsTouched();
    component.priorityForm.controls.durationLength.get('hours').setValue('1');
    component.priorityForm.controls.durationLength.get('minutes').setValue('qer');
    component.checkFormData();
    expect(component.hearingLengthErrorValue).toBe(HearingDatePriorityEnum.LengthMinutesError);
    component.priorityForm.controls.durationLength.markAsTouched();
    component.priorityForm.controls.durationLength.get('hours').setValue('1');
    component.priorityForm.controls.durationLength.get('minutes').setValue('3000');
    component.checkFormData();
    expect(component.hearingLengthErrorValue).toBe(HearingDatePriorityEnum.TotalLengthError);
  });

  afterEach(() => {
    fixture.destroy();
  });
});
