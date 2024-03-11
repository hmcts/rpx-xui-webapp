import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LovRefDataModel } from '../models/lovRefData.model';
import { State } from '../store';
import { AnswerConverter } from './answer.converter';
import { HearingsUtils } from '../utils/hearings.utils';

export class JudgeTypesAnswerConverter implements AnswerConverter {
  constructor(protected readonly route: ActivatedRoute) {}

  public transformAnswer(hearingState$: Observable<State>): Observable<string> {
    const judgeTypes: LovRefDataModel[] = this.route.snapshot.data.judgeTypes;

    return hearingState$.pipe(
      map((state) => {
        const panelRequirements = state.hearingConditions?.isHearingAmendmentsEnabled
          ? state.hearingRequestToCompare.hearingRequestMainModel.hearingDetails.panelRequirements
          : state.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements;
        const includedJudges: number = HearingsUtils.getMustIncludedJudgeCount(panelRequirements?.panelPreferences);

        if (includedJudges === 0 && panelRequirements?.roleType.length > 0) {
          const selectedJudgeTypes: string[] = [];
          const selectedPanelRole = panelRequirements.roleType[0];
          judgeTypes.forEach((judgeType) => {
            if (selectedPanelRole.includes(judgeType.key)) {
              selectedJudgeTypes.push(judgeType.value_en);
            }
          });
          return selectedJudgeTypes.join(', ');
        }
        return '';
      })
    );
  }
}
