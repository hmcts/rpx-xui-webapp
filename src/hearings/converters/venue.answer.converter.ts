import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { HearingLocationModel } from '../models/hearingLocation.model';
import { LocationByEpimmsModel } from '../models/location.model';
import { LocationsDataService } from '../services/locations-data.service';
import { State } from '../store';
import { AnswerConverter } from './answer.converter';

export class VenueAnswerConverter implements AnswerConverter {
  constructor(protected readonly locationsDataService: LocationsDataService) {}

  public transformAnswer(hearingState$: Observable<State>): Observable<string> {
    return hearingState$.pipe(
      take(1),
      switchMap((state) => {
        const hearingLocations = state.hearingConditions?.isHearingAmendmentsEnabled
          ? state.hearingRequestToCompare.hearingRequestMainModel.hearingDetails.hearingLocations
          : state.hearingRequest.hearingRequestMainModel.hearingDetails.hearingLocations;
        const serviceCode = state.hearingRequest.hearingRequestMainModel.caseDetails.hmctsServiceCode;
        const locationIds = hearingLocations.map((hearingLocationModel: HearingLocationModel) => hearingLocationModel.locationId).join(',');
        return this.locationsDataService.getLocationById(locationIds, serviceCode).pipe(
          map((LocationByEpimmsModels: LocationByEpimmsModel[]) => {
            let result = '<ul>';
            LocationByEpimmsModels.forEach((LocationByEpimmsModel: LocationByEpimmsModel) =>
              result += `<li>${LocationByEpimmsModel.court_name}</li>`);
            result += '</ul>';
            return result;
          }));
      }));
  }
}
