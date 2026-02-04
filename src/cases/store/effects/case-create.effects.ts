import { Inject, Injectable } from '@angular/core';
import { AlertService } from '@hmcts/ccd-case-ui-toolkit';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { LoggerService } from '../../../app/services/logger/logger.service';
import { SessionStorageService } from '../../../app/services';
import { EnvironmentService } from '../../../app/shared/services/environment.service';
import { UserInfo } from '../../../app/models';
import * as fromRoot from '../../../app/store';
import * as fromActions from '../actions';
import { buildDecentralisedEventUrl, getExpectedSub } from '../../utils/decentralised-event-redirect.util';
import { EMPTY, of } from 'rxjs';

@Injectable()
export class CaseCreateEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly alertService: AlertService,
    private readonly loggerService: LoggerService,
    private readonly environmentService: EnvironmentService,
    private readonly sessionStorageService: SessionStorageService,
    @Inject(Window) private readonly window: Window
  ) {}

  public applyChangeCaseCreateFilter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.CREATE_CASE_FILTER_APPLY),
      map((action: fromActions.CaseCreateFilterApply) => action.payload),
      mergeMap((param) => {
        const redirectUrl = buildDecentralisedEventUrl({
          baseUrls: this.environmentService.get('decentralisedEventBaseUrls'),
          caseType: param.caseTypeId,
          jurisdiction: param.jurisdictionId,
          eventId: param.eventId,
          expectedSub: getExpectedSub(this.getUserInfoFromSession()),
          isCaseCreate: true,
        });

        if (redirectUrl) {
          this.window.location.assign(redirectUrl);
          return EMPTY;
        }

        return of(
          new fromRoot.Go({
            path: [`/cases/case-create/${param.jurisdictionId}/${param.caseTypeId}/${param.eventId}`],
          })
        );
      })
    )
  );

  private getUserInfoFromSession(): UserInfo | null {
    const userInfoStr = this.sessionStorageService.getItem('userDetails');
    if (userInfoStr) {
      return JSON.parse(userInfoStr);
    }
    return null;
  }

  public applyCreateCase$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.CREATE_CASE_APPLY),
      map((action: fromActions.ApplyChange) => action.payload),
      map((newCases) => {
        return new fromRoot.CreateCaseGo({
          path: [`/cases/case-details/${newCases.jurisdiction}/${newCases.caseType}/${newCases.caseId}`],
          caseId: newCases.caseId,
        });
      })
    )
  );

  public cancel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.CREATE_CASE_RESET),
      map(() => {
        return new fromRoot.Go({
          path: ['/cases'],
        });
      })
    )
  );

  public applyCreatedCaseLoaded$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.CREATED_CASE_LOADED),
      map((payload: any) => {
        const replacements = { CASEID: payload.caseId };
        this.alertService.success({ phrase: 'Case #%CASEID% has been created.', replacements, preserve: true });
        this.loggerService.info('Case created successfully');
        return new fromRoot.NewCaseLoadedSuccessfully();
      })
    )
  );
}
