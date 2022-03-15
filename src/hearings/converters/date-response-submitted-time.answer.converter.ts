import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HearingDateEnum } from '../models/hearings.enum';
import { State } from '../store';
import { AnswerConverter } from './answer.converter';

export class DateResponseSubmittedTimeAnswerConverter implements AnswerConverter {
  public transformAnswer(hearingState$: Observable<State>): Observable<string> {
    return hearingState$.pipe(
      map(state => {
        const hearingResponseTime = state.hearingRequest.hearingRequestMainModel.hearingResponse.receivedDateTime;
        return moment(hearingResponseTime).format(HearingDateEnum.DisplayTime);
      })
    );
  }
}

