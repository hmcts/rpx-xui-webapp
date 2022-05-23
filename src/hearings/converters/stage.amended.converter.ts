import * as _ from 'lodash';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {State} from '../store/reducers';
import {IsAmendedConverter} from './is-amended.converter';

export class StageAmendedConverter implements IsAmendedConverter {
  public transformIsAmended(hearingState$?: Observable<State>): Observable<boolean> {
    return hearingState$.pipe(map(state => {
      const objA = state.hearingRequestToCompare.hearingRequestMainModel.hearingDetails.hearingType;
      const objB = state.hearingRequest.hearingRequestMainModel.hearingDetails.hearingType;
      return !_.isEqual(objA, objB);
    }));
  }
}
