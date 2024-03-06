import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { State } from '../store/reducers';
import { IsAmendedConverter } from './is-amended.converter';
import { HearingsUtils } from '../utils/hearings.utils';

export class JudgeTypesAmendedConverter implements IsAmendedConverter {
  public transformIsAmended(hearingState$?: Observable<State>): Observable<boolean> {
    return hearingState$.pipe(map((state) => {
      const objAPanelRequirements = state.hearingRequestToCompare.hearingRequestMainModel.hearingDetails.panelRequirements;
      const objBPanelRequirements = state.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements;

      const objA: number = HearingsUtils.getMustIncludedJudgeCount(objAPanelRequirements?.panelPreferences);
      const objB: number = HearingsUtils.getMustIncludedJudgeCount(objBPanelRequirements?.panelPreferences);
      const compareRoleType = objA === 0 && objAPanelRequirements.roleType.length > 0 ? objAPanelRequirements.roleType[0] : [];
      const roleType = objB === 0 && objBPanelRequirements.roleType.length > 0 ? objBPanelRequirements.roleType[0] : [];
      return !_.isEqual(compareRoleType, roleType);
    }));
  }
}
