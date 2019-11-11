import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromStore from '../store';
import * as fromApp from '../../../src/app/store/index';
import { CookieService } from 'ngx-cookie';
import { Observable, of } from 'rxjs';
import { ofType, Actions } from '@ngrx/effects';
/**
 * Terms And Condition smart component wrapper
 * absorbs Terms and Condition dumb component
 */
@Component({
  selector: 'accept-terms-conditions-wrapper',
  templateUrl: './accept-tc-wrapper.component.html'
})
export class AcceptTcWrapperComponent implements OnInit {
  uId: Observable<string>;
  constructor(private store: Store<fromApp.State>,
              private cookieService: CookieService,
              private actions$: Actions) {
  }

  ngOnInit(): void {
    this.uId = of(this.cookieService.get('__userid__'));
    this.actions$.pipe(ofType(fromApp.ACCEPT_T_AND_C_SUCCESS)).subscribe(() => {
      this.store.dispatch(new fromStore.Go({ path: ['cases'] }));
    });
  }

  onAcceptTandC() {
    this.store.dispatch(new fromStore.AcceptTandC(this.uId));
  }
}
