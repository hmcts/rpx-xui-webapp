import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HearingDateEnum } from '../models/hearings.enum';
import { State } from '../store';
import { AnswerConverter } from './answer.converter';

export class DateRequestFailedAnswerConverter implements AnswerConverter {
  public transformAnswer(hearingState$: Observable<State>): Observable<string> {
    return hearingState$.pipe(
      map((state) => {
        const hearingResponse = state.hearingRequest.hearingRequestMainModel;

        if (hearingResponse.hearingResponse.errorTimestamp) {
          return moment(hearingResponse.hearingResponse.errorTimestamp).format(HearingDateEnum.RequestFailedDateAndTime);
        } else if (hearingResponse.requestDetails) {
          return moment(hearingResponse.requestDetails.timestamp).format(HearingDateEnum.RequestFailedDateAndTime);
        }
        return '';
      })
    );
  }
}
