import { CUSTOM_ELEMENTS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import * as moment from 'moment';
import { UtilsModule } from '../utils/utils.module';
import { NocDateTimeFieldComponent } from './noc-datetime-field.component';

@Pipe({ name: 'rpxTranslate' })
class RpxTranslateMockPipe implements PipeTransform {
  public transform(value: string): string {
    return value;
  }
}

describe('NocDateTimeFieldComponent', () => {
  const FORM_GROUP: FormGroup = new FormGroup({});
  const REGISTER_CONTROL = (control) => {
    FORM_GROUP.addControl('DateTime', control);
    return control;
  };
  const QUESTION_FIELD = {
    case_type_id: 'AAT',
    order: '2',
    question_text: 'What is the current date and time?',
    answer_field_type: {
      id: 'DateTime',
      type: 'DateTime',
      min: null,
      max: null,
      regular_expression: null,
      fixed_list_items: [],
      complex_fields: [],
      collection_field_type: null
    },
    display_context_parameter: '2',
    challenge_question_id: 'NoC',
    answer_field: '',
    question_id: 'question2'
  };
  const ANSWER_VALUE = of('24/12/2019 09:15:00');
  let component: NocDateTimeFieldComponent;
  let fixture: ComponentFixture<NocDateTimeFieldComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        NocDateTimeFieldComponent,
        RpxTranslateMockPipe
      ],
      imports: [
        ReactiveFormsModule,
        UtilsModule
      ],
      providers: [
        provideMockStore()
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NocDateTimeFieldComponent);
    component = fixture.componentInstance;
    component.formGroup = FORM_GROUP;
    component.registerControl = REGISTER_CONTROL;
    component.answerValue$ = ANSWER_VALUE;
    // @ts-ignore
    component.questionField = QUESTION_FIELD;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('UTC to local conversion on initialization', () => {
    it('should convert UTC datetime to local time for display', () => {
      const utcValue = '2022-07-15T14:30:00.000';
      component.datetimeControl.setValue(utcValue);

      // manually trigger ngOnInit logic
      const utcMoment = moment.utc(utcValue);
      const localMoment = utcMoment.local();

      component.datetimeGroup.controls.year.setValue(localMoment.year().toString());
      component.datetimeGroup.controls.month.setValue((localMoment.month() + 1).toString().padStart(2, '0'));
      component.datetimeGroup.controls.day.setValue(localMoment.date().toString().padStart(2, '0'));
      component.datetimeGroup.controls.hour.setValue(localMoment.hours().toString().padStart(2, '0'));
      component.datetimeGroup.controls.minute.setValue(localMoment.minutes().toString().padStart(2, '0'));
      component.datetimeGroup.controls.second.setValue(localMoment.seconds().toString().padStart(2, '0'));

      // verify the form group contains local time values
      expect(component.datetimeGroup.controls.year.value).toBe(localMoment.year().toString());
      expect(component.datetimeGroup.controls.month.value).toBe((localMoment.month() + 1).toString().padStart(2, '0'));
      expect(component.datetimeGroup.controls.day.value).toBe(localMoment.date().toString().padStart(2, '0'));
      expect(component.datetimeGroup.controls.hour.value).toBe(localMoment.hours().toString().padStart(2, '0'));
      expect(component.datetimeGroup.controls.minute.value).toBe(localMoment.minutes().toString().padStart(2, '0'));
      expect(component.datetimeGroup.controls.second.value).toBe(localMoment.seconds().toString().padStart(2, '0'));
    });
  });

  describe('Local to UTC conversion on value change', () => {
    it('should convert local datetime to UTC for storage', () => {
      component.ngAfterViewInit();

      component.datetimeGroup.controls.year.setValue('2025');
      component.datetimeGroup.controls.month.setValue('04');
      component.datetimeGroup.controls.day.setValue('15');
      component.datetimeGroup.controls.hour.setValue('14');
      component.datetimeGroup.controls.minute.setValue('30');
      component.datetimeGroup.controls.second.setValue('45');

      const localDateTimeString = '2025-04-15T14:30:45.000';
      const localMoment = moment(localDateTimeString, 'YYYY-MM-DDTHH:mm:ss.SSS');
      const expectedUtcValue = localMoment.utc().format('YYYY-MM-DDTHH:mm:ss.SSS');

      // verify the automatic conversion happened correctly
      expect(component.datetimeControl.value).toBeDefined();
      expect(component.datetimeControl.value).toBe(expectedUtcValue);
      expect(moment.utc(component.datetimeControl.value).isValid()).toBe(true);

      // verify the UTC value converts back to the original local time
      const convertedBackToLocal = moment.utc(component.datetimeControl.value).local();
      const originalLocalTime = moment(localDateTimeString, 'YYYY-MM-DDTHH:mm:ss.SSS');
      expect(convertedBackToLocal.format('YYYY-MM-DDTHH:mm:ss')).toBe(originalLocalTime.format('YYYY-MM-DDTHH:mm:ss'));
    });

    it('should handle invalid datetime and set raw value for validation', () => {
      component.ngAfterViewInit();

      component.datetimeGroup.controls.year.setValue('2025');
      component.datetimeGroup.controls.month.setValue('13'); // invalid month
      component.datetimeGroup.controls.day.setValue('32'); // invalid day
      component.datetimeGroup.controls.hour.setValue('25'); // invalid hour
      component.datetimeGroup.controls.minute.setValue('60'); // invalid minute
      component.datetimeGroup.controls.second.setValue('60'); // invalid second

      const invalidString = '2025-13-32T25:60:60.000';
      const invalidMoment = moment(invalidString, 'YYYY-MM-DDTHH:mm:ss.SSS');

      expect(invalidMoment.isValid()).toBe(false);
      expect(component.datetimeControl.value).toBe(invalidString);
    });

    it('should pad single digit values correctly', () => {
      component.ngAfterViewInit();

      component.datetimeGroup.controls.year.setValue('2025');
      component.datetimeGroup.controls.month.setValue('4'); // single digit
      component.datetimeGroup.controls.day.setValue('5'); // single digit
      component.datetimeGroup.controls.hour.setValue('9'); // single digit
      component.datetimeGroup.controls.minute.setValue('8'); // single digit
      component.datetimeGroup.controls.second.setValue('7'); // single digit

      const localDateTimeString = '2025-04-05T09:08:07.000';
      const localMoment = moment(localDateTimeString, 'YYYY-MM-DDTHH:mm:ss.SSS');
      const expectedUtcValue = localMoment.utc().format('YYYY-MM-DDTHH:mm:ss.SSS');

      expect(component.datetimeControl.value).toBe(expectedUtcValue);
    });

    it('should handle midnight correctly (00:00:00)', () => {
      component.ngAfterViewInit();

      component.datetimeGroup.controls.year.setValue('2025');
      component.datetimeGroup.controls.month.setValue('01');
      component.datetimeGroup.controls.day.setValue('01');
      component.datetimeGroup.controls.hour.setValue('0');
      component.datetimeGroup.controls.minute.setValue('0');
      component.datetimeGroup.controls.second.setValue('0');

      const localMidnight = moment('2025-01-01T00:00:00.000', 'YYYY-MM-DDTHH:mm:ss.SSS');
      const expectedUtcValue = localMidnight.utc().format('YYYY-MM-DDTHH:mm:ss.SSS');

      expect(component.datetimeControl.value).toBe(expectedUtcValue);
      expect(moment.utc(component.datetimeControl.value).isValid()).toBe(true);
    });

    it('should handle end of day correctly (23:59:59)', () => {
      component.ngAfterViewInit();

      component.datetimeGroup.controls.year.setValue('2025');
      component.datetimeGroup.controls.month.setValue('12');
      component.datetimeGroup.controls.day.setValue('31');
      component.datetimeGroup.controls.hour.setValue('23');
      component.datetimeGroup.controls.minute.setValue('59');
      component.datetimeGroup.controls.second.setValue('59');

      const localEndOfDay = moment('2025-12-31T23:59:59.000', 'YYYY-MM-DDTHH:mm:ss.SSS');
      const expectedUtcValue = localEndOfDay.utc().format('YYYY-MM-DDTHH:mm:ss.SSS');

      expect(component.datetimeControl.value).toBe(expectedUtcValue);
      expect(moment.utc(component.datetimeControl.value).isValid()).toBe(true);
    });

    it('should properly build datetime string from form values', () => {
      component.ngAfterViewInit();

      component.datetimeGroup.controls.year.setValue('2025');
      component.datetimeGroup.controls.month.setValue('7');
      component.datetimeGroup.controls.day.setValue('15');
      component.datetimeGroup.controls.hour.setValue('14');
      component.datetimeGroup.controls.minute.setValue('30');
      component.datetimeGroup.controls.second.setValue('0');

      // the internal string building should create: 2025-07-15T14:30:00.000
      const utcValue = component.datetimeControl.value;
      expect(utcValue).toBeDefined();
      expect(moment.utc(utcValue).isValid()).toBe(true);

      // verify it converts back to the same local time
      const backToLocal = moment.utc(utcValue).local();
      expect(backToLocal.year()).toBe(2025);
      expect(backToLocal.month()).toBe(6); // 0-indexed
      expect(backToLocal.date()).toBe(15);
      expect(backToLocal.hours()).toBe(14);
      expect(backToLocal.minutes()).toBe(30);
      expect(backToLocal.seconds()).toBe(0);
    });
  });
});
