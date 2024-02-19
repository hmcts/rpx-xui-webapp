import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MemberType, RadioOptions, RequirementType } from '../models/hearings.enum';
import { State } from '../store';
import { AnswerConverter } from './answer.converter';

export class NeedJudgeAnswerConverter implements AnswerConverter {
  public transformAnswer(hearingState$: Observable<State>): Observable<string> {
    return hearingState$.pipe(
      map((state) => {
        const panelRequirements = state.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements;
        const hasJudgeDetails = panelRequirements?.panelPreferences?.filter((panel) => panel.memberType === MemberType.JUDGE);
        const includedJudges: number = panelRequirements?.panelPreferences
          ?.filter((preferences) => preferences.memberType === MemberType.JUDGE && preferences.requirementType === RequirementType.MUSTINC).length || 0;

        if (includedJudges === 0 && panelRequirements?.roleType?.length > 0) {
          return RadioOptions.NO;
        } else if (hasJudgeDetails?.length) {
          return RadioOptions.YES;
        }
        return '';
      })
    );
  }
}
