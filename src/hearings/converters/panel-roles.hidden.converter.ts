import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { State } from '../store';
import { HiddenConverter } from './hidden.converter';

export class PanelRolesHiddenConverter implements HiddenConverter {

  public transformHidden(hearingState$: Observable<State>): Observable<boolean> {
    return hearingState$.pipe(map(state => {
      const panelRequirements = state.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements;
      if (panelRequirements && panelRequirements.panelSpecialisms) {
        return !panelRequirements.panelSpecialisms.length;
      }
      return true;
    }
    ));
  }
}
