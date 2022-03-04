import * as _ from 'lodash';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {State} from '../store/reducers';
import {IsAmendedConverter} from './is-amended.converter';

export class HowPartyAttendAmendedConverter implements IsAmendedConverter {
  public transformIsAmended(hearingState$?: Observable<State>): Observable<boolean> {
    return hearingState$.pipe(map(state => {
      const objA = state.hearingRequestToCompare.hearingRequestMainModel.partyDetails;
      const objB = state.hearingRequest.hearingRequestMainModel.partyDetails;
      return !_.isEqual(objA, objB);
    }));
  }
}
