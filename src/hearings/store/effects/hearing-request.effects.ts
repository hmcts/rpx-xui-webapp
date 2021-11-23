import {Injectable} from '@angular/core';
import {Actions} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import * as fromAppStoreActions from '../../../app/store/actions';
import {HttpError} from '../../../models/httpError.model';
import {HearingsService} from '../../services/hearings.service';

@Injectable()
export class HearingRequestEffects {

  constructor(
    private readonly actions$: Actions,
    private readonly hearingsService: HearingsService,
  ) {
  }

  public static handleError(error: HttpError): Observable<Action> {
    if (error && error.status && error.status >= 400) {
      return of(new fromAppStoreActions.Go({path: ['/service-down']}));
    }
  }
}
