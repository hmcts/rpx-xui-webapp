import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorMessagesModel, GovUiConfigModel } from '@hmcts/rpx-xui-common-lib/lib/gov-ui/models';
import { Subscription } from 'rxjs';
import { SearchParameters, SearchValidationError } from '../../models';
import { SearchService } from '../../services/search.service';
import { SearchValidators } from '../../utils';
import { DateCategoryType, SearchStatePersistenceKey } from '../../enums';
import { SearchFormControl, SearchFormErrorMessage, SearchFormErrorType } from '../../enums';

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
  public searchParameters: SearchParameters;
  public searchValidationErrors: SearchValidationError[];
  public emailErrorMessage: ErrorMessagesModel;
  public postcodeErrorMessage: ErrorMessagesModel;
  public dateOfBirthErrorMessage: ErrorMessagesModel;
  public dateOfDeathErrorMessage: ErrorMessagesModel;

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
        this.services.push({ label: service.serviceName, value: service.serviceId, id: service.serviceId });
      });
    });
    // Set default service selection to "All"
    this.formGroup.get(SearchFormControl.SERVICES_LIST).setValue(this.services[0].id);

    // Set the form control validators
    this.setValidators();
  }

  /**
   * Assign validation to form controls
   *
   */
  private setValidators(): void {
    // Validator for email
    this.formGroup.get(SearchFormControl.EMAIL).setValidators(Validators.email);

    // Validator for postcode
    const postcodeValidator = SearchValidators.postcodeValidator();
    this.formGroup.get(SearchFormControl.POSTCODE).setValidators(postcodeValidator);

    // validator for date of birth
    const dayValidator = SearchValidators.dayValidator();
    this.formGroup.get(SearchFormControl.DATE_OF_BIRTH_DAY).setValidators(dayValidator);
    const monthValidator = SearchValidators.monthValidator();
    this.formGroup.get(SearchFormControl.DATE_OF_BIRTH_MONTH).setValidators(monthValidator);
    const yearValidator = SearchValidators.yearValidator();
    this.formGroup.get(SearchFormControl.DATE_OF_BIRTH_YEAR).setValidators(yearValidator);

    // validator for date of death
    this.formGroup.get(SearchFormControl.DATE_OF_DEATH_DAY).setValidators(dayValidator);
    this.formGroup.get(SearchFormControl.DATE_OF_DEATH_MONTH).setValidators(monthValidator);
    this.formGroup.get(SearchFormControl.DATE_OF_DEATH_YEAR).setValidators(yearValidator);

    const dateComparisonValidator = SearchValidators.dateComparisonValidator();
    this.formGroup.setValidators(dateComparisonValidator);
  }

  /**
   * Function to validate form controls
   *
   */
  private validateForm(): boolean {
    // Reset validation error messages
    this.resetValidationErrorMessages();

    if (!this.formGroup.valid) {
      // Postcode
      if (!this.formGroup.get(SearchFormControl.POSTCODE).valid) {
        this.searchValidationErrors.push({ controlId: SearchFormControl.POSTCODE, documentHRef: SearchFormControl.POSTCODE, errorMessage: SearchFormErrorMessage.POSTCODE });
        this.postcodeErrorMessage = { isInvalid: true, messages: [SearchFormErrorMessage.POSTCODE] };
      }
      // Email
      if (!this.formGroup.get(SearchFormControl.EMAIL).valid) {
        this.searchValidationErrors.push({ controlId: SearchFormControl.EMAIL, documentHRef: SearchFormControl.EMAIL, errorMessage: SearchFormErrorMessage.EMAIL });
        this.emailErrorMessage = { isInvalid: true, messages: [SearchFormErrorMessage.EMAIL] };
      }
      // Date of birth
      if (!this.formGroup.get(SearchFormControl.DATE_OF_BIRTH_DAY).valid ||
          !this.formGroup.get(SearchFormControl.DATE_OF_BIRTH_MONTH).valid ||
          !this.formGroup.get(SearchFormControl.DATE_OF_BIRTH_YEAR).valid) {
        this.searchValidationErrors.push({ controlId: SearchFormControl.DATE_OF_BIRTH_DAY, documentHRef: 'dateOfBirth', errorMessage: SearchFormErrorMessage.DATE_OF_BIRTH });
        this.dateOfBirthErrorMessage = { isInvalid: true, messages: [SearchFormErrorMessage.DATE_OF_BIRTH] };
      }
      // Date of death
      if (!this.formGroup.get(SearchFormControl.DATE_OF_DEATH_DAY).valid ||
          !this.formGroup.get(SearchFormControl.DATE_OF_DEATH_MONTH).valid ||
          !this.formGroup.get(SearchFormControl.DATE_OF_DEATH_YEAR).valid) {
        this.searchValidationErrors.push({ controlId: SearchFormControl.DATE_OF_DEATH_DAY, documentHRef: 'dateOfDeath', errorMessage: SearchFormErrorMessage.DATE_OF_DEATH });
        this.dateOfDeathErrorMessage = { isInvalid: true, messages: [SearchFormErrorMessage.DATE_OF_DEATH] };
      }
      // Date comparison
      if (this.formGroup.errors) {
        if (this.formGroup.errors.errorType === SearchFormErrorType.DATE_COMPARISON) {
          this.searchValidationErrors.push({ controlId: null, documentHRef: 'dateOfDeath', errorMessage: SearchFormErrorMessage.DATE_COMPARISON_FAILED });
          this.dateOfDeathErrorMessage = { isInvalid: true, messages: [SearchFormErrorMessage.DATE_COMPARISON_FAILED] };
        }
      }

      // Validation failed, return false
      return false;
    }

    // Validation succeeded, return true
    return true;
  }

  /**
   * Function to reset validation error messages
   *
   */
  public resetValidationErrorMessages(): void {
    this.searchValidationErrors = [];
    this.emailErrorMessage =
    this.postcodeErrorMessage =
    this.dateOfBirthErrorMessage =
    this.dateOfDeathErrorMessage = null;
  }

  /**
   * Function to check if any error exists
   *
   */
  public isAnyError(): boolean {
    return Array.isArray(this.searchValidationErrors) && this.searchValidationErrors.length > 0;
  }

  /**
   * Function to handle form submit
   *
   */
  public onSubmit(): void {
    if (!this.validateForm()) {
      // Scroll to error summary
      window.scrollTo({ top: 0, left: 0 });
    } else {
      // Populate a SearchParameters instance with the form inputs and persist via the SearchService
      this.searchParameters = {
        caseReferences: this.formGroup.get('caseRef').value !== '' ? [this.formGroup.get('caseRef').value] : null,
        CCDJurisdictionIds:
          // If the selected value is not "All", use it; else, use the entire Services list (except the "All") item
          this.formGroup.get('servicesList').value !== 'All'
            ? [this.formGroup.get('servicesList').value]
            : this.services.slice(1).map(service => service.id),
        otherReferences: this.formGroup.get('otherRef').value !== '' ? [this.formGroup.get('otherRef').value] : null,
        fullName: this.formGroup.get('fullName').value !== '' ? this.formGroup.get('fullName').value : null,
        address: this.formGroup.get('addressLine1').value !== '' ? this.formGroup.get('addressLine1').value : null,
        postcode: this.formGroup.get('postcode').value !== '' ? this.formGroup.get('postcode').value : null,
        emailAddress: this.formGroup.get('email').value !== '' ? this.formGroup.get('email').value : null,
        // Date format expected by API endpoint is yyyy-mm-dd
        dateOfBirth: this.getDateFormatted(DateCategoryType.DATE_OF_BIRTH),
        dateOfDeath: this.getDateFormatted(DateCategoryType.DATE_OF_DEATH)
      };

      // Store the search parameters to session
      this.searchService.storeState(SearchStatePersistenceKey.SEARCH_PARAMS, this.searchParameters);

      // Set the starting record number to 1
      this.searchService.storeState(SearchStatePersistenceKey.START_RECORD, 1);

      // Navigate to the Search Results page
      this.router.navigate(['results'], {relativeTo: this.route});
    }
  }

  /**
   * Function to return date in a format expected by the backend service
   *
   */
  private getDateFormatted(dateCategoryType: string): string {
    const day = dateCategoryType === DateCategoryType.DATE_OF_BIRTH
      ? this.formGroup.get('dateOfBirth_day').value
      : this.formGroup.get('dateOfDeath_day').value;

    const month = dateCategoryType === DateCategoryType.DATE_OF_BIRTH
      ? this.formGroup.get('dateOfBirth_month').value
      : this.formGroup.get('dateOfDeath_month').value;

    const year = dateCategoryType === DateCategoryType.DATE_OF_BIRTH
      ? this.formGroup.get('dateOfBirth_year').value
      : this.formGroup.get('dateOfDeath_year').value

    if (day === '' || month === '' || year === '') {
      return null;
    }

    // Date format expected by API endpoint is yyyy-mm-dd
    return `${year}-${month}-${day}`;
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
