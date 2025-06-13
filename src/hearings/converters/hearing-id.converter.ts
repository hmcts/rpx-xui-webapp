import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { State } from '../store';
import { AnswerConverter } from './answer.converter';

export class HearingIdAnswerConverter implements AnswerConverter {
  public transformAnswer(hearingState$: Observable<State>): Observable<string> {
    return hearingState$.pipe(
      map((state) => {
        const hearingId = state.hearingConditions?.isHearingAmendmentsEnabled
          ? state.hearingRequestToCompare.hearingRequestMainModel?.requestDetails?.hearingRequestID
          : state.hearingRequest.hearingRequestMainModel?.requestDetails.hearingRequestID;
        return hearingId;
      })
    );
  }
}

