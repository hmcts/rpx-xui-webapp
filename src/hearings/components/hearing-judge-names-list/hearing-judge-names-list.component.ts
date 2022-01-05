import { Component, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HearingJudgeSelectionEnum } from '../../../hearings/models/hearings.enum';
import { Person } from '../../../hearings/models/person.model';
import { ValidatorsUtils } from '../../../hearings/utils/validators.utils';

@Component({
  selector: 'exui-hearing-judge-names-list',
  templateUrl: './hearing-judge-names-list.component.html',
  styleUrls: ['./hearing-judge-names-list.component.scss'],
})
export class HearingJudgeNamesListComponent {
  @Input() public subTitle: string;
  @Input() public domain: string;
  @Input() public placeholderContent: string;
  @Input() public judgeList: Person[];
  public validationError: { id: string, message: string };
  @ViewChild('personControl') public personControl;
  public selectedJudge: Person;
  public personFormGroup: FormGroup;

  constructor(private readonly formBuilder: FormBuilder,
              private readonly validatorsUtils: ValidatorsUtils) {
    this.personFormGroup = this.formBuilder.group({});
  }

  public updatePersonControls(selectedJudge: Person): void {
    this.selectedJudge = selectedJudge;
  }

  public removeSelectedJudge(selectedJudge: Person): void {
    this.judgeList = this.judgeList.filter(judge => judge.id !== selectedJudge.id);
  }

  public excludeJudge(): void {
    if (this.selectedJudge && this.personControl && this.personControl.isPersonSelectionCompleted) {
      this.judgeList.push(this.selectedJudge);
      this.selectedJudge = null;
      this.personControl.findPersonControl.setValue('');
    }
  }
  public isExcludeJudgeInputValid(): boolean {
    if (this.personControl.findPersonControl.value.length > 0) {
      const isJudgeSelected = this.selectedJudge && this.personControl && this.personControl.isPersonSelectionCompleted;
      const message = isJudgeSelected ? HearingJudgeSelectionEnum.ExcludeJudge : HearingJudgeSelectionEnum.ExcludeFullNameJudge;
      this.validationError = { id: 'inputSelectPersonExclude', message };
      this.personControl.findPersonGroup.setValidators([this.validatorsUtils.errorValidator(message)]);
      this.personControl.findPersonGroup.updateValueAndValidity();
      return false;
    } else {
      this.validationError = null;
      this.personControl.findPersonGroup.clearValidators();
      this.personControl.findPersonGroup.updateValueAndValidity();
    }
    return true;
  }

  public displayedJudgeName(judge: Person) {
    if (judge && judge.knownAs) {
      return `${judge.knownAs}(${judge.email})`;
    }
    return judge ? `${judge.name}(${judge.email})` : '';
  }
}
