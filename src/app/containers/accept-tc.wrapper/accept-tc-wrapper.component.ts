import { Component, OnDestroy, OnInit } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie';
import { Observable, Subscription } from 'rxjs';
import * as fromApp from '../../../../src/app/store/index';
import * as fromStore from '../../store';
/**
 * Terms And Condition smart component wrapper
 * absorbs Terms and Condition dumb component
 */
@Component({
  selector: 'exui-accept-terms-conditions-wrapper',
  templateUrl: './accept-tc-wrapper.component.html'
})
export class AcceptTcWrapperComponent implements OnInit, OnDestroy {
  public subscription: Subscription;
  constructor(private readonly store: Store<fromApp.State>,
              private readonly cookieService: CookieService,
              private readonly actions$: Actions) {
  }

  public ngOnInit(): void {
    this.subscription = this.getObservable(this.actions$, fromApp.ACCEPT_T_AND_C_SUCCESS).subscribe(() => {
      this.dispatchAction(this.store, new fromStore.Go({ path: ['cases'] }));
    });
  }

  public getObservable(actions$: Actions, action: string): Observable<never> {
    return actions$.pipe(ofType(action));
  }

  public onAcceptTandC() {
    const uid = this.cookieService.get('__userid__');
    this.dispatchAction(this.store, new fromStore.AcceptTandC(uid));
  }

  public ngOnDestroy() {
    this.unsubscribe(this.subscription);
  }

  public unsubscribe(subscription: Subscription) {
    if (subscription) {
      subscription.unsubscribe();
    }
  }
  public dispatchAction(store: Store<fromApp.State>, action: Action) {
    store.dispatch(action);
  }
}
