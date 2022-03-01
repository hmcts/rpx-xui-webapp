import { inject, TestBed } from '@angular/core/testing';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { HearingDateEnum } from '../models/hearings.enum';
import { ValidatorsUtils } from './validators.utils';

describe('ValidatorsUtils', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ValidatorsUtils,
      ]
    });
  });

  it('should be created', inject([ValidatorsUtils], (service: ValidatorsUtils) => {
    expect(service).toBeTruthy();
  }));

  it('should check numberMinMaxValidator', inject([ValidatorsUtils], (service: ValidatorsUtils) => {
    const control = new FormControl();

    control.setValidators(service.numberMinMaxValidator(5, 10));
    control.setValue(6);
    expect(control.hasError('isValid')).toBeFalsy();
  }));


  it('should check numberLargerThanValidator', inject([ValidatorsUtils], (service: ValidatorsUtils) => {
    const control = new FormControl();

    control.setValidators(service.numberLargerThanValidator(0));
    control.setValue(6);
    expect(control.hasError('isValid')).toBeFalsy();
  }));

  it('should check numberMultipleValidator', inject([ValidatorsUtils], (service: ValidatorsUtils) => {
    const control = new FormControl();

    control.setValidators(service.numberMultipleValidator(5));
    control.setValue(10);
    expect(control.hasError('isValid')).toBeFalsy();
  }));

  it('should check minutesValidator', inject([ValidatorsUtils], (service: ValidatorsUtils) => {
    const form = new FormGroup({
      hours: new FormControl(),
      minutes: new FormControl()
    });
    form.setValidators(service.minutesValidator(5, 55, 360));
    form.controls.hours.setValue('0');
    form.controls.minutes.setValue('10');
    expect(form.hasError('isValid')).toBeFalsy();
  }));

  it('should check errorValidator', inject([ValidatorsUtils], (service: ValidatorsUtils) => {
    const form = new FormControl();
    form.setValidators(service.errorValidator('message'));
    expect(form.hasError('error')).toBeFalsy();
  }));

  it('should check hearingDateValidator', inject([ValidatorsUtils], (service: ValidatorsUtils) => {
    const form = new FormGroup({
      day: new FormControl(),
      month: new FormControl(),
      year: new FormControl()
    });
    const control = new FormControl();
    control.setValue('null-null-null');
    form.setValidators(service.hearingDateValidator());
    form.controls.day.setValue('12');
    form.controls.month.setValue('12');
    form.controls.year.setValue('2021');
    expect(form.hasError('isValid')).toBeFalsy();
    form.controls.day.setValue('12');
    form.controls.month.setValue('12');
    form.controls.year.setValue('2022');
    expect(form.hasError('isValid')).toBeFalsy();
  }));

  it('should check calcBusinessDays', inject([ValidatorsUtils], (service: ValidatorsUtils) => {
    expect(service.calcBusinessDays(moment('23-12-2022', HearingDateEnum.DefaultFormat), moment('26-12-2022', HearingDateEnum.DefaultFormat))).toBe(2);
    expect(service.calcBusinessDays(moment('24-12-2022', HearingDateEnum.DefaultFormat), moment('25-12-2022', HearingDateEnum.DefaultFormat))).toBe(0);
  }));

  it('should check hearingDateRangeValidator', inject([ValidatorsUtils], (service: ValidatorsUtils) => {
    const form = new FormGroup({
      earliestHearing: new FormGroup({
        day: new FormControl(),
        month: new FormControl(),
        year: new FormControl(),
      }),
      latestHearing: new FormGroup({
        day: new FormControl(),
        month: new FormControl(),
        year: new FormControl(),
      }),
    });
    form.setValidators(service.hearingDateRangeValidator());
    form.controls.earliestHearing.get('day').setValue('12');
    form.controls.earliestHearing.get('month').setValue('12');
    form.controls.earliestHearing.get('year').setValue('2022');
    expect(form.hasError('isValid')).toBeFalsy();
    form.setValidators(service.hearingDateRangeValidator());
    form.controls.latestHearing.get('day').setValue('12');
    form.controls.latestHearing.get('month').setValue('12');
    form.controls.latestHearing.get('year').setValue('2022');
    expect(form.hasError('isValid')).toBeFalsy();
  }));

  it('should check formArraySelectedValidator', inject([ValidatorsUtils], (service: ValidatorsUtils) => {
    const form = new FormGroup({
      arrayControl: new FormArray([new FormGroup({
        selection: new FormGroup({})
      })]
      ),
    });
    form.setValidators(service.formArraySelectedValidator());
    expect(form.hasError('isValid')).toBeFalsy();
  }));

  it('should set time 12:00 as valid', inject([ValidatorsUtils], (service: ValidatorsUtils) => {
    const form = new FormGroup({
      arrayControl: new FormControl('12:00', service.validTime())
    });
    form.get('arrayControl').setValue('12:00');
    form.updateValueAndValidity();
    expect(form.hasError('isValid')).toBeFalsy();
  }));

  it('should set time 33:00 as invalid', inject([ValidatorsUtils], (service: ValidatorsUtils) => {
    const form = new FormGroup({
      arrayControl: new FormControl('33:00', [service.validTime()])
    });
    expect(form.get('arrayControl').hasError('invalidTime')).toBeTruthy();
  }));

  it('should set startTime 13:00 and endTime 12:00 to be invalid', inject([ValidatorsUtils], (service: ValidatorsUtils) => {
    const form = new FormGroup({
      start: new FormControl('13:00', [service.validTime()]),
      end: new FormControl('13:00', [service.validTime()])
    }, { validators: [service.validateTimeRange('start', 'end')] });
    expect(form.hasError('invalidTimeRange')).toBeTruthy();
  }));

  it('should set startTime 12:00 and endTime 13:00 to be valid', inject([ValidatorsUtils], (service: ValidatorsUtils) => {
    const form = new FormGroup({
      start: new FormControl('12:00', [service.validTime()]),
      end: new FormControl('13:00', [service.validTime()])
    }, { validators: [service.validateTimeRange('start', 'end')] });
    expect(form.valid).toBeTruthy();
  }));
});
