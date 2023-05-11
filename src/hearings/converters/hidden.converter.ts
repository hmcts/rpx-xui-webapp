import { Observable } from 'rxjs';
import { State } from '../store/reducers';

export interface HiddenConverter {
  transformHidden(hearingState$?: Observable<State>): Observable<boolean>;
}
