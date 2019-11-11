import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromStore from '../store';
import * as fromApp from '../../../src/app/store/index';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-accept-terms-and-conditions',
  templateUrl: './accept-tc.component.html'
})
export class AcceptTcComponent implements OnInit {
  userId: string;
  constructor(private store: Store<fromApp.State>, private cookieService: CookieService) {
  }

  ngOnInit(): void {
    this.userId = this.cookieService.get('__userid__');
  }

  onAcceptTandC() {
    this.store.dispatch(new fromStore.AcceptTandC(this.userId));
  }
}
