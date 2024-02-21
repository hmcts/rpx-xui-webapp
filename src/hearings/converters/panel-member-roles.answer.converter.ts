import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LovRefDataModel } from '../models/lovRefData.model';
import { State } from '../store';
import { AnswerConverter } from './answer.converter';
import { HearingsUtils } from '../utils/hearings.utils';

export class PanelMemberRolesAnswerConverter implements AnswerConverter {
  constructor(protected readonly route: ActivatedRoute) {}

  public transformAnswer(hearingState$: Observable<State>): Observable<string> {
    const panelMemberRoles: LovRefDataModel[] = this.route.snapshot.data.otherPanelRoles;

    return hearingState$.pipe(
      map((state) => {
        const panelRequirements = state.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements;
        const includedJudges: number = HearingsUtils.getMustIncludedJudgeCount(panelRequirements.panelPreferences);
        const selectedPanelMembers: string[] = [];
        let selectedPanelRole: string[];
        if (includedJudges === 0 && panelRequirements.roleType.length > 0) {
          selectedPanelRole = HearingsUtils.getRestOfRoleType(panelRequirements.roleType);
        } else if (includedJudges > 0 && panelRequirements.roleType.length > 0) {
          selectedPanelRole = panelRequirements.roleType;
        } else {
          selectedPanelRole = [];
        }

        panelMemberRoles.forEach((panel) => {
          if (selectedPanelRole.includes(panel.key)) {
            selectedPanelMembers.push(panel.value_en);
          }
        });
        return selectedPanelMembers.join(', ');
      })
    );
  }
}
