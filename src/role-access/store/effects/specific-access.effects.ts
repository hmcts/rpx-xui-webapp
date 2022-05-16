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
import {  RequestMoreInfoSpecificAccessRequest, SpecificAccessActionTypes } from '../actions';

@Injectable()
export class SpecificAccessEffects {

  @Effect() public requestMoreInfoSpecificAccessRequest$ = this.actions$
    .pipe(
      ofType<RequestMoreInfoSpecificAccessRequest>(SpecificAccessActionTypes.REQUEST_MORE_INFO_SPECIFIC_ACCESS_REQUEST),
      mergeMap(
        (data) => of({status:201, message:'done'})//this.allocateRoleService.specificAccessApproval(data.payload)
          .pipe(
          map((data) => {
            console.log(data);
            debugger;
              return new fromFeature.ChangeSpecificAccessNavigation(SpecificAccessState.SPECIFIC_ACCESS_DENIED);
            }),
            catchError(error => {
                return SpecificAccessEffects.handleError(error, SpecificAccessActionTypes.REQUEST_MORE_INFO_SPECIFIC_ACCESS_REQUEST);
              }
            )
          )
      )
    );

  constructor(private readonly actions$: Actions
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
