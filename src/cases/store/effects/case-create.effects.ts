import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import { AlertService } from '@hmcts/ccd-case-ui-toolkit';
import {map} from 'rxjs/operators';
import {LoggerService} from '../../../app/services/logger/logger.service';
import * as fromRoot from '../../../app/store';
import * as fromActions from '../actions';


@Injectable()
export class CaseCreateEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly alertService: AlertService,
    private readonly loggerService: LoggerService
  ) {}

  @Effect()
  public applyChangeCaseCreateFilter$ = this.actions$.pipe(
    ofType(fromActions.CREATE_CASE_FILTER_APPLY),
    map((action: fromActions.CaseCreateFilterApply) => action.payload),
    map(param => {
      return new fromRoot.Go({
        path: [`/cases/case-create/${param.jurisdictionId}/${param.caseTypeId}/${param.eventId}`]
      });
    })
  );

  @Effect()
  public applyCreateCase$ = this.actions$.pipe(
    ofType(fromActions.CREATE_CASE_APPLY),
    map((action: fromActions.ApplyChange) => action.payload),
    map(newCases => {
        return new fromRoot.CreateCaseGo({
          path: [`/cases/case-details/${newCases.caseId}`],
          caseId: newCases.caseId
        });
    })
  );

  @Effect()
  public cancel$ = this.actions$.pipe(
    ofType(fromActions.CREATE_CASE_RESET),
    map(() => {
        return new fromRoot.Go({
          path: [`/cases`]
        });
    })
  );

  @Effect()
  public applyCreatedCaseLoaded$ = this.actions$.pipe(
    ofType(fromActions.CREATED_CASE_LOADED),
    map((payload: any) => {
       this.alertService.success(`Case #${payload.caseId} has been created.`);
       this.loggerService.info('Case created successfully');
       return new fromRoot.NewCaseLoadedSuccessfully();
    }),
  );
}
