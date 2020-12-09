import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AbstractFieldWriteComponent } from '../abstract-field-write.component';

@Component({
  selector: 'exui-noc-time-field',
  templateUrl: './noc-time-field.component.html'
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
    if (this.timeControl.value) {
      const timeParts = this.timeControl.value.split(':');
      this.timeGroup.controls['hour'].setValue(timeParts[0] || '');
      this.timeGroup.controls['minute'].setValue(timeParts[1] || '');
      this.timeGroup.controls['second'].setValue(timeParts[2] || '');
    }
  }

  public ngAfterViewInit(): void {
    this.timeGroup.valueChanges.subscribe(data => {
      const val = [
        this.timeGroup.value.hour !== null ? this.timeGroup.value.hour.padStart(2, '0') : '',
        this.timeGroup.value.minute !== null ? this.timeGroup.value.minute.padStart(2, '0') : '',
        this.timeGroup.value.second !== null ? this.timeGroup.value.second.padStart(2, '0') : ''
      ].join(':');
      this.timeControl.setValue(val);
    });
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
