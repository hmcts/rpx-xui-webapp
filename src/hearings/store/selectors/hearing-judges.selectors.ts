import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
export const getHearingJudgeIds = createSelector(
  fromFeature.getHearingsFeatureState,
  (state: fromFeature.State) => {
    const hearingJudges: string[] = [];
    for (const caseHearings of state.hearingList.hearingListMainModel.caseHearings) {
      for (const hearingDaySchedule of caseHearings.hearingDaySchedule) {
        hearingJudges.push(hearingDaySchedule.hearingJudgeId);
      }
    }
    return hearingJudges;
  }
);
