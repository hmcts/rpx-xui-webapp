import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorMessagesModel, GovUiConfigModel } from '@hmcts/rpx-xui-common-lib/lib/gov-ui/models';
import { Subscription } from 'rxjs';
import { SearchValidationError } from '../../models';
import { SearchValidators } from '../../utils';
import { SearchService } from '../../services/search.service';
import { Router } from '@angular/router';
import { isDefined } from '@angular/compiler/src/util';

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
  public searchServiceSubscription: Subscription;
  public searchValidationErrors: SearchValidationError[];
  public emailErrorMessage: ErrorMessagesModel;
  public postcodeErrorMessage: ErrorMessagesModel;

  constructor(private readonly fb: FormBuilder,
              private readonly router: Router,
              private readonly searchService: SearchService) {

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

    this.searchServiceSubscription = this.searchService.getServices().subscribe(services => {
      services.forEach(service => {
        this.services.push({ label: service.serviceName, value: service.serviceName, id: service.serviceId });
      });
    });

    // Set default service selection to "All"
    this.formGroup.get('servicesList').setValue(this.services[0].id);

    // Set the form control validators
    this.setValidators();
  }

  setValidators(): void {
    // Validator for email
    this.formGroup.get('email').setValidators(Validators.email);

    // Validator for postcode
    const postcodeValidator = SearchValidators.postcodeValidator();
    this.formGroup.get('postcode').setValidators(postcodeValidator);
  }

  validateForm(): boolean {
    this.searchValidationErrors = [];
    this.emailErrorMessage = null;
    this.postcodeErrorMessage = null;
    if (!this.formGroup.valid) {
      if (!this.formGroup.get('email').valid) {
        this.searchValidationErrors.push({ controlId: 'email', documentHRef: 'email', errorMessage: 'Enter a valid email' });
        this.emailErrorMessage = { isInvalid: true, messages: ['Enter a valid email'] };
      }
      if (!this.formGroup.get('postcode').valid) {
        this.searchValidationErrors.push({ controlId: 'postcode', documentHRef: 'postcode', errorMessage: 'Enter a valid postcode' });
        this.postcodeErrorMessage = { isInvalid: true, messages: ['Enter a valid postcode'] };
      }

      return false;
    }

    return true;
  }

  isAnyError(): boolean {
    return isDefined(this.searchValidationErrors) && this.searchValidationErrors.length > 0;
  }

  public onSubmit(): void {
    if (this.validateForm()) {
      // TODO: Send data to store

      // Navigate to results page
      // this.router.navigateByUrl('/search/results');
    }
  }

  public ngOnDestroy(): void {
    this.searchServiceSubscription.unsubscribe();
  }
}

export interface SearchFormServiceListItem {
  label: string,
  value: string,
  id: string
}
