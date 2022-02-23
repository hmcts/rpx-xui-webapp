import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { State } from '../store';
import { AnswerConverter } from './answer.converter';

export class HearingPanelRequiredConverter implements AnswerConverter {
  constructor(protected readonly route: ActivatedRoute) {}

  public transformAnswer(hearingState$: Observable<State>): Observable<string> {
    return hearingState$.pipe(
      map((state) => {
        if (
          !state.hearingRequest.hearingRequestMainModel.hearingDetails ||
          !state.hearingRequest.hearingRequestMainModel.hearingDetails
            .panelRequirements
        )
          return;
        return state.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements.panelPreferences.length > 0
          ? 'Yes'
          : 'No';
      })
    );
  }
}
