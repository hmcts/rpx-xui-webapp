import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import * as fromHearingStore from '../store';
import {State} from '../store/reducers';

export abstract class AbstractConverter {
  public hearingState: Observable<State>;

  protected constructor(protected readonly hearingStore: Store<fromHearingStore.State>) {
    this.hearingState = this.hearingStore.pipe(select(fromHearingStore.getHearingsFeatureState));
  }

  public abstract transformAnswer(): Observable<string>;
}
