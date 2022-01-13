import { inject, TestBed } from '@angular/core/testing';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
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
    form.setValidators(service.minutesValidator(5, 360));
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
    form.controls.earliestHearing.get('year').setValue('2021');
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
});
