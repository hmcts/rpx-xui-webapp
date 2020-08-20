import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { OrganisationsService } from '../../../../src/app/services/organisations/organisationsService';
import * as organisationActions from '../actions/organisations-list.action';
import { Organisation, OrganisationVm } from '../reducers';

@Injectable()
export class OrganisationListEffects {

    constructor(private readonly actions$: Actions,
                private readonly organisationService: OrganisationsService) {}
    @Effect()
    public addShareCases$ = this.actions$.pipe(
        ofType(organisationActions.LOAD_ALL_ORGANISATIONS),
        switchMap(() => {
            return this.organisationService.getActiveOrganisations().pipe(
                map( (organisations) => {
                    const organisationsVm: OrganisationVm [] = OrganisationListEffects.mapOrganisation(organisations);
                    return new organisationActions.LoadAllOrganisationsSuccess(organisationsVm);
                })
            );
        })
      );

      public static mapOrganisation(organisations: Organisation[]): OrganisationVm [] {
        const organisationsVm = new Array<OrganisationVm>();
        organisations.forEach(org => {
            organisationsVm.push({
                organisationIdentifier: org.organisationIdentifier,
                name: org.name,
                addressLine1: org.contactInformation[0] !== null ? org.contactInformation[0].addressLine1 : null,
                addressLine2: org.contactInformation[0] !== null ? org.contactInformation[0].addressLine2 : null,
                addressLine3: org.contactInformation[0] !== null ? org.contactInformation[0].addressLine3 : null,
                townCity: org.contactInformation[0] !== null ? org.contactInformation[0].townCity : null,
                county: org.contactInformation[0] !== null ? org.contactInformation[0].county : null,
                country: org.contactInformation[0] !== null ? org.contactInformation[0].country : null,
                postCode: org.contactInformation[0] !== null ? org.contactInformation[0].postCode : null,
            });
        });
        return organisationsVm;
      }
}
