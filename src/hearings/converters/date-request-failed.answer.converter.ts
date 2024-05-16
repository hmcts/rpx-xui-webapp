import * as moment from 'moment-timezone';
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
        if (hearingResponse.hearingResponse?.errorTimestamp) {
          const errorTimestampBST = moment.utc(hearingResponse.hearingResponse.errorTimestamp).tz('Europe/London'); // Convert to BST
          return errorTimestampBST.format(HearingDateEnum.RequestFailedDateAndTime);
        } else if (hearingResponse.requestDetails) {
          const requestTimestampBST = moment.utc(hearingResponse.requestDetails.timestamp).tz('Europe/London'); // Convert to BST
          return requestTimestampBST.format(HearingDateEnum.RequestFailedDateAndTime);
        }

        return '';
      })
    );
  }
}
