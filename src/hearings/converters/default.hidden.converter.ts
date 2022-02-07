import {Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import * as fromHearingStore from '../store';
import {AbstractHiddenConverter} from './abstract.hidden.converter';

export class DefaultHiddenConverter extends AbstractHiddenConverter {
  constructor(protected readonly hearingStore: Store<fromHearingStore.State>) {
    super(hearingStore);
  }

  public transformHidden(): Observable<boolean> {
    return of(false);
  }
}
