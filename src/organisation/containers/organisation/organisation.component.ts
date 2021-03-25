import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import { DxAddress, OrganisationContactInformation, OrganisationDetails } from '../../organisation.model';
import * as fromStore from '../../store';

@Component({
  selector: 'app-prd-organisation-component',
  templateUrl: './organisation.component.html',
})
export class OrganisationComponent implements OnInit {

  public organisationDetails: Partial<OrganisationDetails>;
  public organisationContactInformation: OrganisationContactInformation;
  public organisationDxAddress: DxAddress;
  public organisationPaymentAccount: string[];

  constructor(private store: Store<fromStore.OrganisationState>) {
  }

  /**
   * Get Contact Information
   *
   * Contact information comes in from PRD as an Array.
   *
   * After speaking to the EXUI BA:
   *
   * Only the first item of contactInformation will be used. It is a (far) future requirement
   * that multiply addresses will need to be considered. When this is a requirement the page will need
   * to be re-UX-designed, for multiple addresses. [2nd September 2020]
   *
   * @param organisationDetails - See unit test.
   */
  public getContactInformation(organisationDetails): OrganisationContactInformation {

    return organisationDetails.contactInformation[0];
  }

  /**
   * Get DX Address
   *
   * Note that we check for the length, as an empty array is returned from PRD. If nothing is available in the dxAddress array,
   * we should not show the 'DX number' label, and an empty value within the view. Therefore we return null from this, and use
   * this within an *ngIf to dynamically show the label.
   *
   * @param contactInformation - See unit test.
   * @return [
   *  {
   *    dxNumber: 'DX 4534234552',
   *    dxExchange: 'London',
   *  }
   * ]
   */
  public getDxAddress(contactInformation: Partial<OrganisationContactInformation>): DxAddress {

    return (!contactInformation.hasOwnProperty('dxAddress') || !contactInformation.dxAddress.length) ?
      null : contactInformation.dxAddress[0];
  }

  /**
   * Get Payment Account
   *
   * Get the PBA numbers for the Organisation.
   *
   * @param organisationDetails - See unit test.
   * @return ['PBA3344542','PBA7843342']
   */
  public getPaymentAccount(organisationDetails: Partial<OrganisationDetails>): string[] {

    return (!organisationDetails.hasOwnProperty('paymentAccount') || !organisationDetails.paymentAccount.length) ?
      null : organisationDetails.paymentAccount;
  }

  /**
   * Get Organisation Details from Store.
   *
   * Once we have the Organisation Details, we display them on the page.
   */
  public getOrganisationDetailsFromStore(): void {

    this.store.pipe(select(fromStore.getOrganisationSel)).subscribe(organisationDetails => {

      this.organisationContactInformation = this.getContactInformation(organisationDetails);
      this.organisationPaymentAccount = this.getPaymentAccount(organisationDetails);
      this.organisationDxAddress = this.getDxAddress(this.organisationContactInformation);

      this.organisationDetails = organisationDetails;
    });
  }

  public getOrganisationDetails() {

    return this.organisationDetails;
  }

  public ngOnInit(): void {

    this.getOrganisationDetailsFromStore();
  }
}
