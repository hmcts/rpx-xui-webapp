import { inject, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { ValidatorsService } from './validators.service';

describe('ValidatorsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ValidatorsService,
      ]
    });
  });

  it('should be created', inject([ValidatorsService], (service: ValidatorsService) => {
    expect(service).toBeTruthy();
  }));

  it('should check numberMinMaxValidator', inject([ValidatorsService], (service: ValidatorsService) => {
    const control = new FormControl();

    control.setValidators(service.numberMinMaxValidator(5, 10));
    control.setValue(6);
    expect(control.hasError('isValid')).toBeFalsy();
  }));

  it('should check numberMultipleValidator', inject([ValidatorsService], (service: ValidatorsService) => {
    const control = new FormControl();

    control.setValidators(service.numberMultipleValidator(5));
    control.setValue(10);
    expect(control.hasError('isValid')).toBeFalsy();
  }));

  it('should check minutesValidator', inject([ValidatorsService], (service: ValidatorsService) => {
    const form = new FormGroup({
      hours: new FormControl(),
      minutes: new FormControl()
    });
    form.setValidators(service.minutesValidator(5, 360));
    form.controls.hours.setValue('0');
    form.controls.minutes.setValue('10');
    expect(form.hasError('isValid')).toBeFalsy();
  }));

  it('should check hearingDateValidator', inject([ValidatorsService], (service: ValidatorsService) => {
    const form = new FormGroup({
      day: new FormControl(),
      month: new FormControl(),
      year: new FormControl()
    });
    form.setValidators(service.hearingDateValidator());
    form.controls.day.setValue('12');
    form.controls.month.setValue('12');
    form.controls.year.setValue('2021');
    expect(form.hasError('isValid')).toBeFalsy();
  }));
});
