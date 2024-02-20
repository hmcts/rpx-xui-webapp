import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { State } from '../store/reducers';
import { IsAmendedConverter } from './is-amended.converter';
import { MemberType, RequirementType } from '../models/hearings.enum';

export class PanelMembersRolesAmendedConverter implements IsAmendedConverter {
  public transformIsAmended(hearingState$?: Observable<State>): Observable<boolean> {
    return hearingState$.pipe(map((state) => {
      const objAPanelRequirements = state.hearingRequestToCompare.hearingRequestMainModel.hearingDetails.panelRequirements;
      const objBPanelRequirements = state.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements;
      const objPanelMustA: number = objAPanelRequirements.panelPreferences
        ?.filter((preferences) => preferences.memberType === MemberType.PANEL_MEMBER && preferences.requirementType === RequirementType.MUSTINC).length || 0;
      const objPanelMustB: number = objBPanelRequirements.panelPreferences
        ?.filter((preferences) => preferences.memberType === MemberType.PANEL_MEMBER && preferences.requirementType === RequirementType.MUSTINC).length || 0;
      const objA = objAPanelRequirements && objAPanelRequirements.roleType;
      const objB = objBPanelRequirements && objBPanelRequirements.roleType;
      const objPanelExclA: number = objAPanelRequirements.panelPreferences
        ?.filter((preferences) => preferences.memberType === MemberType.PANEL_MEMBER && preferences.requirementType === RequirementType.EXCLUDE).length || 0;
      const objPanelExclAB: number = objBPanelRequirements.panelPreferences
        ?.filter((preferences) => preferences.memberType === MemberType.PANEL_MEMBER && preferences.requirementType === RequirementType.EXCLUDE).length || 0;

      const includedCompareJudges: number = objAPanelRequirements?.panelPreferences
        ?.filter((preferences) => preferences.memberType === MemberType.JUDGE && preferences.requirementType === RequirementType.MUSTINC).length || 0;
      const includedJudges: number = objBPanelRequirements?.panelPreferences
        ?.filter((preferences) => preferences.memberType === MemberType.JUDGE && preferences.requirementType === RequirementType.MUSTINC).length || 0;

      const comparedPanelmemberRoles = objAPanelRequirements?.roleType;
      const requestedPanelmemberRoles = objBPanelRequirements?.roleType;
      const [, ...restCompare] = objAPanelRequirements.roleType;
      const [, ...restB] = objBPanelRequirements.roleType;
      const compareRoleType = includedCompareJudges === 0 && comparedPanelmemberRoles.length > 0 ? comparedPanelmemberRoles : restCompare;
      const roleType = includedJudges === 0 && requestedPanelmemberRoles.length > 0 ? requestedPanelmemberRoles : restB;

      return !_.isEqual(objPanelMustA, objPanelMustB) || !_.isEqual(objPanelExclA, objPanelExclAB) || !_.isEqual(compareRoleType, roleType);
    }));
  }
}
