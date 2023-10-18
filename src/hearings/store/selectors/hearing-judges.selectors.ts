import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
export const getHearingJudgeIds = createSelector(
  fromFeature.getHearingsFeatureState,
  (state: fromFeature.State) => {
    let hearingJudges: string[] = [];
    for (let caseHearings of state.hearingList.hearingListMainModel.caseHearings) {
      for (let hearingDaySchedule of caseHearings.hearingDaySchedule) {
        hearingJudges.push(hearingDaySchedule.hearingJudgeId);
      }
    }
    return hearingJudges;
  }
);
