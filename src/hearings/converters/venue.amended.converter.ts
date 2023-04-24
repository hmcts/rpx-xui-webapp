import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { State } from '../store/reducers';
import { IsAmendedConverter } from './is-amended.converter';

export class VenueAmendedConverter implements IsAmendedConverter {
  public transformIsAmended(hearingState$?: Observable<State>): Observable<boolean> {
    return hearingState$.pipe(map((state) => {
      const objA = state.hearingRequestToCompare.hearingRequestMainModel.hearingDetails.hearingLocations.map((loc) => loc.locationId);
      const objB = state.hearingRequest.hearingRequestMainModel.hearingDetails.hearingLocations.map((loc) => loc.locationId);
      return !_.isEqual(objA, objB);
    }));
  }
}
