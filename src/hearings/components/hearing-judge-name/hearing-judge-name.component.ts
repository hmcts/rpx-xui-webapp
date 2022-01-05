import { Component, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HearingJudgeSelectionEnum } from 'src/hearings/models/hearings.enum';
import { ValidatorsUtils } from 'src/hearings/utils/validators.utils';
import { Person } from '../../../hearings/models/person.model';

@Component({
  selector: 'exui-hearing-judge-name',
  templateUrl: './hearing-judge-name.component.html',
  styleUrls: ['./hearing-judge-name.component.scss'],
})
export class HearingJudgeNameComponent {
  @Input() public subTitle: string;
  @Input() public domain: string;
  @Input() public personSelectionFormControl: FormGroup;
  @Input() public placeholderContent: string;
  public validationError: { id: string, message: string };
  public personFormGroup: FormGroup;
  public selectedJudge: Person;
  @ViewChild('personControl') public personControl;

  constructor(private readonly formBuilder: FormBuilder,
              private readonly validatorsUtils: ValidatorsUtils) {
    this.personFormGroup = this.formBuilder.group({});
  }

  public updatePersonControls(selectedJudge: Person): void {
    this.selectedJudge = selectedJudge;
  }

  public isJudgeInputValid(): boolean {
    this.validationError = null;
    const isJudgeSelected = this.selectedJudge && this.personControl && this.personControl.isPersonSelectionCompleted;
    if (!isJudgeSelected) {
      this.validationError = { id: 'inputSelectPerson', message: HearingJudgeSelectionEnum.ValidNameError };
      this.personSelectionFormControl.get('email').setValue(null);
      this.personControl.findPersonGroup.setValidators([this.validatorsUtils.errorValidator(HearingJudgeSelectionEnum.ValidNameError)]);
      this.personControl.findPersonGroup.updateValueAndValidity();
      return false;
    }
    this.personControl.findPersonGroup.clearValidators();
    this.personControl.findPersonGroup.updateValueAndValidity();
    this.setPersonSelectionToFormControl(this.selectedJudge);
    return true;
  }

  public setPersonSelectionToFormControl(selectedJudge: Person): void {
    const keys = Object.keys(selectedJudge);
    for (const key of keys) {
      this.personSelectionFormControl.get(key).patchValue(selectedJudge[key]);
    }
  }
}
