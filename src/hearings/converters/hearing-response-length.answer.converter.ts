import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { State } from '../store';
import { AnswerConverter } from './answer.converter';

export class HearingResponseLengthAnswerConverter implements AnswerConverter {

  public transformAnswer(hearingState$: Observable<State>): Observable<string> {
    return hearingState$.pipe(
      map(state => {
        const startTime = moment(state.hearingRequest.hearingRequestMainModel.hearingResponse.hearingDaySchedule.hearingStartDateTime);
        const endTime = moment(state.hearingRequest.hearingRequestMainModel.hearingResponse.hearingDaySchedule.hearingEndDateTime);
        const duration = moment.duration(endTime.diff(startTime)).asMinutes();
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
