import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { LoggerService } from '../../../app/services/logger/logger.service';
import { OrganisationService } from '../../services/organisation.service';
import * as organisationActions from '../actions';

@Injectable()
export class OrganisationEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly organisationService: OrganisationService,
    private readonly loggerService: LoggerService
  ) {}

  public loadOrganisation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(organisationActions.LOAD_ORGANISATION),
      switchMap(() => {
        return this.organisationService.fetchOrganisation().pipe(
          // The toolkit reads this value when opening an organisation field, even after Case List is destroyed.
          tap((orgDetails) => {
            if (orgDetails?.organisationIdentifier) {
              sessionStorage.setItem('organisationDetails', JSON.stringify(orgDetails));
            }
          }),
          map((orgDetails) => new organisationActions.LoadOrganisationSuccess(orgDetails)),
          catchError((error) => {
            this.loggerService.error(error.message);
            return of(new organisationActions.LoadOrganisationFail(error));
          })
        );
      })
    )
  );
}
