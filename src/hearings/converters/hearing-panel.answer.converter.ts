import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MemberType, RadioOptions } from '../models/hearings.enum';
import { State } from '../store';
import { AnswerConverter } from './answer.converter';
import { HearingsUtils } from '../utils/hearings.utils';

export class HearingPanelAnswerConverter implements AnswerConverter {
  public transformAnswer(hearingState$: Observable<State>): Observable<string> {
    return hearingState$.pipe(
      map((state) => {
        const panelRequirements = state.hearingConditions?.isHearingAmendmentsEnabled
          ? state.hearingRequestToCompare.hearingRequestMainModel.hearingDetails.panelRequirements
          : state.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements;
        const panelMembers: number = panelRequirements?.panelPreferences?.filter((preferences) => preferences.memberType === MemberType.PANEL_MEMBER).length || 0;

        const includedJudges: number = HearingsUtils.getMustIncludedJudgeCount(panelRequirements?.panelPreferences);
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
