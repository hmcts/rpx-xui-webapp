import moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HearingDateEnum } from '../models/hearings.enum';
import { State } from '../store';
import { AnswerConverter } from './answer.converter';

export class DateResponseSubmittedTimeAnswerConverter implements AnswerConverter {
  public transformAnswer(hearingState$: Observable<State>): Observable<string> {
    return hearingState$.pipe(
      map(state => {
        const hearingStartDateTime = state.hearingRequest.hearingRequestMainModel.hearingResponse
          && state.hearingRequest.hearingRequestMainModel.hearingResponse.hearingDaySchedule
          && state.hearingRequest.hearingRequestMainModel.hearingResponse.hearingDaySchedule.length
          && state.hearingRequest.hearingRequestMainModel.hearingResponse.hearingDaySchedule[0].hearingStartDateTime;
        // it is assumed and confirmed from HMC this date time is always utc so we convert it here.
        return hearingStartDateTime ? moment.utc(hearingStartDateTime).local().format(HearingDateEnum.DisplayTime) : '';
      })
    );
  }
}

