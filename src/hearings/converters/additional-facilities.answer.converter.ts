import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {RefDataModel} from '../models/refData.model';
import {State} from '../store';
import {AnswerConverter} from './answer.converter';

export class AdditionalFacilitiesAnswerConverter implements AnswerConverter {

  constructor(protected readonly route: ActivatedRoute) {
  }

  private static getFacilityValue(hearingFacilities: RefDataModel[], key: string): string {
    return hearingFacilities.find(facility => facility.key === key).value_en;
  }

  public transformAnswer(hearingState$: Observable<State>): Observable<string> {
    return hearingState$.pipe(
      map(state => {
        let result = '<ul>';
        const facilities = this.route.snapshot.data.additionFacilitiesOptions;
        state.hearingRequest.hearingRequestMainModel.hearingDetails.facilitiesRequired
        .map((facility: string) => result += `<li>${AdditionalFacilitiesAnswerConverter.getFacilityValue(facilities, facility)}</li>`);
        result += '</ul>';
        return result
      })
    );
  }
}
