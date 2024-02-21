import { HiddenConverter } from './hidden.converter';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { State } from '../store';
import { HearingsUtils } from '../utils/hearings.utils';

export class PanelMemberRolesHiddenConverter implements HiddenConverter {
  public transformHidden(hearingState$: Observable<State>): Observable<boolean> {
    return hearingState$.pipe(map((state) => {
      const panelRequirements = state.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements;
      const includedJudges: number = HearingsUtils.getMustIncludedJudgeCount(panelRequirements.panelPreferences);
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
