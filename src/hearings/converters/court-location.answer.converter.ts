import {ActivatedRoute} from '@angular/router';
import {LocationModel} from '@hmcts/rpx-xui-common-lib/lib/models/location.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {State} from '../store';
import {AnswerConverter} from './answer.converter';

export class CourtLocationAnswerConverter implements AnswerConverter {
  constructor(protected readonly route: ActivatedRoute) {
  }

  public transformAnswer(hearingState$: Observable<State>, index: number): Observable<string> {
    const courtLocations: LocationModel[] = this.route.snapshot.data.courtLocation || [];
    return hearingState$.pipe(
      map(state => {
        const hearingResponse = state.hearingRequest.hearingRequestMainModel.hearingResponse;
        const hearingVenueId = hearingResponse
          && hearingResponse.hearingDaySchedule
          && hearingResponse.hearingDaySchedule.length
          && hearingResponse.hearingDaySchedule[index].hearingVenueId;
        const courtLocationInfo = courtLocations.find(courtLocation => courtLocation.epimms_id === hearingVenueId);
        return courtLocationInfo ? courtLocationInfo.site_name : '';
      })
    );
  }
}
