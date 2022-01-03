import { Component, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Person } from '../../../hearings/models/person.model';

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
  @ViewChild('personControl') public personControl;
  private selectedJudge: Person;
  public personFormGroup: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
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
    }
  }

  public displayedJudgeName(judge: Person) {
    if (judge && judge.knownAs) {
      return `${judge.knownAs}(${judge.email})`;
    }
    return judge ? `${judge.name}(${judge.email})` : '';
  }
}
