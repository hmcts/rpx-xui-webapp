import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map, take, tap } from 'rxjs/operators';
import * as fromHearingStore from '../store';
import * as actions from '../store/actions/hearing-actuals.action';

@Injectable({
  providedIn: 'root',
})
export class ActualSummaryResponseResolver {
  constructor(private readonly store: Store<fromHearingStore.State>) {}

  public resolve(route: ActivatedRouteSnapshot) {
    return this.store.pipe(select(fromHearingStore.getHearingValuesCaseInfo), take(1)).pipe(
      tap((caseInfo) =>
        this.store.dispatch(
          new actions.GetHearingActuals({
            id: route.params.id,
            caseRef: caseInfo?.caseReference,
          })
        )
      ),
      map(() => void 0)
    );
  }
}
