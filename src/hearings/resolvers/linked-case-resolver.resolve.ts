import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import * as fromHearingStore from '../store';
import * as actions from '../store/actions/hearing-links.action';

@Injectable({
  providedIn: 'root'
})
export class LinkedCaseResolver implements Resolve<any> {
  public serviceId: string = '';

  constructor(
    protected readonly hearingStore: Store<fromHearingStore.State>
  ) { }

  public resolve(route?: ActivatedRouteSnapshot): Observable<any> | any {
    this.hearingStore.dispatch(new actions.LoadServiceLinkedCases({ caseReference: route.params.caseId, hearingId: route.params.hearingId }));
    return this.hearingStore.pipe(
      select(fromHearingStore.getHearingLinks),
      filter(caseList => !!caseList),
      take(2),
    );
  }
}
