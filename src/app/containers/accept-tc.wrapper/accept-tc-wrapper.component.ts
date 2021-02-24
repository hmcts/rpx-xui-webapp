import { Component, OnDestroy, OnInit } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
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
  subscription: Subscription;
  constructor(private store: Store<fromApp.State>,
              private actions$: Actions) {
  }

  ngOnInit(): void {
    this.subscription = this.getObservable(this.actions$, fromApp.ACCEPT_T_AND_C_SUCCESS).subscribe(() => {
      this.dispatchAction(this.store, new fromStore.Go({ path: ['cases'] }));
    });
  }

  getObservable(actions$: Actions, action: string): Observable<never> {
    return actions$.pipe(ofType(action));
  }

  onAcceptTandC() {
  }

  ngOnDestroy() {
    this.unsubscribe(this.subscription);
  }

  unsubscribe(subscription: Subscription) {
    if (subscription) {
      subscription.unsubscribe();
    }
  }
  dispatchAction(store: Store<fromApp.State>, action: Action) {
    store.dispatch(action);
  }
}
