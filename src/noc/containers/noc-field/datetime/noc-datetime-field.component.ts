import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppUtils } from 'src/app/app-utils';
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
      year: [null, Validators.required],
      month: [null, Validators.required],
      day: [null, Validators.required],
      hour: [null, Validators.required],
      minute: [null, Validators.required],
      second: [null, Validators.required]
    });
    if (this.datetimeControl.value) {
      const [datePart, timePart] = this.datetimeControl.value.split('T');
      const dateValues = datePart.split('-');
      this.datetimeGroup.controls['year'].setValue(dateValues[0] || '');
      this.datetimeGroup.controls['month'].setValue(dateValues[1] || '');
      this.datetimeGroup.controls['day'].setValue(dateValues[2] || '');
      if (timePart) {
        const timeParts = timePart.replace('.000', '').split(':');
        this.datetimeGroup.controls['hour'].setValue(timeParts[0] || '');
        this.datetimeGroup.controls['minute'].setValue(timeParts[1] || '');
        this.datetimeGroup.controls['second'].setValue(timeParts[2] || '');
      }
    }
  }

  public ngAfterViewInit(): void {
    this.datetimeGroup.valueChanges.subscribe(data => {
      const date = [
        this.datetimeGroup.value.year !== null ? this.datetimeGroup.value.year : '',
        this.datetimeGroup.value.month !== null ? AppUtils.pad(this.datetimeGroup.value.month) : '',
        this.datetimeGroup.value.day !== null ? AppUtils.pad(this.datetimeGroup.value.day) : '',
      ].join('-');
      const time = [
        this.datetimeGroup.value.hour !== null ? AppUtils.pad(this.datetimeGroup.value.hour) : '',
        this.datetimeGroup.value.minute !== null ? AppUtils.pad(this.datetimeGroup.value.minute) : '',
        this.datetimeGroup.value.second !== null ? AppUtils.pad(this.datetimeGroup.value.second) : ''
        ].join(':');
      this.datetimeControl.setValue(`${date}T${time}.000`);
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
