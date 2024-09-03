import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { State } from '../store';
import { HiddenConverter } from './hidden.converter';

export class HearingTimingExclusionHiddenConverter implements HiddenConverter {
  public transformHidden(hearingState$: Observable<State>): Observable<boolean> {
    return hearingState$.pipe(map((state) => {
      return state.hearingValues?.serviceHearingValuesModel?.screenFlow?.findIndex((screen) => screen.screenName === 'hearing-timing') > -1 ? false : true;
    }));
  }
}
