import { Injectable } from '@angular/core';
import {  RequestMoreInfoSpecificAccessRequest, SpecificAccessActionTypes } from '../actions';
import * as fromFeature from '../../store/actions';
import { REDIRECTS } from '../../models/enums/redirect-urls';
import { RoleAccessHttpError, SpecificAccessState } from '../../models';
import * as routeAction from '../../../app/store/index';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { SpecificAccessState } from '../../models';
import { AllocateRoleService } from '../../services';
import * as fromFeature from '../../store/actions';
import { ApproveSpecificAccessRequest, SpecificAccessActionTypes } from '../actions';
import { AllocateRoleEffects } from './allocate-role.effects';

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
                return AllocateRoleEffects.handleError(error, SpecificAccessActionTypes.APPROVE_SPECIFIC_ACCESS_REQUEST);
              }
            )
          )
      )
    );

  @Effect() public requestMoreInfoSpecificAccessRequest$ = this.actions$
    .pipe(
      ofType<RequestMoreInfoSpecificAccessRequest>(SpecificAccessActionTypes.REQUEST_MORE_INFO_SPECIFIC_ACCESS_REQUEST),
      mergeMap(
        (data) => of({status:201, message:'done'}) //service call will be here
          .pipe(
          map((data) => {
                return new fromFeature.ChangeSpecificAccessNavigation(SpecificAccessState.SPECIFIC_ACCESS_DENIED);
            }),
            catchError(error => {
                return SpecificAccessEffects.handleError(error, SpecificAccessActionTypes.REQUEST_MORE_INFO_SPECIFIC_ACCESS_REQUEST);
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
}
