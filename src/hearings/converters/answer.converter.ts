import {Observable} from 'rxjs';
import {State} from '../store';

export interface AnswerConverter {
  transformAnswer(hearingState$?: Observable<State>): Observable<string>;
}
