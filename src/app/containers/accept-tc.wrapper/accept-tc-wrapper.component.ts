import { Component, OnDestroy, OnInit } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie';
import { Observable, Subscription } from 'rxjs';
import { State, ACCEPT_T_AND_C_SUCCESS } from '../../../../src/app/store/index';
import { Go, AcceptTandC } from '../../store';
/**
 * Terms And Condition smart component wrapper
 * absorbs Terms and Condition dumb component
 */
@Component({
  selector: 'exui-accept-terms-conditions-wrapper',
  templateUrl: './accept-tc-wrapper.component.html'
})
export class AcceptTcWrapperComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  constructor(private store: Store<State>,
              private cookieService: CookieService,
              private actions$: Actions) {
  }

  ngOnInit(): void {
    this.subscription = this.getObservable(this.actions$, ACCEPT_T_AND_C_SUCCESS).subscribe(() => {
      this.dispatchAction(this.store, new Go({ path: ['cases'] }));
    });
  }

  getObservable(actions$: Actions, action: string): Observable<never> {
    return actions$.pipe(ofType(action));
  }

  onAcceptTandC() {
    const uid = this.cookieService.get('__userid__');
    this.dispatchAction(this.store, new AcceptTandC(uid));
  }

  ngOnDestroy() {
    this.unsubscribe(this.subscription);
  }

  unsubscribe(subscription: Subscription) {
    if (subscription) {
      subscription.unsubscribe();
    }
  }
  dispatchAction(store: Store<State>, action: Action) {
    store.dispatch(action);
  }
}
