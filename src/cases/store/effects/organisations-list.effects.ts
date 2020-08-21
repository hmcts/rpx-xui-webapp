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
            let contactInformation = null;
            if (org.contactInformation &&  org.contactInformation[0]) {
                contactInformation = org.contactInformation[0];
            }

            organisationsVm.push({
                organisationIdentifier: org.organisationIdentifier,
                name: org.name,
                addressLine1: contactInformation !== null ? contactInformation.addressLine1 : null,
                addressLine2: contactInformation !== null ? contactInformation.addressLine2 : null,
                addressLine3: contactInformation !== null ? contactInformation.addressLine3 : null,
                townCity: contactInformation !== null ? contactInformation.townCity : null,
                county: contactInformation !== null ? contactInformation.county : null,
                country: contactInformation !== null ? contactInformation.country : null,
                postCode: contactInformation !== null ? contactInformation.postCode : null,
            });
        });
        return organisationsVm;
      }
}
