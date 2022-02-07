import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as fromHearingStore from '../store';
import {AbstractAnswerConverter} from './abstract.answer.converter';

export class VenueAnswerConverter extends AbstractAnswerConverter {
  constructor(protected readonly hearingStore: Store<fromHearingStore.State>) {
    super(hearingStore);
  }

  public transformAnswer(): Observable<string> {
    return this.hearingState.pipe(
      map(state => {
        let result = '<ul>';
        state.hearingRequest.hearingRequestMainModel.hearingDetails.hearingLocations.forEach(
          location => result += `<li>${location.locationName}</li>`
        );
        result += '</ul>';
        return result;
      })
    );
  }
}
