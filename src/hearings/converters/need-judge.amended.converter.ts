import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MemberType } from '../models/hearings.enum';
import { State } from '../store/reducers';
import { IsAmendedConverter } from './is-amended.converter';

export class NeedJudgeAmendedConverter implements IsAmendedConverter {
  public transformIsAmended(hearingState$?: Observable<State>): Observable<boolean> {
    return hearingState$.pipe(map((state) => {
      const objAPanelRequirements = state.hearingRequestToCompare.hearingRequestMainModel.hearingDetails.panelRequirements;
      const objBPanelRequirements = state.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements;
      const objARoleType = objAPanelRequirements && objAPanelRequirements.roleType && objAPanelRequirements.roleType.length > 0 || null;
      const objBRoleType = objBPanelRequirements && objBPanelRequirements.roleType && objBPanelRequirements.roleType.length > 0 || null;
      const objAPanelPreferences = objAPanelRequirements && objAPanelRequirements.panelPreferences && objAPanelRequirements.panelPreferences.filter((panel) => panel.memberType === MemberType.JUDGE).length > 0 || null;
      const objBPanelPreferences = objBPanelRequirements && objBPanelRequirements.panelPreferences && objBPanelRequirements.panelPreferences.filter((panel) => panel.memberType === MemberType.JUDGE).length > 0 || null;
      return !_.isEqual(objARoleType, objBRoleType) || !_.isEqual(objAPanelPreferences, objBPanelPreferences);
    }));
  }
}
