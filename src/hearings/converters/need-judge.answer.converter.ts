import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RadioOptions } from '../models/hearings.enum';
import { State } from '../store';
import { AnswerConverter } from './answer.converter';

export class NeedJudgeAnswerConverter implements AnswerConverter {

  public transformAnswer(hearingState$: Observable<State>): Observable<string> {
    return hearingState$.pipe(
      map(state => {
        const panelRequirements = state.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements;
        if (panelRequirements && panelRequirements.roleType && panelRequirements.roleType.length) {
          return RadioOptions.NO;
        } else if (panelRequirements && panelRequirements.panelPreferences) {
          return RadioOptions.YES;
        }
        return '';
      })
    );
  }
}
