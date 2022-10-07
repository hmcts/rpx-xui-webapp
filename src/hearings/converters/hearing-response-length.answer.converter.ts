import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { State } from '../store';
import { AnswerConverter } from './answer.converter';

export class HearingResponseLengthAnswerConverter implements AnswerConverter {

  public transformAnswer(hearingState$: Observable<State>): Observable<string> {
    return hearingState$.pipe(
      map(state => {
        const hearingSchedule = state.hearingRequest.hearingRequestMainModel.hearingResponse.hearingDaySchedule[0] || null;
        const startTime = moment(hearingSchedule && hearingSchedule.hearingStartDateTime);
        const endTime = moment(hearingSchedule && hearingSchedule.hearingEndDateTime);
        const duration = moment.duration(endTime.diff(startTime)).asMinutes();
        if (duration && duration > 0) {
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
