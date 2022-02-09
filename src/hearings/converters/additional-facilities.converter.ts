import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { RefDataModel } from '../models/refData.model';
import * as fromHearingStore from '../store';
import {AbstractConverter} from './abstract.converter';

export class AdditionalFacilitiesConverter extends AbstractConverter {

  constructor(protected readonly hearingStore: Store<fromHearingStore.State>) {
    super(hearingStore);
  }

  public transformAnswer(): Observable<string> {
    return this.hearingState.pipe(
      map(state => {
        const facilities = state.hearingReferenceData.hearingFacilities;
        const selection = state.hearingRequest.hearingRequestMainModel.hearingDetails.facilitiesRequired
          .map((facility: string) => AdditionalFacilitiesConverter.getFacilityValue(facilities, facility));
        const result = selection.join(', ');

        return result;
      })
    );
  }

  private static getFacilityValue(hearingFacilities: RefDataModel[], key: string): string {
    return hearingFacilities.find(facility => facility.key === key).value_en;
  }
}
