import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import * as fromApp from '../store';
import { Store } from '@ngrx/store';
import { GuardUtil } from './guardUtil';

@Injectable({
  providedIn: 'root'
})
export class AllowAcceptTermsGuard implements CanActivate {
  constructor(private store: Store<fromApp.State>,
              private guardUtil: GuardUtil) {
  }

  canActivate(): Observable<boolean> {
    return this.guardUtil.canActivate(this.store, 'cases', 'true');
  }
}
