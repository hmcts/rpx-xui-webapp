import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as fromHearingStore from '../store';
import {AbstractAnswerConverter} from './abstract.answer.converter';

export class NeedWelshAnswerConverter extends AbstractAnswerConverter {
  constructor(protected readonly hearingStore: Store<fromHearingStore.State>) {
    super(hearingStore);
  }

  public transformAnswer(): Observable<string> {
    return this.hearingState.pipe(
      map(state => state.hearingRequest.hearingRequestMainModel.hearingDetails.hearingInWelshFlag ? 'Yes' : 'No')
    );
  }
}
