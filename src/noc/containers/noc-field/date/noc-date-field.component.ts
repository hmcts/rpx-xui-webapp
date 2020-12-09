import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AbstractFieldWriteComponent } from '../abstract-field-write.component';

@Component({
  selector: 'exui-noc-date-field',
  templateUrl: './noc-date-field.component.html'
})
export class NocDateFieldComponent extends AbstractFieldWriteComponent implements OnInit, AfterViewInit {

  public dateControl: FormControl;
  public dateGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  public ngOnInit() {
    this.setAnswer();
    this.dateControl = this.registerControl(new FormControl(this.answerValue));
    this.dateGroup = this.formBuilder.group({
      day: [null, Validators.required],
      month: [null, Validators.required],
      year: [null, Validators.required],
    });
    if (this.dateControl.value) {
      const dateValues = this.dateControl.value.split('/');
      this.dateGroup.controls['day'].setValue(dateValues[0] || '');
      this.dateGroup.controls['month'].setValue(dateValues[1] || '');
      this.dateGroup.controls['year'].setValue(dateValues[2] || '');
    }
  }

  public ngAfterViewInit(): void {
    this.dateGroup.valueChanges.subscribe(data => {
      const val = [
        this.dateGroup.value.day !== null ? this.pad(this.dateGroup.value.day) : '',
        this.dateGroup.value.month !== null ? this.pad(this.dateGroup.value.month) : '',
        this.dateGroup.value.year !== null ? this.dateGroup.value.year : ''
      ].join('/');
      this.dateControl.setValue(val);
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

  private pad(num: any, padNum = 2): string {
    const val = (num !== undefined && num !== null) ? num.toString() : '';
    return val.length >= padNum ? val : new Array(padNum - val.length + 1).join('0') + val;
  }
}
