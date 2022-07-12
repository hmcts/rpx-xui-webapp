import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HearingDateEnum } from '../models/hearings.enum';
import { State } from '../store';
import { AnswerConverter } from './answer.converter';

export class DateResponseSubmittedMultiDayAnswerConverter implements AnswerConverter {
  public transformAnswer(hearingState$: Observable<State>): Observable<string> {
    return hearingState$.pipe(
      map(state => {
        const hearingResponse = state.hearingRequest.hearingRequestMainModel.hearingResponse;
        const hearingStartDateTime = hearingResponse
          && hearingResponse.hearingDaySchedule
          && hearingResponse.hearingDaySchedule.length
          && hearingResponse.hearingDaySchedule[0]
          && hearingResponse.hearingDaySchedule[0].hearingStartDateTime;
        const hearingEndDateTime = hearingResponse
          && hearingResponse.hearingDaySchedule
          && hearingResponse.hearingDaySchedule.length
          && hearingResponse.hearingDaySchedule.length > 0
          && hearingResponse.hearingDaySchedule[hearingResponse.hearingDaySchedule.length - 1].hearingEndDateTime;
        return hearingStartDateTime && hearingEndDateTime
            ? `${moment(hearingStartDateTime).format(HearingDateEnum.DisplayMonth)} - ${moment(hearingEndDateTime).format(HearingDateEnum.DisplayMonth)}`
            : '';
      })
    );
  }
}

