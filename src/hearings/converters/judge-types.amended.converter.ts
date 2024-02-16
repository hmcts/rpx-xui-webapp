import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { State } from '../store/reducers';
import { IsAmendedConverter } from './is-amended.converter';
import { MemberType, RequirementType } from '../models/hearings.enum';

export class JudgeTypesAmendedConverter implements IsAmendedConverter {
  public transformIsAmended(hearingState$?: Observable<State>): Observable<boolean> {
    return hearingState$.pipe(map((state) => {
      const objAPanelRequirements = state.hearingRequestToCompare.hearingRequestMainModel.hearingDetails.panelRequirements;
      const objBPanelRequirements = state.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements;
      const objA: number = objAPanelRequirements.panelPreferences
        ?.filter((preferences) => preferences.memberType === MemberType.JUDGE && preferences.requirementType === RequirementType.MUSTINC).length || 0;
      const objB: number = objBPanelRequirements.panelPreferences
        ?.filter((preferences) => preferences.memberType === MemberType.JUDGE && preferences.requirementType === RequirementType.MUSTINC).length || 0;
      // const objA = objAPanelRequirements && objAPanelRequirements.roleType;
      // const objB = objBPanelRequirements && objBPanelRequirements.roleType;
      return !_.isEqual(objA, objB);
    }));
  }
}
