import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HiddenConverter } from './hidden.converter';
import { State } from '../store';

export class HearingPanelSelectorHiddenConverter implements HiddenConverter {
  public transformHidden(hearingState$: Observable<State>): Observable<boolean> {
    return hearingState$.pipe(map((state) => {
      return state.hearingValues?.serviceHearingValuesModel?.screenFlow?.
        findIndex((screen) => screen.screenName === 'hearing-panel-required') > -1 ? false : true;
    }));
  }
}
