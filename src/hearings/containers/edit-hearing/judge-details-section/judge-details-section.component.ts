import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MemberType, RadioOptions, RequirementType } from 'src/hearings/models/hearings.enum';
import { JudicialUserModel } from 'src/hearings/models/judicialUser.model';
import { LovRefDataModel } from 'src/hearings/models/lovRefData.model';
import { PanelRequirementsModel } from 'src/hearings/models/panelRequirements.model';
import { editHearingChangeConfig } from '../../../models/editHearingChangeConfig.model';

@Component({
  selector: 'exui-judge-details-section',
  templateUrl: './judge-details-section.component.html'
})
export class JudgeDetailsSectionComponent implements OnInit {
  @Input() public judgeTypesRefData: LovRefDataModel[];
  @Input() public judicialUsers: JudicialUserModel[];
  @Input() public panelRequirements: PanelRequirementsModel;
  @Output() public changeEditHearing = new EventEmitter<string>();

  public needJudge: string;
  public judgeName: string;
  public judgeTypes: string;
  public excludedJudgeNames: string;

  public ngOnInit(): void {
    this.needJudge = this.getNeedJudge();
    this.judgeName = this.getJudgeName();
    this.judgeTypes = this.getJudgeTypes();
    this.excludedJudgeNames = this.getExcludedJudgeNames();
  }

  public onChange(fragmentId: string): void {
    let changeLink = '';
    if (fragmentId === 'additionalSecurityRequired') {
      changeLink = '/hearings/request/hearing-facilities#additionalSecurityYes';
    } else {
      changeLink = '/hearings/request/hearing-facilities#immigrationDetentionCentre';
    }
    this.changeEditHearing.emit({ fragmentId, changeLink });
  }

  private getNeedJudge(): string {
    const hasJudgeDetails = this.panelRequirements?.panelPreferences?.filter((panel) => panel.memberType === MemberType.JUDGE);
    if (this.panelRequirements?.roleType?.length > 0) {
      return RadioOptions.NO;
    }
    if (hasJudgeDetails?.length > 0) {
      return RadioOptions.YES;
    }
    return '';
  }

  private getJudgeName(): string {
    const includedJudgeMemberIds = this.panelRequirements?.panelPreferences?.filter(
      (panelPreference) => panelPreference.memberType === MemberType.JUDGE
        && panelPreference.requirementType === RequirementType.MUSTINC
    ).map((panelPreference) => panelPreference.memberID);

    const includedJudge = this.judicialUsers.find((judgeInfo) => includedJudgeMemberIds.includes(judgeInfo.personalCode));
    return includedJudge?.fullName || '';
  }

  private getJudgeTypes(): string {
    const selectedJudgeTypes: string[] = [];
    this.judgeTypesRefData.forEach((judgeType) => {
      if (this.panelRequirements?.roleType?.includes(judgeType.key)) {
        selectedJudgeTypes.push(judgeType.value_en);
      }
    });
    return selectedJudgeTypes.length > 0
      ? selectedJudgeTypes.join(', ')
      : '';
  }

  private getExcludedJudgeNames(): string {
    const excludedJudges = this.panelRequirements?.panelPreferences?.filter(
      (preference) => preference.memberType === MemberType.JUDGE && preference.requirementType === RequirementType.EXCLUDE
    ).map((preference) => preference.memberID);

    const excludedJudgeNames: string[] = [];
    this.judicialUsers.forEach((judgeInfo) => {
      if (excludedJudges.includes(judgeInfo.personalCode)) {
        excludedJudgeNames.push(judgeInfo.fullName);
      }
    });
    return excludedJudgeNames.length > 0
      ? excludedJudgeNames.join(', ')
      : '';
  }
}
