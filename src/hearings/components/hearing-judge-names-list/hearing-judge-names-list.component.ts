import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HearingJudgeSelectionEnum } from '../../models/hearings.enum';
import { JudicialUserModel } from '../../models/judicialUser.model';
import { ValidatorsUtils } from '../../utils/validators.utils';

@Component({
  standalone: false,

  selector: 'exui-hearing-judge-names-list',
  templateUrl: './hearing-judge-names-list.component.html',
  styleUrls: ['./hearing-judge-names-list.component.scss']

})
export class HearingJudgeNamesListComponent {
  @Input() public subTitle: string;
  @Input() public idValue: string = 'Exclude';
  @Input() public serviceId: string = '';
  @Input() public placeholderContent: string = '';
  @Input() public submitButtonName: string = '';
  @Input() public isColumnView: boolean;
  @Input() public judgeList: JudicialUserModel[];
  public validationError: { id: string, message: string };
  public selectedJudge: JudicialUserModel;
  public personFormGroup: FormGroup;

  constructor(private readonly formBuilder: FormBuilder,
              private readonly validatorsUtils: ValidatorsUtils) {
    this.personFormGroup = this.formBuilder.group({ selectedFormControl: '' });
  }

  public removeSelectedJudge(selectedJudge: JudicialUserModel): void {
    this.judgeList = this.judgeList.filter((judge) => judge.idamId !== selectedJudge.idamId);
  }

  public excludeJudge(): void {
    if (this.personFormGroup.controls.selectedFormControl.value) {
      this.judgeList.push(this.personFormGroup.controls.selectedFormControl.value as JudicialUserModel);
      this.personFormGroup.controls.selectedFormControl.setValue(undefined);
      this.personFormGroup.controls.selectedFormControl.markAsPristine();
    } else {
      this.personFormGroup.controls.selectedFormControl.setValue(undefined);
    }
  }

  public isExcludeJudgeInputValid(): boolean {
    if (this.personFormGroup.controls.selectedFormControl.dirty || this.personFormGroup.controls.selectedFormControl.value) {
      const isJudgeSelected = !!this.personFormGroup.controls.selectedFormControl.value;
      const message = isJudgeSelected ? HearingJudgeSelectionEnum.ExcludeJudge : HearingJudgeSelectionEnum.ExcludeFullNameJudge;
      this.validationError = { id: this.idValue ? `inputSelectPerson${this.idValue}` : 'inputSelectPerson', message };
      this.personFormGroup.controls.selectedFormControl.setValidators([this.validatorsUtils.errorValidator(message)]);
      this.personFormGroup.controls.selectedFormControl.updateValueAndValidity();
      return false;
    }

    this.validationError = null;
    this.personFormGroup.controls.selectedFormControl.clearValidators();
    this.personFormGroup.controls.selectedFormControl.updateValueAndValidity();

    return true;
  }

  public displayedJudgeName(judge: JudicialUserModel) {
    if (judge && judge.fullName) {
      return `${judge.fullName} (${judge.emailId})`;
    }
    return '';
  }
}
