import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { State } from '../store';
import { HiddenConverter } from './hidden.converter';
import { MemberType, RequirementType } from '../models/hearings.enum';

export class PanelMemberRolesHiddenConverter implements HiddenConverter {
  public transformHidden(hearingState$: Observable<State>): Observable<boolean> {
    return hearingState$.pipe(map((state) => {
      const panelRequirements = state.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements;
      const includedJudges: number = panelRequirements.panelPreferences
          ?.filter((preferences) => preferences.memberType === MemberType.JUDGE && preferences.requirementType === RequirementType.MUSTINC).length || 0;
      if (includedJudges === 0) {
        return !(panelRequirements.roleType.length > 1);
      } else if (includedJudges > 0) {
        return !(panelRequirements.roleType.length > 0);
      }
      return true;
    }
    ));
  }
}
