import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LovRefDataModel } from '../models/lovRefData.model';
import { State } from '../store';
import { AnswerConverter } from './answer.converter';
import { HearingsUtils } from '../utils/hearings.utils';

export class PanelRolesAnswerConverter implements AnswerConverter {
  constructor(protected readonly route: ActivatedRoute) {}

  public transformAnswer(hearingState$: Observable<State>): Observable<string> {
    const panelRoles: LovRefDataModel[] = this.route.snapshot.data.otherPanelRoles;

    return hearingState$.pipe(
      map((state) => {
        const panelRequirements = state.hearingConditions?.isHearingAmendmentsEnabled
          ? state.hearingRequestToCompare.hearingRequestMainModel.hearingDetails.panelRequirements
          : state.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements;
        const SelectedPanelSpecialism: string[] = panelRequirements && panelRequirements.panelSpecialisms || [];
        const SelectedPanelRoles: string[] = panelRequirements && panelRequirements.roleType || [];
        return HearingsUtils.returnPanelRoles(SelectedPanelSpecialism, SelectedPanelRoles, panelRoles, '<br>');
      })
    );
  }
}
