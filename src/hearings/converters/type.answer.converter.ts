import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {State} from '../store';
import {AnswerConverter} from './answer.converter';

export class TypeAnswerConverter implements AnswerConverter {
  public transformAnswer(hearingState$: Observable<State>): Observable<string> {
    return hearingState$.pipe(
      map(state => {
        let result = `${state.hearingValues.serviceHearingValuesModel.caseType} \n<ul>`;
        state.hearingValues.serviceHearingValuesModel.caseSubTypes.forEach(
          subType => result += `<li>- ${subType.toString()}</li>`
        );
        result += '</ul>';
        return result;
      })
    );
  }
}
