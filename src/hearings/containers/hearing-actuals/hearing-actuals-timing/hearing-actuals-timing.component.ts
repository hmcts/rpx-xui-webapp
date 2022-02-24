import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'exui-hearing-actuals-timing',
  templateUrl: './hearing-actuals-timing.component.html',
  styleUrls: ['./hearing-actuals-timing.component.scss']
})
export class HearingActualsTimingComponent implements OnInit {

  public form: FormGroup;

  public constructor(private readonly fb: FormBuilder) {
  }

  public ngOnInit() {
    this.form = this.createForm();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      startTime: ['13:00', Validators.required],
      finishTime: ['14:00', Validators.required],
      recordTimes: [null, Validators.required],
      pauseTime: [null],
      resumeTime: [null],
    });
  }

  public submit(value: any, valid: boolean) {
    console.log(value);
    if (valid) {
      console.log('valid');
    }
  }
}
