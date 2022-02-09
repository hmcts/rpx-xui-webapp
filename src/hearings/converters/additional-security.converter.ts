import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as fromHearingStore from '../store';
import {AbstractConverter} from './abstract.converter';

export class AdditionalSecurityConverter extends AbstractConverter {
  constructor(protected readonly hearingStore: Store<fromHearingStore.State>) {
    super(hearingStore);
  }

  public transformAnswer(): Observable<string> {
    return this.hearingState.pipe(
      map(state => {
        const result = state.hearingRequest.hearingRequestMainModel.caseDetails.caseAdditionalSecurityFlag ?
          'Yes' : 'No';

        return result;
      })
    );
  }
}
