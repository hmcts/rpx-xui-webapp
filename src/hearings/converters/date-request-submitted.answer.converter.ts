import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HearingDateEnum } from '../models/hearings.enum';
import { State } from '../store';
import { AnswerConverter } from './answer.converter';

export class DateRequestSubmittedAnswerConverter implements AnswerConverter {
  public transformAnswer(hearingState$: Observable<State>): Observable<string> {
    return hearingState$.pipe(
      map((state) => {
        if (state.hearingRequest.hearingRequestMainModel?.requestDetails) {
          const requestDetails = state.hearingRequest.hearingRequestMainModel.requestDetails;
          return moment(requestDetails.timestamp).format(HearingDateEnum.DisplayMonth);
        }
        return '';
      })
    );
  }
}

