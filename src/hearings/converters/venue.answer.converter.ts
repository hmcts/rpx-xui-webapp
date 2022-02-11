import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {State} from '../store';
import {AnswerConverter} from './answer.converter';

export class VenueAnswerConverter implements AnswerConverter {
  public transformAnswer(hearingState$: Observable<State>): Observable<string> {
    return hearingState$.pipe(
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
