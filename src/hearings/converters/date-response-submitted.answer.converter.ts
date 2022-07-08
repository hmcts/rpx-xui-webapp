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
        const hearingStartDateTime = state.hearingRequest.hearingRequestMainModel.hearingResponse
          && state.hearingRequest.hearingRequestMainModel.hearingResponse.hearingDaySchedule
          && state.hearingRequest.hearingRequestMainModel.hearingResponse.hearingDaySchedule.length
          && state.hearingRequest.hearingRequestMainModel.hearingResponse.hearingDaySchedule[index]
          && state.hearingRequest.hearingRequestMainModel.hearingResponse.hearingDaySchedule[index].hearingStartDateTime;
        return hearingStartDateTime ? moment(hearingStartDateTime).format(HearingDateEnum.DisplayMonth) : '';
      })
    );
  }
}

