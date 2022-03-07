import * as _ from 'lodash';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { MemberType } from '../models/hearings.enum';
import {State} from '../store/reducers';
import {IsAmendedConverter} from './is-amended.converter';

export class NeedJudgeAmendedConverter implements IsAmendedConverter {
  public transformIsAmended(hearingState$?: Observable<State>): Observable<boolean> {
    return hearingState$.pipe(map(state => {
      const ObjAPanelRequirements = state.hearingRequestToCompare.hearingRequestMainModel.hearingDetails.panelRequirements
      const ObjBPanelRequirements = state.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements
      const objARoleType = ObjAPanelRequirements && ObjAPanelRequirements.roleType && ObjAPanelRequirements.roleType.length > 0 || null
      const objBRoleType = ObjBPanelRequirements && ObjBPanelRequirements.roleType && ObjBPanelRequirements.roleType.length > 0 || null
      const objAPanelPreferences = ObjAPanelRequirements && ObjAPanelRequirements.panelPreferences && ObjAPanelRequirements.panelPreferences.filter(panel => panel.memberType === MemberType.JUDGE).length > 0 || null;
      const objBPanelPreferences = ObjBPanelRequirements && ObjBPanelRequirements.panelPreferences && ObjBPanelRequirements.panelPreferences.filter(panel => panel.memberType === MemberType.JUDGE).length > 0 || null;
      return !_.isEqual(objARoleType, objBRoleType) || !_.isEqual(objAPanelPreferences, objBPanelPreferences)
    }));
  }
}
