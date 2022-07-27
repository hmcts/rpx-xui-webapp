import * as _ from 'lodash';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {State} from '../store/reducers';
import {IsAmendedConverter} from './is-amended.converter';

export class AdditionalSecurityAmendedConverter implements IsAmendedConverter {
  public transformIsAmended(hearingState$?: Observable<State>): Observable<boolean> {
    return hearingState$.pipe(map(state => {
      const objA = state.hearingRequestToCompare.hearingRequestMainModel.caseDetails.caseAdditionalSecurityFlag;
      const objB = state.hearingRequest.hearingRequestMainModel.caseDetails.caseAdditionalSecurityFlag;
      return !_.isEqual(objA, objB);
    }));
  }
}
