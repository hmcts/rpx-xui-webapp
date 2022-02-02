import {Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import * as fromHearingStore from '../store';
import {AbstractConverter} from './abstract.converter';

export class DefaultConverter extends AbstractConverter {
  constructor(protected readonly hearingStore: Store<fromHearingStore.State>) {
    super(hearingStore);
  }

  public transformAnswer(): Observable<string> {
    return of('Not implement yet');
  }
}
