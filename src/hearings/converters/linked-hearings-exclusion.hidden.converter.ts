import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { State } from '../store';
import { HiddenConverter } from './hidden.converter';

export class LinkedHearingsExclusionHiddenConverter implements HiddenConverter {
  public transformHidden(hearingState$: Observable<State>): Observable<boolean> {
    return hearingState$.pipe(map((state) => {
      return state.hearingValues?.serviceHearingValuesModel?.screenFlow?.findIndex((screen) => screen.screenName === 'hearing-link') > -1 ? false : true;
    }));
  }
}
