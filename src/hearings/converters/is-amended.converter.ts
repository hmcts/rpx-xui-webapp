import {Observable} from 'rxjs';
import {State} from '../store/reducers';

export interface IsAmendedConverter {
  transformIsAmended(hearingState$?: Observable<State>): Observable<boolean>;
}
