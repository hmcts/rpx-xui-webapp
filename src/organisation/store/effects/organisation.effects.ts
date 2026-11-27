import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { LoggerService } from '../../../app/services/logger/logger.service';
import * as fromRoot from '../../../app/store';
import { canLoadOrganisation } from '../../organisation-permissions';
import { OrganisationService } from '../../services/organisation.service';
import * as organisationActions from '../actions';

@Injectable()
export class OrganisationEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly organisationService: OrganisationService,
    private readonly loggerService: LoggerService,
    private readonly store: Store<fromRoot.State>
  ) {}

  public loadOrganisation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(organisationActions.LOAD_ORGANISATION),
      switchMap(() =>
        this.store.select(fromRoot.getUserDetails).pipe(
          // Keep waiting independently of the component that requested the lookup.
          filter((details) => !!details?.userInfo),
          take(1),
          filter((details) => canLoadOrganisation(details.userInfo.roles)),
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
      )
    )
  );
}
