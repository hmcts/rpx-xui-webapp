import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as routeAction from '../../../app/store/index';
import { Actions as RoleActions, RoleAccessHttpError } from '../../models';
import { RoleAllocationMessageText } from '../../models/enums/allocation-text';
import { REDIRECTS } from '../../models/enums/redirect-urls';
import { AllocateRoleService } from '../../services/allocate-role.service';
import { AllocateRoleActionTypes, ConfirmAllocation } from '../actions';

@Injectable()
export class AllocateRoleEffects {
  @Effect() public confirmAllocation$ = this.actions$
    .pipe(
      ofType<ConfirmAllocation>(AllocateRoleActionTypes.CONFIRM_ALLOCATION),
      mergeMap(
        (data) => this.allocateRoleService.confirmAllocation(data.payload)
          .pipe(
            map(() => {
              const message: any = {
                type: 'success',
                message: data.payload.action === RoleActions.Allocate ? RoleAllocationMessageText.Add : RoleAllocationMessageText.Reallocate
              };
              return new routeAction.CreateCaseGo({
                path: [this.allocateRoleService.backUrl],
                caseId: data.payload.caseId,
                extras: {
                  state: {
                    showMessage: true,
                    retainMessages: true,
                    message,
                    messageText: data.payload.action === RoleActions.Allocate ? RoleAllocationMessageText.Add : RoleAllocationMessageText.Reallocate,
                  }
                }
              });
            }),
            catchError(error => {
                return AllocateRoleEffects.handleError(error, AllocateRoleActionTypes.CONFIRM_ALLOCATION);
              }
            )
          )
      )
    );
  private payload: any;

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
