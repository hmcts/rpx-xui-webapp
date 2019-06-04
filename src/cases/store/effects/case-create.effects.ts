import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {map} from 'rxjs/operators';
import * as fromRoot from '../../../app/store';
import * as fromActions from '../actions';
import {CREATE_CASE_FILTER_APPLY} from '../actions';

@Injectable()
export class CaseCreateEffects {
  constructor(
    private actions$: Actions,
  ) {}

  @Effect()
  applyChangeCaseCreate$ = this.actions$.pipe(
    ofType(fromActions.CREATE_CASE_FILTER_APPLY),
    map(payload => {
      return new fromRoot.Go({
        path: ['/cases/case-create']
      });
    })
  );

}


