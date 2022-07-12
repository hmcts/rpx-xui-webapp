import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HearingDateEnum } from '../models/hearings.enum';
import { State } from '../store';
import { AnswerConverter } from './answer.converter';

export class DateResponseSubmittedTimeAnswerConverter implements AnswerConverter {
  public transformAnswer(hearingState$: Observable<State>, index: number): Observable<string> {
    return hearingState$.pipe(
      map(state => {
        const hearingResponse = state.hearingRequest.hearingRequestMainModel.hearingResponse;
        const hearingStartDateTime = hearingResponse
          && hearingResponse.hearingDaySchedule
          && hearingResponse.hearingDaySchedule.length
          && hearingResponse.hearingDaySchedule[index || 0]
          && hearingResponse.hearingDaySchedule[index || 0].hearingStartDateTime;
        // it is assumed and confirmed from HMC this date time is always utc so we convert it here.
        return hearingStartDateTime ? moment(hearingStartDateTime).utc().format(HearingDateEnum.DisplayTime) : '';
      })
    );
  }
}

