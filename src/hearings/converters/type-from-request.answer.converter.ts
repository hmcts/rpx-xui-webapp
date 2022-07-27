import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {CategoryType} from '../models/hearings.enum';
import {State} from '../store';
import {AnswerConverter} from './answer.converter';

export class TypeFromRequestAnswerConverter implements AnswerConverter {
  public transformAnswer(hearingState$: Observable<State>): Observable<string> {
    return hearingState$.pipe(
      map(state => {
        let result = '';
        if (state.hearingRequest && state.hearingRequest.hearingRequestMainModel
          && state.hearingRequest.hearingRequestMainModel.caseDetails
          && state.hearingRequest.hearingRequestMainModel.caseDetails.caseCategories) {
          const caseTypeModel = state.hearingRequest.hearingRequestMainModel.caseDetails.caseCategories.find(
            cat => cat.categoryType === CategoryType.CaseType);
          const caseSubTypeModels = state.hearingRequest.hearingRequestMainModel.caseDetails.caseCategories.filter(
            cat => cat.categoryType === CategoryType.CaseSubType);
          result = `${caseTypeModel.categoryValue} \n<ul>`;
          caseSubTypeModels.forEach(
            subType => result += `<li>- ${subType.categoryValue.toString()}</li>`
          );
          result += '</ul>';
        }
        return result;
      })
    );
  }
}
