import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {LovRefDataModel} from '../models/lovRefData.model';
import {State} from '../store';
import {AnswerConverter} from './answer.converter';

export class HearingPanelIncludeMemberConverter implements AnswerConverter {

  constructor(protected readonly route: ActivatedRoute) {
  }

  private static getFacilityValue(hearingFacilities: LovRefDataModel[], key: string): string {
    return hearingFacilities.find(facility => facility.key === key).value_en;
  }

  public transformAnswer(hearingState$: Observable<State>): Observable<string> {
    return hearingState$.pipe(
      map(state => {
        return state.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements.panelSpecialisms[0]
      })
    );
  }
}
