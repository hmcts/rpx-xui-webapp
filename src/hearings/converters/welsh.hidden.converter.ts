import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as fromHearingStore from '../store';
import {AbstractHiddenConverter} from './abstract.hidden.converter';

export class WelshHiddenConverter extends AbstractHiddenConverter {
  constructor(protected readonly hearingStore: Store<fromHearingStore.State>) {
    super(hearingStore);
  }

  public transformHidden(): Observable<boolean> {
    return this.hearingState.pipe(map(state =>
      !state.hearingRequest.hearingRequestMainModel.hearingDetails.hearingLocations.some(location => location.region === 'Wales')
    ));
  }
}
