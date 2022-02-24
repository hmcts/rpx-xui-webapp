import {Observable} from 'rxjs';
import {State} from '../../store';

export interface AnswerConverter {
  transformAnswer(hearingActuals$?: Observable<State>): Observable<string>;
}
