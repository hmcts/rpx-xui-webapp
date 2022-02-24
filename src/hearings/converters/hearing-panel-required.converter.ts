import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MemberType } from '../models/hearings.enum';
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
        const panelPreferences = state.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements.panelPreferences || []
        const hasPanelMembers = panelPreferences.filter((ref) => ref.memberType ===  MemberType.PANEL_MEMBER)
        return hasPanelMembers.length > 0
          ? 'Yes'
          : 'No';
      })
    );
  }
}
