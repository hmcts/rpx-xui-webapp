import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { AppUtils } from '../../../../app/app-utils';
import { AbstractFieldWriteComponent } from '../abstract-field-write.component';

@Component({
  standalone: false,
  selector: 'exui-noc-datetime-field',
  templateUrl: './noc-datetime-field.component.html'
})
export class NocDateTimeFieldComponent extends AbstractFieldWriteComponent implements OnInit, AfterViewInit {
  public datetimeControl: FormControl;
  public datetimeGroup: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
    super();
  }

  public ngOnInit() {
    this.setAnswer();
    this.datetimeControl = this.registerControl(new FormControl(this.answerValue));
    this.datetimeGroup = this.formBuilder.group({
      year: [null, Validators.required],
      month: [null, Validators.required],
      day: [null, Validators.required],
      hour: [null, Validators.required],
      minute: [null, Validators.required],
      second: [null, Validators.required]
    });
    if (this.datetimeControl.value) {
      // convert UTC datetime to local time for display
      const utcValue = this.datetimeControl.value;
      const utcMoment = moment.utc(utcValue);
      const localMoment = utcMoment.local();

      // extract local date and time components
      this.datetimeGroup.controls.year.setValue(localMoment.year().toString());
      this.datetimeGroup.controls.month.setValue(AppUtils.pad((localMoment.month() + 1).toString()));
      this.datetimeGroup.controls.day.setValue(AppUtils.pad(localMoment.date().toString()));
      this.datetimeGroup.controls.hour.setValue(AppUtils.pad(localMoment.hours().toString()));
      this.datetimeGroup.controls.minute.setValue(AppUtils.pad(localMoment.minutes().toString()));
      this.datetimeGroup.controls.second.setValue(AppUtils.pad(localMoment.seconds().toString()));
    }
  }

  public ngAfterViewInit(): void {
    this.datetimeGroup.valueChanges.subscribe(() => {
      const date = [
        this.datetimeGroup.value.year !== null ? this.datetimeGroup.value.year : '',
        this.datetimeGroup.value.month !== null ? AppUtils.pad(this.datetimeGroup.value.month) : '',
        this.datetimeGroup.value.day !== null ? AppUtils.pad(this.datetimeGroup.value.day) : ''
      ].join('-');
      const time = [
        this.datetimeGroup.value.hour !== null ? AppUtils.pad(this.datetimeGroup.value.hour) : '',
        this.datetimeGroup.value.minute !== null ? AppUtils.pad(this.datetimeGroup.value.minute) : '',
        this.datetimeGroup.value.second !== null ? AppUtils.pad(this.datetimeGroup.value.second) : ''
      ].join(':');
      const localDateTimeString = `${date}T${time}.000`;

      // convert local time to UTC datetime for storage
      const localMoment = moment(localDateTimeString, 'YYYY-MM-DDTHH:mm:ss.SSS');
      if (localMoment.isValid()) {
        const utcMoment = localMoment.utc();
        const utcValue = utcMoment.format('YYYY-MM-DDTHH:mm:ss.SSS');
        this.datetimeControl.setValue(utcValue);
      } else {
        // set the local datetime string to be caught by validation
        this.datetimeControl.setValue(localDateTimeString);
      }
    });
  }

  public dayId() {
    return `${this.id}-day`;
  }

  public monthId() {
    return `${this.id}-month`;
  }

  public yearId() {
    return `${this.id}-year`;
  }

  public hourId() {
    return `${this.id}-hour`;
  }

  public minuteId() {
    return `${this.id}-minute`;
  }

  public secondId() {
    return `${this.id}-second`;
  }
}
