import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, AbstractControl, Validator, ValidationErrors, Validators } from '@angular/forms';
import { AbstractFieldWriteComponent } from '../abstract-field-write.component';

@Component({
  selector: 'exui-noc-datetime-field',
  templateUrl: './noc-datetime-field.html'
})
export class NocDateTimeFieldComponent extends AbstractFieldWriteComponent implements OnInit {

  public datetimeControl: FormControl;
  public datetimeGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  public ngOnInit() {
    this.setAnswer();
    this.datetimeControl = this.registerControl(new FormControl(this.answerValue));
    this.datetimeGroup = this.formBuilder.group({
      day: [null, Validators.required],
      month: [null, Validators.required],
      year: [null, Validators.required],
      hour: [null, Validators.required],
      minute: [null, Validators.required],
      second: [null, Validators.required]
    });
    if (this.datetimeControl.value !== null) {
      this.setValues(this.datetimeControl.value);
    }
  }

  ngAfterViewInit(): void {
    this.datetimeGroup.valueChanges.subscribe(data => { 
      this.datetimeControl.setValue(this.getValues());
    });
  } 

  public dayId() {
    return this.id + '-day';
  }

  public monthId() {
    return this.id + '-month';
  }

  public yearId() {
    return this.id + '-year';
  }

  public hourId() {
    return this.id + '-hour';
  }

  public minuteId() {
    return this.id + '-minute';
  }

  public secondId() {
    return this.id + '-second';
  }

  private setValues(obj: string): void {
    if (obj) {
      const [datePart, timePart] = obj.split(' ');
      const dateValues = datePart.split('/');
      this.datetimeGroup.controls['day'].setValue(dateValues[0] || '');
      this.datetimeGroup.controls['month'].setValue(dateValues[1] || '');
      this.datetimeGroup.controls['year'].setValue(dateValues[2] || '');
      if (timePart) {
        const timeParts = timePart.split(':');
        this.datetimeGroup.controls['hour'].setValue(timeParts[0] || '');
        this.datetimeGroup.controls['minute'].setValue(timeParts[1] || '');
        this.datetimeGroup.controls['second'].setValue(timeParts[2] || '');
      }
    }
  }

  private getValues(): string {
    if (this.datetimeGroup.value.day || this.datetimeGroup.value.month || this.datetimeGroup.value.year || this.datetimeGroup.value.hour || this.datetimeGroup.value.minute || this.datetimeGroup.value.second) {
      const date = [
        this.datetimeGroup.value.day ? this.pad(this.datetimeGroup.value.day) : '',
        this.datetimeGroup.value.month ? this.pad(this.datetimeGroup.value.month) : '',
        this.datetimeGroup.value.year ? this.datetimeGroup.value.year : ''
      ].join('/');
        const time = [
        this.datetimeGroup.value.hour !== null ? this.pad(this.datetimeGroup.value.hour) : '',
        this.datetimeGroup.value.minute !== null ? this.pad(this.datetimeGroup.value.minute) : '',
        this.datetimeGroup.value.second !== null ? this.pad(this.datetimeGroup.value.second) : ''
        ].join(':');
        return date + ' ' + time;
    }
    return null;
  }

  private pad(num: any, padNum = 2): string {
    const val = (num !== undefined && num !== null) ? num.toString() : '';
    return val.length >= padNum ? val : new Array(padNum - val.length + 1).join('0') + val;
  }
}
