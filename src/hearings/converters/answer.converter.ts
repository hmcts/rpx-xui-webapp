import {Observable} from 'rxjs';
import {State} from '../store/reducers';

export interface AnswerConverter {
  transformAnswer(hearingState$?: Observable<State>): Observable<string>;
}
