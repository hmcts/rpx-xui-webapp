import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MemberType, RequirementType } from '../models/hearings.enum';
import { State } from '../store/reducers';
import { IsAmendedConverter } from './is-amended.converter';

export class JudgeNameAmendedConverter implements IsAmendedConverter {
  public transformIsAmended(hearingState$?: Observable<State>): Observable<boolean> {
    return hearingState$.pipe(map((state) => {
      const objAPanelRequirements = state.hearingRequestToCompare.hearingRequestMainModel.hearingDetails.panelRequirements;
      const objBPanelRequirements = state.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements;
      const objA = objAPanelRequirements && objAPanelRequirements.panelPreferences && objAPanelRequirements.panelPreferences.filter((panel) => panel.memberType === MemberType.JUDGE && panel.requirementType === RequirementType.MUSTINC);
      const objB = objBPanelRequirements && objBPanelRequirements.panelPreferences && objBPanelRequirements.panelPreferences.filter((panel) => panel.memberType === MemberType.JUDGE && panel.requirementType === RequirementType.MUSTINC);
      return !_.isEqual(objA, objB);
    }));
  }
}
