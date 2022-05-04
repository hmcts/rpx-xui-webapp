import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {CategoryType} from '../models/hearings.enum';
import {State} from '../store';
import {AnswerConverter} from './answer.converter';

export class TypeAnswerConverter implements AnswerConverter {
  public transformAnswer(hearingState$: Observable<State>): Observable<string> {
    return hearingState$.pipe(
      map(state => {
        let result = '';
        state.hearingValues.serviceHearingValuesModel.caseCategories.forEach(caseCategory => {
          if (caseCategory.categoryType === CategoryType.CaseType) {
            result += `${caseCategory.categoryValue} \n<ul>`;
          } else if (caseCategory.categoryType === CategoryType.CaseSubType) {
            result += `<li>- ${caseCategory.categoryValue}</li>`;
          }
        });
        result += '</ul>';
        return result;
      })
    );
  }
}
