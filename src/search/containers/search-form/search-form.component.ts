import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GovUiConfigModel } from '@hmcts/rpx-xui-common-lib/lib/gov-ui/models';
import { Subscription } from 'rxjs';
import { SearchParameters } from '../../models';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'exui-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit, OnDestroy {

  public formGroup: FormGroup;
  public caseRefConfig: GovUiConfigModel;
  public otherRefConfig: GovUiConfigModel;
  public fullNameConfig: GovUiConfigModel;
  public addressLine1Config: GovUiConfigModel;
  public postcodeConfig: GovUiConfigModel;
  public emailConfig: GovUiConfigModel;
  public dateOfBirthConfig: GovUiConfigModel;
  public dateOfDeathConfig: GovUiConfigModel;
  public servicesConfig: GovUiConfigModel;
  public services: SearchFormServiceListItem[];
  public searchServiceSubscription$: Subscription;

  constructor(private readonly fb: FormBuilder,
              private readonly searchService: SearchService,
              private readonly router: Router,
              private readonly route: ActivatedRoute) {

    this.caseRefConfig = {
      id: 'caseRef',
      name: 'caseRef',
      classes: 'govuk-input--width-10',
      label: '16-digit case reference',
      type: 'text'
    };
    this.otherRefConfig = {
      id: 'otherRef',
      name: 'otherRef',
      hint: 'Any other reference to identify a case, for example National Insurance number or system reference.',
      classes: 'govuk-input--width-10',
      label: 'Other reference',
      type: 'text'
    };
    this.fullNameConfig = {
      id: 'fullName',
      name: 'fullName',
      hint: 'For example, name of a party or solicitor.',
      classes: 'govuk-input--width-20',
      label: 'Full name',
      type: 'text'
    };
    this.addressLine1Config = {
      id: 'addressLine1',
      name: 'addressLine1',
      classes: 'govuk-input--width-20',
      label: 'First line of address',
      type: 'text'
    };
    this.postcodeConfig = {
      id: 'postcode',
      name: 'postcode',
      label: 'Postcode',
      type: 'text'
    };
    this.emailConfig = {
      id: 'email',
      name: 'email',
      classes: 'govuk-input--width-20',
      label: 'Email address',
      type: 'email'
    };
    this.dateOfBirthConfig = {
      id: 'dateOfBirth',
      name: 'dateOfBirth',
      hint: '',
      label: 'Date of birth'
    };
    this.dateOfDeathConfig = {
      id: 'dateOfDeath',
      name: 'dateOfDeath',
      hint: '',
      label: 'Date of death'
    };
    this.servicesConfig = {
      id: 'servicesList',
      name: 'servicesList',
      classes: 'govuk-label--m',
      label: 'Services'
    };
    this.services = [
      {label: 'All', value: 'All', id: 'All'}
    ];
  }

  public ngOnInit(): void {
    this.formGroup = this.fb.group({
      caseRef: '',
      otherRef: '',
      fullName: '',
      addressLine1: '',
      postcode: '',
      email: '',
      dateOfBirth_day: '',
      dateOfBirth_month: '',
      dateOfBirth_year: '',
      dateOfDeath_day: '',
      dateOfDeath_month: '',
      dateOfDeath_year: '',
      servicesList: ''
    });

    this.searchServiceSubscription$ = this.searchService.getServices().subscribe(services => {
      services.forEach(service => {
        this.services.push({ label: service.serviceName, value: service.serviceName, id: service.serviceId });
      });
    });
    // Set default service selection to "All"
    this.formGroup.get('servicesList').setValue(this.services[0].id);
  }

  public onSubmit(): void {
    // Populate a SearchParameters instance with the form inputs and persist via the SearchService
    const searchParameters: SearchParameters = {
      caseReferences: [this.formGroup.get('caseRef').value],
      CCDJurisdictionIds:
      // If the selected value is not "All", use it; else, use the entire Services list (except the "All") item
      this.formGroup.get('servicesList').value !== 'All'
        ? [this.formGroup.get('servicesList').value]
        : this.services.slice(1).map(service => service.id),
      otherReference: this.formGroup.get('otherRef').value,
      fullName: this.formGroup.get('fullName').value,
      address: this.formGroup.get('addressLine1').value,
      postcode: this.formGroup.get('postcode').value,
      emailAddress: this.formGroup.get('email').value,
      // Date format expected by API endpoint is yyyy-mm-dd
      dateOfBirth: `${this.formGroup.get('dateOfBirth_year').value}-${this.formGroup.get('dateOfBirth_month').value}-` +
      `${this.formGroup.get('dateOfBirth_day').value}`,
      dateOfDeath: `${this.formGroup.get('dateOfDeath_year').value}-${this.formGroup.get('dateOfDeath_month').value}-` +
      `${this.formGroup.get('dateOfDeath_day').value}`
    };

    this.searchService.storeState('searchParameters', searchParameters);

    // Set the starting record number to 1
    this.searchService.storeState('startRecordNumber', 1);

    // Navigate to the Search Results page
    this.router.navigate(['results'], {relativeTo: this.route});
  }

  public ngOnDestroy(): void {
    if (this.searchServiceSubscription$) {
      this.searchServiceSubscription$.unsubscribe();
    }
  }
}

export interface SearchFormServiceListItem {
  label: string;
  value: string;
  id: string;
}
