import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EditHearingChangeConfig } from '../../../../models/editHearingChangeConfig.model';
import { MemberType, RadioOptions, RequirementType } from '../../../../models/hearings.enum';
import { JudicialUserModel } from '../../../../models/judicialUser.model';
import { LovRefDataModel } from '../../../../models/lovRefData.model';
import { PanelRequirementsModel } from '../../../../models/panelRequirements.model';
import { HearingsUtils } from '../../../../utils/hearings.utils';
import * as _ from 'lodash';
import { AmendmentLabelStatus } from '../../../../models/hearingsUpdateMode.enum';

@Component({
  selector: 'exui-panel-details-section',
  templateUrl: './panel-details-section.component.html'
})
export class PanelDetailsSectionComponent implements OnInit {
  @Input() public panelRolesRefData: LovRefDataModel[];
  @Input() public panelRequirements: PanelRequirementsModel;
  @Input() public panelRequirementsToCompare: PanelRequirementsModel;
  @Input() public panelMembers: JudicialUserModel[];
  @Input() public isAPanelFlag: boolean;
  @Output() public changeEditHearing = new EventEmitter<EditHearingChangeConfig>();

  public hearingPanel: string;
  public includedPanelMembers: string;
  public excludedPanelMembers: string;
  public panelRoles: string;
  public showAmendedLabelForPageTitle: boolean;
  public showAmmendedForNeedPanel: boolean;
  public showAmmendedForIncludedPanelNames: boolean;
  public showAmmendedForPanelType: boolean;
  public showAmmendedForExcludedPanelNames: boolean;
  public amendmentLabelEnum = AmendmentLabelStatus;

  public ngOnInit(): void {
    this.hearingPanel = this.getHearingPanel();
    this.includedPanelMembers = this.getIncludedPanelMembers();
    this.excludedPanelMembers = this.getExcludedPanelMembers();
    this.panelRoles = this.getPanelRoles();
    this.setAmendmentLabels();
  }

  public onChange(fragmentId: string): void {
    let changeLink = '';
    let redirectLink = '';
    if (this.isAPanelFlag !== undefined) {
      redirectLink = '/hearings/request/hearing-panel-selector';
    } else {
      redirectLink = '/hearings/request/hearing-panel';
    }
    switch (fragmentId) {
      case 'hearingPanel':
        changeLink = redirectLink + '#specificPanelSelection';
        break;
      case 'panelInclusion':
        changeLink = redirectLink + '#inputSelectPersonInclude';
        break;
      case 'panelExclusion':
        changeLink = redirectLink + '#inputSelectPersonExclude';
        break;
      case 'panelRoles':
        changeLink = redirectLink + '#specificPanelSelection';
        break;
    }
    this.changeEditHearing.emit({ fragmentId, changeLink });
  }

  private getHearingPanel(): string {
    const panelMembers = this.panelRequirements?.panelPreferences?.filter((preference) => preference.memberType === MemberType.PANEL_MEMBER).length || 0;
    const panelSpecialisms = this.panelRequirements?.panelSpecialisms?.length || 0;
    const roleTypes = this.panelRequirements?.roleType?.length || 0;
    if (panelMembers > 0 || panelSpecialisms > 0 || roleTypes > 0) {
      return RadioOptions.YES;
    }
    return RadioOptions.NO;
  }

  private getIncludedPanelMembers(): string {
    const includedPanelMembers = this.panelRequirements?.panelPreferences?.filter(
      (preference) => preference.memberType === MemberType.PANEL_MEMBER && preference.requirementType === RequirementType.MUSTINC
    ).map((preference) => preference.memberID);

    const includedPanelMemberNames: string[] = [];
    this.panelMembers?.forEach((panelMemberInfo) => {
      if (includedPanelMembers.includes(panelMemberInfo.personalCode)) {
        includedPanelMemberNames.push(panelMemberInfo.fullName);
      }
    });
    return includedPanelMemberNames.join();
  }

  private getExcludedPanelMembers(): string {
    const excludedJudges = this.panelRequirements?.panelPreferences?.filter(
      (preference) => preference.memberType === MemberType.PANEL_MEMBER && preference.requirementType === RequirementType.EXCLUDE
    ).map((preference) => preference.memberID);

    const excludedJudgeNames: string[] = [];
    this.panelMembers?.forEach((panelMemberInfo) => {
      if (excludedJudges.includes(panelMemberInfo.personalCode)) {
        excludedJudgeNames.push(panelMemberInfo.fullName);
      }
    });
    return excludedJudgeNames.join();
  }

  private getPanelRoles(): string {
    const roleTypes = this.panelRequirements?.roleType || [];
    const panelSpecialisms = this.panelRequirements?.panelSpecialisms || [];

    return HearingsUtils.returnPanelRoles(panelSpecialisms, roleTypes, this.panelRolesRefData, ',');
  }

  private setAmendmentLabels(): void {
    this.showAmmendedForNeedPanel = !_.isEqual(
      this.panelRequirementsToCompare?.roleType.length > 0,
      this.panelRequirements?.roleType.length > 0
    );

    this.showAmmendedForIncludedPanelNames = !_.isEqual(
      this.panelRequirementsToCompare?.panelPreferences.filter(
        (panel) => panel.memberType === MemberType.JUDGE && panel.requirementType === RequirementType.MUSTINC
      ),
      this.panelRequirements?.panelPreferences.filter(
        (panel) => panel.memberType === MemberType.JUDGE && panel.requirementType === RequirementType.MUSTINC
      )
    );

    const memberIdsToCompare = this.panelRequirementsToCompare?.panelPreferences?.map(
      (panelPreference) => panelPreference.memberID
    )?.sort((a, b) => {
      return a > b ? 1 : (a === b ? 0 : -1);
    });
    const memberIds = this.panelRequirements?.panelPreferences?.map(
      (panelPreference) => panelPreference.memberID
    )?.sort((a, b) => {
      return a > b ? 1 : (a === b ? 0 : -1);
    });
    this.showAmmendedForExcludedPanelNames = !_.isEqual(
      memberIdsToCompare,
      memberIds
    );

    if (this.panelRequirements?.roleType) {
      const roleTypes = this.panelRequirements?.roleType || [];
      const compareRoleTypes = this.panelRequirementsToCompare?.roleType || [];
      const specialisms = this.panelRequirements?.panelSpecialisms || [];
      const compareSpecialisms = this.panelRequirementsToCompare?.panelSpecialisms || [];
      let roleDifferece: boolean;
      let specialismDifference: boolean;
      if (roleTypes.length && compareRoleTypes.length) {
        roleDifferece = !_.isEqual(
          roleTypes.sort((a, b) => a.localeCompare(b)),
          compareRoleTypes.sort((a, b) => a.localeCompare(b))
        );
      } else {
        roleDifferece = !_.isEqual(roleTypes.length, compareRoleTypes.length);
      }

      if (specialisms.length && compareSpecialisms.length) {
        specialismDifference = !_.isEqual(
          specialisms.sort((a, b) => a.localeCompare(b)),
          compareSpecialisms.sort((a, b) => a.localeCompare(b))
        );
      } else {
        specialismDifference = !_.isEqual(specialisms.length, compareSpecialisms.length);
      }

      this.showAmmendedForPanelType = roleDifferece || specialismDifference;
    }

    this.showAmendedLabelForPageTitle = this.showAmmendedForNeedPanel ||
      this.showAmmendedForIncludedPanelNames ||
      this.showAmmendedForExcludedPanelNames ||
      this.showAmmendedForPanelType;
  }
}
