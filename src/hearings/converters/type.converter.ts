import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as fromHearingStore from '../store';
import {AbstractConverter} from './abstract.converter';

export class TypeConverter extends AbstractConverter {
  constructor(protected readonly hearingStore: Store<fromHearingStore.State>) {
    super(hearingStore);
  }

  public transformAnswer(): Observable<string> {
    return this.hearingState.pipe(
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
