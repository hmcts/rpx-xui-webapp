import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AbstractFieldWriteComponent } from '../abstract-field-write.component';

@Component({
  selector: 'exui-noc-time-field',
  templateUrl: './noc-time-field.html'
})
export class NocTimeFieldComponent extends AbstractFieldWriteComponent implements OnInit, AfterViewInit {

  public timeControl: FormControl;
  public timeGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  public ngOnInit() {
    this.setAnswer();
    this.timeControl = this.registerControl(new FormControl(this.answerValue));
    this.timeGroup = this.formBuilder.group({
      hour: [null, Validators.required],
      minute: [null, Validators.required],
      second: [null, Validators.required]
    });
    if (this.timeControl.value !== null) {
      this.setValues(this.timeControl.value);
    }
  }

  public ngAfterViewInit(): void {
    this.timeGroup.valueChanges.subscribe(data => {
      this.timeControl.setValue(this.getValues());
    });
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
      const timeParts = obj.split(':');
      this.timeGroup.controls['hour'].setValue(timeParts[0] || '');
      this.timeGroup.controls['minute'].setValue(timeParts[1] || '');
      this.timeGroup.controls['second'].setValue(timeParts[2] || '');
    }
  }

  private getValues(): string {
    if (this.timeGroup.value.hour || this.timeGroup.value.minute || this.timeGroup.value.second) {
      return [
        this.timeGroup.value.hour !== null ? this.pad(this.timeGroup.value.hour) : '',
        this.timeGroup.value.minute !== null ? this.pad(this.timeGroup.value.minute) : '',
        this.timeGroup.value.second !== null ? this.pad(this.timeGroup.value.second) : ''
      ].join(':');
    }
    return null;
  }

  private pad(num: any, padNum = 2): string {
    const val = (num !== undefined && num !== null) ? num.toString() : '';
    return val.length >= padNum ? val : new Array(padNum - val.length + 1).join('0') + val;
  }
}
