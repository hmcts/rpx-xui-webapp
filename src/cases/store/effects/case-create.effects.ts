import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {map} from 'rxjs/operators';
import { Go, CreateCaseGo, NewCaseLoadedSuccessfully } from '../../../app/store';
import { CREATE_CASE_FILTER_APPLY, CaseCreateFilterApply, CREATE_CASE_APPLY, ApplyChange, CREATE_CASE_RESET, CREATED_CASE_LOADED } from '../actions';
import { AlertService } from '@hmcts/ccd-case-ui-toolkit';
import { LoggerService } from 'src/app/services/logger/logger.service';

@Injectable()
export class CaseCreateEffects {
  constructor(
    private actions$: Actions,
    private alertService: AlertService,
    private loggerService: LoggerService
  ) {}

  @Effect()
  applyChangeCaseCreateFilter$ = this.actions$.pipe(
    ofType(CREATE_CASE_FILTER_APPLY),
    map((action: CaseCreateFilterApply) => action.payload),
    map(param => {
      return new Go({
        path: [`/cases/case-create/${param.jurisdictionId}/${param.caseTypeId}/${param.eventId}`]
      });
    })
  );

  @Effect()
  applyCreateCase$ = this.actions$.pipe(
    ofType(CREATE_CASE_APPLY),
    map((action: ApplyChange) => action.payload),
    map(newCases => {
        return new CreateCaseGo({
          path: [`/cases/case-details/${newCases.caseId}`],
          caseId: newCases.caseId
        });
    })
  );

  @Effect()
  cancel$ = this.actions$.pipe(
    ofType(CREATE_CASE_RESET),
    map(() => {
        return new Go({
          path: [`/cases`]
        });
    })
  );

  @Effect()
  applyCreatedCaseLoaded$ = this.actions$.pipe(
    ofType(CREATED_CASE_LOADED),
    map((payload: any) => {
       this.alertService.success(`Case #${payload.caseId} has been created.`);
       this.loggerService.info('Case created successfully');
       return new NewCaseLoadedSuccessfully();
    }),
  );
}
