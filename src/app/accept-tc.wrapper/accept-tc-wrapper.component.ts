import {Component, OnInit, OnDestroy} from '@angular/core';
import {Store, Action} from '@ngrx/store';
import * as fromStore from '../store';
import * as fromApp from '../../../src/app/store/index';
import { CookieService } from 'ngx-cookie';
import { Observable, of, Subscription } from 'rxjs';
import { ofType, Actions } from '@ngrx/effects';
/**
 * Terms And Condition smart component wrapper
 * absorbs Terms and Condition dumb component
 */
@Component({
  selector: 'exui-accept-terms-conditions-wrapper',
  templateUrl: './accept-tc-wrapper.component.html'
})
export class AcceptTcWrapperComponent implements OnInit, OnDestroy {
  uId: Observable<string>;
  subscription: Subscription;
  constructor(private store: Store<fromApp.State>,
              private cookieService: CookieService,
              private actions$: Actions) {
  }

  ngOnInit(): void {
    this.uId = this.getCookieValueForKey('__userid__', this.cookieService);
    this.subscription = this.getObservable(this.actions$, fromApp.ACCEPT_T_AND_C_SUCCESS).subscribe(() => {
      this.dispatchAction(this.store, new fromStore.Go({ path: ['cases'] }));
    });
  }

  getObservable(actions$: Actions, action: string): Observable<never> {
    return actions$.pipe(ofType(action));
  }

  getCookieValueForKey(key: string, cookieService: CookieService): Observable<string> {
    return of(cookieService.get(key));
  }

  onAcceptTandC() {
    this.dispatchAction(this.store, new fromStore.AcceptTandC(this.uId));
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
