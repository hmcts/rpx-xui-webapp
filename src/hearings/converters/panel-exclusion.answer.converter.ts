import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MemberType, RequirementType } from '../models/hearings.enum';
import { JudicialUserModel } from '../models/judicialUser.model';
import { State } from '../store';
import { AnswerConverter } from './answer.converter';

export class PanelExclusionAnswerConverter implements AnswerConverter {
  constructor(protected readonly route: ActivatedRoute) { }

  public transformAnswer(hearingState$: Observable<State>): Observable<string> {
    const judicialUsersList: JudicialUserModel[] = this.route.snapshot.data.judicialUsers;

    return hearingState$.pipe(
      map(state => {
        const panelRequirements = state.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements;
        const excludedJudges: string[] = panelRequirements && panelRequirements.panelPreferences.filter(preferences => preferences.memberType === MemberType.PANEL_MEMBER && preferences.requirementType === RequirementType.EXCLUDE).map(preferences => preferences.memberID);
        const excludedJudgeNames: string[] = [];
        judicialUsersList.forEach(judgeInfo => {
          if (excludedJudges.includes(judgeInfo.personalCode)) {
            excludedJudgeNames.push(judgeInfo.knownAs ? judgeInfo.knownAs : judgeInfo.fullName);
          }
        });
        return excludedJudgeNames.join();
      })
    );
  }
}
