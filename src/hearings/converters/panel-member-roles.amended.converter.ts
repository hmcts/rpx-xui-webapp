import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { State } from '../store/reducers';
import { HearingsUtils } from '../utils/hearings.utils';
import { IsAmendedConverter } from './is-amended.converter';

export class PanelMembersRolesAmendedConverter implements IsAmendedConverter {
  public transformIsAmended(hearingState$?: Observable<State>): Observable<boolean> {
    return hearingState$.pipe(map((state) => {
      const objAPanelRequirements = state.hearingRequestToCompare.hearingRequestMainModel.hearingDetails.panelRequirements;
      const objBPanelRequirements = state.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements;

      const includedCompareJudges: number = HearingsUtils.getMustIncludedJudgeCount(objAPanelRequirements?.panelPreferences);
      const includedJudges: number = HearingsUtils.getMustIncludedJudgeCount(objBPanelRequirements?.panelPreferences);

      const comparedPanelmemberRoles = objAPanelRequirements?.roleType;
      const requestedPanelmemberRoles = objBPanelRequirements?.roleType;

      const comparedRestPanelmemberRoles = HearingsUtils.getRestOfRoleType(objAPanelRequirements?.roleType);
      const restPanelmemberRoles = HearingsUtils.getRestOfRoleType(objBPanelRequirements?.roleType);
      const compareRoleType = includedCompareJudges === 0 ? comparedRestPanelmemberRoles : comparedPanelmemberRoles;
      const roleType = includedJudges === 0 ? restPanelmemberRoles : requestedPanelmemberRoles;

      return !_.isEqual(compareRoleType, roleType);
    }));
  }
}
