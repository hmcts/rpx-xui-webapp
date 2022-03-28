import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import * as routeAction from '../../../app/store/index';
import { RoleAccessHttpError } from '../../models';
import { REDIRECTS } from '../../models/enums/redirect-urls';

@Injectable()
export class SpecificAccessEffects {

  constructor(
  ) {
  }

  public static handleError(error: RoleAccessHttpError, action?: string): Observable<Action> {
    if (error && error.status) {
      switch (error.status) {
        case 401:
        case 403:
          return of(new routeAction.Go({
            path: [REDIRECTS.NotAuthorised]
          }));
        case 400:
        case 500:
        case 503:
          return of(new routeAction.Go({
            path: [REDIRECTS.ServiceDown]
          }));
        default:
          return of(new routeAction.Go({
            path: [REDIRECTS.ServiceDown]
          }));
      }
    }
  }
}
