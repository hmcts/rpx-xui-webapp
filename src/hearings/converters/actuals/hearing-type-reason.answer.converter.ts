import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {State} from '../../store';
import {AnswerConverter} from './answer.converter';

export class HearingTypeReasonAnswerConverter implements AnswerConverter {
  public transformAnswer(hearingActuals$: Observable<State>): Observable<string> {
    return hearingActuals$.pipe(
      map(state => state.hearingActuals.hearingActualsMainModel.hearingActuals.actualHearingDays[0].hearingDate)
    );
  }
}
