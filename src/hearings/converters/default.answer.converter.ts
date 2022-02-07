import {Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import * as fromHearingStore from '../store';
import {AbstractAnswerConverter} from './abstract.answer.converter';

export class DefaultAnswerConverter extends AbstractAnswerConverter {
  constructor(protected readonly hearingStore: Store<fromHearingStore.State>) {
    super(hearingStore);
  }

  public transformAnswer(): Observable<string> {
    return of('Not implement yet');
  }
}
