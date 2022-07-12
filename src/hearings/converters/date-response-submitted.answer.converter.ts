import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HearingDateEnum } from '../models/hearings.enum';
import { State } from '../store';
import { AnswerConverter } from './answer.converter';

export class DateResponseSubmittedAnswerConverter implements AnswerConverter {
  public transformAnswer(hearingState$: Observable<State>, index: number): Observable<string> {
    return hearingState$.pipe(
      map(state => {
        const hearingResponse = state.hearingRequest.hearingRequestMainModel.hearingResponse;
        const hearingStartDateTime = hearingResponse
          && hearingResponse.hearingDaySchedule
          && hearingResponse.hearingDaySchedule.length
          && hearingResponse.hearingDaySchedule[index || 0]
          && hearingResponse.hearingDaySchedule[index || 0].hearingStartDateTime;
        return hearingStartDateTime ? moment(hearingStartDateTime).format(HearingDateEnum.DisplayMonth) : '';
      })
    );
  }
}

