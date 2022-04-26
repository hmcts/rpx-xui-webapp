import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';

import * as routeAction from '../../../app/store/index';
import { RoleAccessHttpError, SpecificAccessState } from '../../models';
import { REDIRECTS } from '../../models/enums/redirect-urls';
import { AllocateRoleService } from '../../services';
import * as fromFeature from '../../store/actions';
import { ApproveSpecificAccessRequest, SpecificAccessActionTypes } from '../actions';

@Injectable()
export class SpecificAccessEffects {
  @Effect() public approveSpecificAccessRequest$ = this.actions$
    .pipe(
      ofType<ApproveSpecificAccessRequest>(SpecificAccessActionTypes.APPROVE_SPECIFIC_ACCESS_REQUEST),
      mergeMap(
        (data) => this.allocateRoleService.specificAccessApproval(data.payload)
          .pipe(
          map(() => {
              return new fromFeature.ChangeSpecificAccessNavigation(SpecificAccessState.SPECIFIC_ACCESS_APPROVED);
            }),
            catchError(error => {
                return SpecificAccessEffects.handleError(error, SpecificAccessActionTypes.APPROVE_SPECIFIC_ACCESS_REQUEST);
              }
            )
          )
      )
    );

  constructor(
    private actions$: Actions,
    private allocateRoleService: AllocateRoleService
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
        case 422:
          return of(new routeAction.Go({
            path: [REDIRECTS.UserNotAssignable]
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
