import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { State } from '../store';
import { HiddenConverter } from './hidden.converter';
import { HearingsUtils } from '../utils/hearings.utils';

export class JudgeTypesHiddenConverter implements HiddenConverter {
  public transformHidden(hearingState$: Observable<State>): Observable<boolean> {
    return hearingState$.pipe(map((state) => {
      const panelRequirements = state.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements;
      const includedJudges: number = HearingsUtils.getMustIncludedJudgeCount(panelRequirements?.panelPreferences);
      if (includedJudges === 0 && panelRequirements?.roleType.length > 0) {
        return false;
      }
      return true;
    }
    ));
  }
}
