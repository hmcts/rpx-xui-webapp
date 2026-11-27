import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { LoggerService } from '../../../app/services/logger/logger.service';
import * as fromRoot from '../../../app/store';
import { OrganisationService } from '../../services/organisation.service';
import * as organisationActions from '../actions';

// GET /refdata/external/v1/organisations: documented IDAM roles permitted by PRD.
// https://hmcts.github.io/cnp-api-docs/api/rd-professional-api/#/organisation-external-controller/retrieveOrganisationUsingOrgIdentifier_1
const ORGANISATION_LOOKUP_ROLES = [
  'pui-organisation-manager',
  'pui-finance-manager',
  'pui-case-manager',
  'pui-caa',
  'pui-user-manager',
];

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
          filter((details) => details.userInfo.roles?.some((role) => ORGANISATION_LOOKUP_ROLES.includes(role))),
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
