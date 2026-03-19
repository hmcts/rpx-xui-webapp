import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromHearingStore from '../store';
import * as actions from '../store/actions/hearing-actuals.action';
import { SessionStorageService } from 'src/app/services/session-storage/session-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ActualSummaryResponseResolver {
  constructor(
    private readonly store: Store<fromHearingStore.State>,
    private readonly sessionStore: SessionStorageService
  ) {}

  public resolve(route: ActivatedRouteSnapshot): void {
    const caseIdFromSession = JSON.parse(this.sessionStore.getItem('caseInfo'))?.caseId;
    return this.store.dispatch(new actions.GetHearingActuals({ id: route.params.id, caseRef: caseIdFromSession }));
  }
}
