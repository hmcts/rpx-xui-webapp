import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {State} from '../store';
import {HiddenConverter} from './hidden.converter';

export class WelshHiddenConverter implements HiddenConverter {

  public transformHidden(hearingState$: Observable<State>): Observable<boolean> {
    return hearingState$.pipe(map(state =>
      !state.hearingRequest.hearingRequestMainModel.hearingDetails.hearingLocations.some(location => location.region === 'Wales')
    ));
  }
}
