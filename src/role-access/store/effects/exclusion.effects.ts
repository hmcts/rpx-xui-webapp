import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as routeAction from '../../../app/store/index';
import { InfoMessageType } from '../../../work-allocation-2/enums';
import { ExcludeOption, RoleAccessHttpError } from '../../models';
import { ExclusionMessageText } from '../../models/enums/exclusion-text';
import { RoleExclusionsService } from '../../services';
import { ConfirmExclusionAction, ConfirmExclusionFailureAction, ExclusionActionTypes } from '../actions';


@Injectable()
export class ExclusionEffects {
  private payload: any;

  constructor(
    private actions$: Actions,
    private roleExclusionsService: RoleExclusionsService
  ) {
  }

  @Effect() public confirmExclusion$ = this.actions$
    .pipe(
      ofType<ConfirmExclusionAction>(ExclusionActionTypes.CONFIRM_EXCLUSION),
      mergeMap(
        (data) => this.roleExclusionsService.confirmExclusion(data.payload)
          .pipe(
            map(() => {
              if (data.payload.exclusionOption === ExcludeOption.EXCLUDE_ME) {
                return new routeAction.Go({
                  path: [`/work/my-work/list`],
                  extras: {
                    state: {
                      showMessage: true,
                      message: { type: InfoMessageType.SUCCESS, message: ExclusionMessageText.ExcludeMe }
                    }
                  }
                });
              }
              // exclude another person
              return new routeAction.CreateCaseGo({
                path: [`/cases/case-details/${data.payload.caseId}/roles-and-access`],
                caseId: data.payload.caseId,
                extras: {
                  state: {
                    showMessage: true,
                    messageText: ExclusionMessageText.ExcludeAnother
                  }
                }
              });
            }),
            catchError(error => {
              return ExclusionEffects.handleError(error, ExclusionActionTypes.CONFIRM_EXCLUSION);
            }
            )
          )
      )
    );

  public static handleError(error: RoleAccessHttpError, action: string): Observable<Action> {
    if (error && error.status) {
      if (error.status >= 400 && error.status <= 404) {
        switch (action) {
          case ExclusionActionTypes.CONFIRM_EXCLUSION:
            return of(new ConfirmExclusionFailureAction(error));
          default:
            return of(new routeAction.Go({
              path: ['/service-down']
            }));
        }
      } else {
        return of(new routeAction.Go({
          path: ['/service-down']
        }));
      }
    }
  }
}
