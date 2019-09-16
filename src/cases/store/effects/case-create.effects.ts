import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {map} from 'rxjs/operators';
import * as fromRoot from '../../../app/store';
import * as fromActions from '../actions';
import { AlertService } from '@hmcts/ccd-case-ui-toolkit';
import { Router } from '@angular/router';

@Injectable()
export class CaseCreateEffects {
  constructor(
    private actions$: Actions,
    private alertService: AlertService,
    private router: Router
  ) {}

  @Effect()
  applyChangeCaseCreateFilter$ = this.actions$.pipe(
    ofType(fromActions.CREATE_CASE_FILTER_APPLY),
    map(payload => {
      return new fromRoot.Go({
        path: ['/cases/case-create']
      });
    })
  );

  @Effect()
  applyCreateCase$ = this.actions$.pipe(
    ofType(fromActions.CREATE_CASE_APPLY),
    map((action: fromActions.ApplyChange) => action.payload),
    map(newCases => {
      this.router.navigate([`/cases/case-details/${newCases.caseId}`])
      .then(() => {
        this.alertService.success(`Case #${newCases.caseId} has been created.`);
        return new fromRoot.Go({
          path: [`/cases/case-details/${newCases.caseId}`]
        });
      });
    })
  );

}


