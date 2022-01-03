import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'exui-hearing-judge-name',
  templateUrl: './hearing-judge-name.component.html',
  styleUrls: ['./hearing-judge-name.component.scss'],
})
export class HearingJudgeNameComponent {
  @Input() public subTitle;
  @Input() public domain;
  @Input() public personControl: FormGroup;
  @Input() public placeholderContent;
  public personFormGroup: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
    this.personFormGroup = this.formBuilder.group({});
  }

  public updatePersonControls(values: any): void {
    const keys = Object.keys(values);
    for (const key of keys) {
      this.personControl.get(key).patchValue(values[key]);
    }
  }
}
