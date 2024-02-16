import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MemberType, RadioOptions, RequirementType } from '../models/hearings.enum';
import { State } from '../store';
import { AnswerConverter } from './answer.converter';

export class HearingPanelAnswerConverter implements AnswerConverter {
  public transformAnswer(hearingState$: Observable<State>): Observable<string> {
    return hearingState$.pipe(
      map((state) => {
        const panelRequirements = state.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements;
        const panelMembers: number = panelRequirements?.panelPreferences?.filter((preferences) => preferences.memberType === MemberType.PANEL_MEMBER).length || 0;
        const includedJudges: number = panelRequirements.panelPreferences
          ?.filter((preferences) => preferences.memberType === MemberType.JUDGE && preferences.requirementType === RequirementType.MUSTINC).length || 0;
        const otherPanelMembers: number = panelRequirements?.roleType?.length || 0;
        const panelSpecialisms: number = panelRequirements?.panelSpecialisms?.length || 0;
        const checkOtherPanelMembers = (includedJudges === 0 && otherPanelMembers > 1) || (includedJudges > 0 && otherPanelMembers > 0);

        if (panelMembers > 0 || panelSpecialisms > 0 || checkOtherPanelMembers) {
          return RadioOptions.YES;
        }

        return RadioOptions.NO;
      })
    );
  }
}
