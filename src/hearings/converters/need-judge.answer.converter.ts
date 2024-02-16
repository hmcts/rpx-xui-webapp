import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MemberType, RadioOptions, RequirementType } from '../models/hearings.enum';
import { State } from '../store';
import { AnswerConverter } from './answer.converter';

export class NeedJudgeAnswerConverter implements AnswerConverter {
  public transformAnswer(hearingState$: Observable<State>): Observable<string> {
    return hearingState$.pipe(
      map((state) => {
        const panelPreferences = state.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements.panelPreferences;
        const hasJudgeDetails = panelPreferences?.filter((panel) => panel.memberType === MemberType.JUDGE);
        const includedJudges: number = panelPreferences
          ?.filter((preferences) => preferences.memberType === MemberType.JUDGE && preferences.requirementType === RequirementType.MUSTINC).length || 0;

        if (includedJudges === 0) {
          return RadioOptions.NO;
        } else if (hasJudgeDetails?.length) {
          return RadioOptions.YES;
        }
        return '';
      })
    );
  }
}
