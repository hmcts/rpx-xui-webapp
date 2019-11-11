import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromStore from '../store';
import * as fromApp from '../../../src/app/store/index';
import { CookieService } from 'ngx-cookie';
import { Observable, of } from 'rxjs';
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
  constructor(private store: Store<fromApp.State>, private cookieService: CookieService) {
  }

  ngOnInit(): void {
    this.uId = of(this.cookieService.get('__userid__'));
  }

  onAcceptTandC() {
    this.store.dispatch(new fromStore.AcceptTandC(this.uId));
  }
}
