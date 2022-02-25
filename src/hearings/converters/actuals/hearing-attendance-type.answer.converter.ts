import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {State} from '../../store';
import {AnswerConverter} from './answer.converter';

export class HearingAttendanceTypeAnswerConverter implements AnswerConverter {
  public transformAnswer(hearingState$: Observable<State>): Observable<string> {
    return hearingState$.pipe(
      map(state => state.hearingActuals.hearingActualsMainModel.hearingActuals.hearingOutcome.hearingResult)
    );
  }
}
