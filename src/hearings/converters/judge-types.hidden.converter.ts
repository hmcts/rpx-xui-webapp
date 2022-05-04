import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { State } from '../store';
import { HiddenConverter } from './hidden.converter';

export class JudgeTypesHiddenConverter implements HiddenConverter {

  public transformHidden(hearingState$: Observable<State>): Observable<boolean> {
    return hearingState$.pipe(map(state => {
      const panelRequirements = state.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements;
      if (panelRequirements && panelRequirements.roleType) {
        return !panelRequirements.roleType.length;
      }
      return true;
    }
    ));
  }
}
