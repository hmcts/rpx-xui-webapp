import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromHearingStore from '../store';
import { AbstractConverter } from './abstract.converter';

export class NumberOfAttendancesConverter extends AbstractConverter {

  constructor(
    protected readonly hearingStore: Store<fromHearingStore.State>,
    protected readonly route: ActivatedRoute) {
    super(hearingStore);
  }

  public transformAnswer(): Observable<string> {
    return this.hearingState.pipe(
      map(state => {
        return state.hearingValues.serviceHearingValuesModel.numberOfPhysicalAttendees.toString();
      })
    );
  }
}
