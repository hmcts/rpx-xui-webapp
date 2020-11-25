import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, AbstractControl, Validator, ValidationErrors, Validators } from '@angular/forms';
import { AbstractFieldWriteComponent } from '../abstract-field-write.component';

@Component({
  selector: 'exui-noc-date-field',
  templateUrl: './noc-date-field.html'
})
export class NocDateFieldComponent extends AbstractFieldWriteComponent implements OnInit {

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
    if (this.dateControl.value !== null) {
      this.setValues(this.dateControl.value);
    }
  }

  ngAfterViewInit(): void {
    this.dateGroup.valueChanges.subscribe(data => { 
      this.dateControl.setValue(this.getValues());
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

  private setValues(obj: string): void {
    if (obj) {
      const dateValues = obj.split('/');
      this.dateGroup.controls['day'].setValue(dateValues[0] || '');
      this.dateGroup.controls['month'].setValue(dateValues[1] || '');
      this.dateGroup.controls['year'].setValue(dateValues[2] || '');
    }
  }

  private getValues(): string {
    if (this.dateGroup.value.day || this.dateGroup.value.month || this.dateGroup.value.year) {
      return [
        this.dateGroup.value.year ? this.dateGroup.value.year : '',
        this.dateGroup.value.month ? this.pad(this.dateGroup.value.month) : '',
        this.dateGroup.value.day ? this.pad(this.dateGroup.value.day) : ''
      ].join('/');
    }
    return null;
  }

  private pad(num: any, padNum = 2): string {
    const val = (num !== undefined && num !== null) ? num.toString() : '';
    return val.length >= padNum ? val : new Array(padNum - val.length + 1).join('0') + val;
  }
}
