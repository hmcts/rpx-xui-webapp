import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { State } from '../store';
import { AnswerConverter } from './answer.converter';

export class PublicCaseNameAnswerConverter implements AnswerConverter {
  public transformAnswer(hearingState$: Observable<State>): Observable<string> {
    return hearingState$.pipe(
      map((state) => state.hearingRequest.hearingRequestMainModel.caseDetails.publicCaseName)
    );
  }
}
