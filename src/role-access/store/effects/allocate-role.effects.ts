import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as routeAction from '../../../app/store/index';
import { Actions as RoleActions, Role, RoleAccessHttpError } from '../../models';
import { RoleAllocationMessageText } from '../../models/enums/allocation-text';
import { REDIRECTS } from '../../models/enums/redirect-urls';
import { AllocateRoleService } from '../../services/allocate-role.service';
import { AllocateRoleActionTypes, ConfirmAllocation, LoadRolesComplete, NoRolesFound } from '../actions';
import * as fromRoot from '../../../app/store';

@Injectable()
export class AllocateRoleEffects {
  public getRoles$ = createEffect(() =>
    this.actions$.pipe(
      ofType<ConfirmAllocation>(AllocateRoleActionTypes.LOAD_ROLES),
      mergeMap((data) =>
        this.allocateRoleService.getValidRoles([data.payload.jurisdiction]).pipe(
          map((roles) => {
            const jurisdictionRoles = getRolesForRoleCategory(roles, data.payload.roleCategory);
            return jurisdictionRoles && jurisdictionRoles.length > 0
              ? new LoadRolesComplete({ roles: jurisdictionRoles })
              : new NoRolesFound();
          })
        )
      )
    )
  );

  public confirmAllocation$ = createEffect(() =>
    this.actions$.pipe(
      ofType<ConfirmAllocation>(AllocateRoleActionTypes.CONFIRM_ALLOCATION),
      mergeMap((data) =>
        this.allocateRoleService.confirmAllocation(data.payload).pipe(
          map(() => {
            const [backUrl, fragment] = this.allocateRoleService.backUrl.split('#');
            let decodedFragment = fragment;
            try {
              if (fragment) {
                decodedFragment = decodeURIComponent(fragment);
              }
            } catch {
              decodedFragment = fragment;
            }
            const message: any = {
              type: 'success',
              message:
                data.payload.action === RoleActions.Allocate
                  ? RoleAllocationMessageText.Add
                  : RoleAllocationMessageText.Reallocate,
            };
            this.store.dispatch(new fromRoot.LoadUserDetails(true));
            return new routeAction.CreateCaseGo({
              path: [backUrl],
              caseId: data.payload.caseId,
              extras: {
                ...(fragment && { fragment: decodedFragment }),
                state: {
                  showMessage: true,
                  retainMessages: true,
                  message,
                  messageText:
                    data.payload.action === RoleActions.Allocate
                      ? RoleAllocationMessageText.Add
                      : RoleAllocationMessageText.Reallocate,
                },
              },
            });
          }),
          catchError((error) => {
            return AllocateRoleEffects.handleError(error);
          })
        )
      )
    )
  );

  private readonly payload: any;

  constructor(
    private readonly actions$: Actions,
    private readonly allocateRoleService: AllocateRoleService,
    private readonly store: Store<fromRoot.State>
  ) {}

  public static handleError(error: RoleAccessHttpError): Observable<Action> {
    if (error && error.status) {
      switch (error.status) {
        case 401:
        case 403:
          return of(
            new routeAction.Go({
              path: [REDIRECTS.NotAuthorised],
            })
          );
        case 422:
          return of(
            new routeAction.Go({
              path: [REDIRECTS.UserNotAssignable],
            })
          );
        case 400:
        case 500:
        case 503:
          return of(
            new routeAction.Go({
              path: [REDIRECTS.ServiceDown],
            })
          );
        default:
          return of(
            new routeAction.Go({
              path: [REDIRECTS.ServiceDown],
            })
          );
      }
    }
  }
}
export function getRolesForRoleCategory(roles: Role[], roleCategory: string): Role[] {
  return roles.filter((role) => role.roleCategory === roleCategory);
}
