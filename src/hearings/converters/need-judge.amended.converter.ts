import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { State } from '../store/reducers';
import { IsAmendedConverter } from './is-amended.converter';
import { HearingsUtils } from '../utils/hearings.utils';

export class NeedJudgeAmendedConverter implements IsAmendedConverter {
  public transformIsAmended(hearingState$?: Observable<State>): Observable<boolean> {
    return hearingState$.pipe(map((state) => {
      const objAPanelRequirements = state.hearingRequestToCompare.hearingRequestMainModel.hearingDetails.panelRequirements;
      const objBPanelRequirements = state.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements;

      const objAIncludedJudges: number = HearingsUtils.getMustIncludedJudgeCount(objAPanelRequirements?.panelPreferences);
      const objBIncludedJudges: number = HearingsUtils.getMustIncludedJudgeCount(objBPanelRequirements?.panelPreferences);
      return !_.isEqual(objAIncludedJudges, objBIncludedJudges);
    }));
  }
}
