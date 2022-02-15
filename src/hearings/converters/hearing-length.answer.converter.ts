import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { State } from '../store';
import { AnswerConverter } from './answer.converter';

export class HearingLengthAnswerConverter implements AnswerConverter {

  public transformAnswer(hearingState$: Observable<State>): Observable<string> {
    return hearingState$.pipe(
      map(state => {
        const duration = state.hearingRequest.hearingRequestMainModel.hearingDetails.duration;
        if (duration) {
          const hours = Math.floor(duration / 60);
          const minutes = duration % 60;
          if (hours > 0 && minutes > 0) {
            return `${hours} hour(s) and ${minutes} minute(s)`;
          } else if (hours === 0 && minutes > 0) {
            return `${minutes} minutes`;
          } else if (hours > 0 && minutes === 0) {
            return `${hours} hour(s)`;
          }
        }
        return '';
      })
    );
  }
}
