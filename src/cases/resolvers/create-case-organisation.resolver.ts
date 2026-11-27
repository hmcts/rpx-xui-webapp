import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { filter, switchMap, take, timeout } from 'rxjs/operators';
import * as fromRoot from '../../app/store';
import { canLoadOrganisation } from '../../organisation/organisation-permissions';
import { LOAD_ORGANISATION_FAIL, LOAD_ORGANISATION_SUCCESS, LoadOrganisation } from '../../organisation/store/actions';

export const ORGANISATION_RESOLVE_TIMEOUT_MS = 10_000;

@Injectable({ providedIn: 'root' })
export class CreateCaseOrganisationResolver implements Resolve<boolean> {
  constructor(
    private readonly store: Store<fromRoot.State>,
    private readonly actions$: Actions
  ) {}

  public resolve(): Observable<boolean> {
    return this.store.select(fromRoot.getUserDetails).pipe(
      filter((details) => !!details?.userInfo),
      take(1),
      switchMap((details) => {
        if (!canLoadOrganisation(details.userInfo.roles)) {
          return of(true);
        }

        return new Observable<boolean>((subscriber) => {
          // Subscribe before dispatch so even a synchronous completion cannot be missed.
          const completion = this.actions$
            .pipe(ofType(LOAD_ORGANISATION_SUCCESS, LOAD_ORGANISATION_FAIL), take(1))
            .subscribe(() => {
              subscriber.next(true);
              subscriber.complete();
            });
          this.store.dispatch(new LoadOrganisation());
          return () => completion.unsubscribe();
        });
      }),
      // Bound the entire wait, including user details. The effect owns the request,
      // so timing out this resolver does not cancel a pending lookup or its persistence.
      timeout({ first: ORGANISATION_RESOLVE_TIMEOUT_MS, with: () => of(true) })
    );
  }
}
