import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, AbstractControl, Validator, ValidationErrors, Validators } from '@angular/forms';
import { AbstractFieldWriteComponent } from '../abstract-field-write.component';

@Component({
  selector: 'exui-noc-datetime-field',
  templateUrl: './noc-datetime-field.component.html'
})
export class NocDateTimeFieldComponent extends AbstractFieldWriteComponent implements OnInit, AfterViewInit {

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
    if (this.datetimeControl.value) {
      const [datePart, timePart] = this.datetimeControl.value.split(' ');
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

  public ngAfterViewInit(): void {
    this.datetimeGroup.valueChanges.subscribe(data => {
      const date = [
        this.datetimeGroup.value.day !== null ? this.datetimeGroup.value.day.padStart(2, '0') : '',
        this.datetimeGroup.value.month !== null ? this.datetimeGroup.value.month.padStart(2, '0') : '',
        this.datetimeGroup.value.year !== null ? this.datetimeGroup.value.year : ''
      ].join('/');
      const time = [
        this.datetimeGroup.value.hour !== null ? this.datetimeGroup.value.hour.padStart(2, '0') : '',
        this.datetimeGroup.value.minute !== null ? this.datetimeGroup.value.minute.padStart(2, '0') : '',
        this.datetimeGroup.value.second !== null ? this.datetimeGroup.value.second.padStart(2, '0') : ''
        ].join(':');
      this.datetimeControl.setValue(`${date} ${time}`);
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
