import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MemberType, RequirementType } from '../models/hearings.enum';
import { State } from '../store/reducers';
import { IsAmendedConverter } from './is-amended.converter';

export class HearingPanelAmendedConverter implements IsAmendedConverter {
  public transformIsAmended(hearingState$?: Observable<State>): Observable<boolean> {
    return hearingState$.pipe(map((state) => {
      const hearingComparePanelRequirements = state.hearingRequestToCompare.hearingRequestMainModel.hearingDetails.panelRequirements;
      const comparedPanelMembers: number = hearingComparePanelRequirements?.panelPreferences?.filter((preferences) => preferences.memberType === MemberType.PANEL_MEMBER).length || 0;
      const comparedPanelSpecialisms: number = hearingComparePanelRequirements?.panelSpecialisms?.length || 0;

      const hearingRequestPanelRequirements = state.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements;
      const requestedPanelMembers: number = hearingRequestPanelRequirements?.panelPreferences?.filter((preferences) => preferences.memberType === MemberType.PANEL_MEMBER).length || 0;
      const requestedPanelSpecialisms: number = hearingRequestPanelRequirements?.panelSpecialisms?.length || 0;

      const includedCompareJudges: number = hearingComparePanelRequirements?.panelPreferences
        ?.filter((preferences) => preferences.memberType === MemberType.JUDGE && preferences.requirementType === RequirementType.MUSTINC).length || 0;
      const includedJudges: number = hearingRequestPanelRequirements?.panelPreferences
        ?.filter((preferences) => preferences.memberType === MemberType.JUDGE && preferences.requirementType === RequirementType.MUSTINC).length || 0;

      const comparedPanelmemberRoles = hearingComparePanelRequirements?.roleType;
      const requestedPanelmemberRoles = hearingRequestPanelRequirements?.roleType;
      const [, ...restCompare] = hearingComparePanelRequirements.roleType;
      const [, ...restB] = hearingRequestPanelRequirements.roleType;
      const compareRoleType = includedCompareJudges === 0 && comparedPanelmemberRoles.length > 0 ? restCompare : comparedPanelmemberRoles;
      const roleType = includedJudges === 0 && requestedPanelmemberRoles.length > 0 ? restB : requestedPanelmemberRoles;

      return !_.isEqual(comparedPanelMembers, requestedPanelMembers) || !_.isEqual(comparedPanelSpecialisms, requestedPanelSpecialisms)
        || !_.isEqual(compareRoleType, roleType);
    }));
  }
}
