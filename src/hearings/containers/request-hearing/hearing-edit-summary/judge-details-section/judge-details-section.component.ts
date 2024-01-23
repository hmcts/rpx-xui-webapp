import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { AmendmentLabelStatus } from '../../../../../hearings/models/hearingsUpdateMode.enum';
import * as fromHearingStore from '../../../../../hearings/store';
import { EditHearingChangeConfig } from '../../../../models/editHearingChangeConfig.model';
import { MemberType, RadioOptions, RequirementType } from '../../../../models/hearings.enum';
import { JudicialUserModel } from '../../../../models/judicialUser.model';
import { LovRefDataModel } from '../../../../models/lovRefData.model';
import { PanelRequirementsModel } from '../../../../models/panelRequirements.model';

@Component({
  selector: 'exui-judge-details-section',
  templateUrl: './judge-details-section.component.html'
})
export class JudgeDetailsSectionComponent implements OnInit {
  @Input() public judgeTypesRefData: LovRefDataModel[];
  @Input() public judicialUsers: JudicialUserModel[];
  @Input() public panelRequirements: PanelRequirementsModel;
  @Output() public changeEditHearing = new EventEmitter<EditHearingChangeConfig>();

  public needJudge: string;
  public judgeName: string;
  public judgeTypes: string;
  public excludedJudgeNames: string;

  public hearingState$: Observable<fromHearingStore.State>;
  public showAmmendedForNeedJudge: boolean;
  public showAmmendedForJudgeName: boolean;
  public showAmmendedForJudgeType: boolean;
  public showAmmendedForExcludedJudgeNames: boolean;
  public amendmentLabelEnum = AmendmentLabelStatus;

  constructor(protected readonly hearingStore: Store<fromHearingStore.State>) {
    this.hearingState$ = this.hearingStore.pipe(select(fromHearingStore.getHearingsFeatureState));
  }

  public ngOnInit(): void {
    this.needJudge = this.getNeedJudge();
    this.judgeName = this.getJudgeName();
    this.judgeTypes = this.getJudgeTypes();
    this.excludedJudgeNames = this.getExcludedJudgeNames();

    this.hearingState$.subscribe((state) => {
      const objA = state.hearingRequestToCompare.hearingRequestMainModel.hearingDetails.panelRequirements;
      const objB = state.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements;
      this.showAmmendedForNeedJudge = !_.isEqual(objA?.roleType.length > 0, objB?.roleType.length > 0);
      this.showAmmendedForJudgeType = !_.isEqual([...objA.roleType].sort((a, b) => a.localeCompare(b)), [...objB.roleType].sort((a, b) => a.localeCompare(b)));
      this.showAmmendedForJudgeName = !_.isEqual(objA?.panelPreferences.filter((panel) => panel.memberType === MemberType.JUDGE && panel.requirementType === RequirementType.MUSTINC),
        objB?.panelPreferences.filter((panel) => panel.memberType === MemberType.JUDGE && panel.requirementType === RequirementType.MUSTINC));
      this.showAmmendedForExcludedJudgeNames = !_.isEqual(objA?.panelPreferences.filter((panel) => panel.memberType === MemberType.JUDGE && panel.requirementType === RequirementType.EXCLUDE),
        objB?.panelPreferences.filter((panel) => panel.memberType === MemberType.JUDGE && panel.requirementType === RequirementType.EXCLUDE));
    });
  }

  public onChange(fragmentId: string): void {
    let changeLink = '';
    switch (fragmentId) {
      case 'needJudge':
        changeLink = '/hearings/request/hearing-judge#specificJudgeName';
        break;
      case 'judgeName':
        changeLink = '/hearings/request/hearing-judge#inputSelectPerson';
        break;
      case 'judgeTypes':
        changeLink = '/hearings/request/hearing-judge#judgeTypes';
        break;
      case 'judgeExclusion':
        changeLink = '/hearings/request/hearing-judge#inputSelectPersonExclude';
        break;
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

    const includedJudge = this.judicialUsers?.find((judgeInfo) => includedJudgeMemberIds?.includes(judgeInfo.personalCode));
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
      if (excludedJudges?.includes(judgeInfo.personalCode)) {
        excludedJudgeNames.push(judgeInfo.fullName);
      }
    });
    return excludedJudgeNames.length > 0
      ? excludedJudgeNames.join(', ')
      : '';
  }
}
