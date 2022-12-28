import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { LoggerService } from '../../../app/services/logger/logger.service';
import { OrganisationService } from '../../services/organisation.service';
import * as organisationActions from '../actions';

@Injectable()
export class OrganisationEffects {
  @Effect()
  public loadOrganisation$ = this.actions$.pipe(
    ofType(organisationActions.LOAD_ORGANISATION),
    switchMap(() => this.organisationService.fetchOrganisation().pipe(
        map(orgDetails => new organisationActions.LoadOrganisationSuccess(orgDetails)),
        catchError(error => {
          this.loggerService.error(error.message);
          return of(new organisationActions.LoadOrganisationFail(error));
        })
      ))
  );

  public constructor(
    private readonly actions$: Actions,
    private readonly organisationService: OrganisationService,
    private readonly loggerService: LoggerService
  ) { }
}
