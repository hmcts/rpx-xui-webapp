import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorMessagesModel, GovUiConfigModel } from '@hmcts/rpx-xui-common-lib';
import { DateCategoryType, SearchFormControl, SearchFormErrorMessage, SearchFormErrorType, SearchStatePersistenceKey } from '../../enums';
import { SearchParameters, SearchValidationError } from '../../models';
import { SearchService } from '../../services/search.service';
import { SearchValidators } from '../../utils';

@Component({
  standalone: false,
  selector: 'exui-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']

})
export class SearchFormComponent implements OnInit {
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
  public searchValidationErrors: SearchValidationError[];
  public caseRefErrorMessage: ErrorMessagesModel;
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
      // Label change to just 'Name' requested under EUI-5303
      label: 'Name',
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
      { label: 'All', value: 'ALL', id: 'ALL' }
    ];
  }

  public ngOnInit(): void {
    this.formGroup = this.fb.group({
      [SearchFormControl.CASE_REF]: ['', SearchValidators.caseReferenceWithWildcardsValidator()],
      [SearchFormControl.OTHER_REF]: '',
      [SearchFormControl.FULL_NAME]: '',
      [SearchFormControl.ADDRESS_LINE_1]: '',
      [SearchFormControl.POSTCODE]: ['', SearchValidators.postcodeValidator()],
      [SearchFormControl.EMAIL]: ['', Validators.email],
      [SearchFormControl.DATE_OF_BIRTH_DAY]: '',
      [SearchFormControl.DATE_OF_BIRTH_MONTH]: '',
      [SearchFormControl.DATE_OF_BIRTH_YEAR]: '',
      [SearchFormControl.DATE_OF_DEATH_DAY]: '',
      [SearchFormControl.DATE_OF_DEATH_MONTH]: '',
      [SearchFormControl.DATE_OF_DEATH_YEAR]: '',
      [SearchFormControl.SERVICES_LIST]: ''
    }, {
      validators: [SearchValidators.dateComparisonValidator(), SearchValidators.searchFormValidator()]
    });

    this.searchService.getServices().subscribe((services) => {
      services.forEach((service) => {
        this.services.push({ label: service.serviceName, value: service.serviceId, id: service.serviceId });
      });
    });

    // Set default service selection to "All"
    this.formGroup.get(SearchFormControl.SERVICES_LIST).setValue(this.services[0].id);

    // Pre-populate the form with existing search parameters
    const searchParameters: SearchParameters = this.searchService.retrieveState(SearchStatePersistenceKey.SEARCH_PARAMS);
    if (searchParameters) {
      // Note: Intentional use of != throughout this if block, to check for search parameter values being not null and not undefined
      /* eslint-disable eqeqeq */
      const caseReferences = searchParameters.caseReferences;
      if (caseReferences != null) {
        this.formGroup.get(SearchFormControl.CASE_REF).setValue(caseReferences[0] || '');
      }
      const otherReferences = searchParameters.otherReferences;
      if (otherReferences != null) {
        this.formGroup.get(SearchFormControl.OTHER_REF).setValue(otherReferences[0] || '');
      }
      this.formGroup.get(SearchFormControl.FULL_NAME).setValue(searchParameters.fullName || '');
      this.formGroup.get(SearchFormControl.ADDRESS_LINE_1).setValue(searchParameters.address || '');
      this.formGroup.get(SearchFormControl.POSTCODE).setValue(searchParameters.postcode || '');
      this.formGroup.get(SearchFormControl.EMAIL).setValue(searchParameters.emailAddress || '');
      const dateOfBirth = searchParameters.dateOfBirth;
      if (dateOfBirth != null) {
        // Date is stored in format yyyy-mm-dd
        this.formGroup.get(SearchFormControl.DATE_OF_BIRTH_DAY).setValue(dateOfBirth.split('-')[2]);
        this.formGroup.get(SearchFormControl.DATE_OF_BIRTH_MONTH).setValue(dateOfBirth.split('-')[1]);
        this.formGroup.get(SearchFormControl.DATE_OF_BIRTH_YEAR).setValue(dateOfBirth.split('-')[0]);
      }
      const dateOfDeath = searchParameters.dateOfDeath;
      if (dateOfDeath != null) {
        // Date is stored in format yyyy-mm-dd
        this.formGroup.get(SearchFormControl.DATE_OF_DEATH_DAY).setValue(dateOfDeath.split('-')[2]);
        this.formGroup.get(SearchFormControl.DATE_OF_DEATH_MONTH).setValue(dateOfDeath.split('-')[1]);
        this.formGroup.get(SearchFormControl.DATE_OF_DEATH_YEAR).setValue(dateOfDeath.split('-')[0]);
      }
      const serviceSelection = searchParameters.CCDJurisdictionIds;
      // Set service selection if there is exactly one service present. The value defaults to "All" if no service is present, or if
      // more than one service is present (in this case, it is "All" because the user can choose either a single service or "All" only)
      if (serviceSelection != null && serviceSelection.length === 1) {
        this.formGroup.get(SearchFormControl.SERVICES_LIST).setValue(serviceSelection[0]);
      }
      /* eslint-enable eqeqeq */
    }
  }

  /**
   * Function to validate form controls
   *
   */
  private validateForm(): boolean {
    // Reset validation error messages
    this.resetValidationErrorMessages();
    // Re-evaluate date fields validity
    this.formGroup.get(SearchFormControl.DATE_OF_BIRTH_DAY).updateValueAndValidity();
    this.formGroup.get(SearchFormControl.DATE_OF_DEATH_DAY).updateValueAndValidity();

    if (!this.formGroup.valid) {
      // Case reference
      if (!this.formGroup.get(SearchFormControl.CASE_REF).valid) {
        this.searchValidationErrors.push({ controlId: SearchFormControl.CASE_REF, documentHRef: SearchFormControl.CASE_REF, errorMessage: SearchFormErrorMessage.CASE_REF });
        this.caseRefErrorMessage = { isInvalid: true, messages: [SearchFormErrorMessage.CASE_REF] };
      }
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
      // In the latest version of the XUI Common Library Date component, the validator is attached to the day field but covers the month and year, too
      if (!this.formGroup.get(SearchFormControl.DATE_OF_BIRTH_DAY).valid) {
        this.searchValidationErrors.push({ controlId: SearchFormControl.DATE_OF_BIRTH_DAY, documentHRef: 'dateOfBirth', errorMessage: SearchFormErrorMessage.DATE_OF_BIRTH });
        this.dateOfBirthErrorMessage = { isInvalid: true, messages: [SearchFormErrorMessage.DATE_OF_BIRTH] };
      }
      // Date of death
      // As above for date of birth
      if (!this.formGroup.get(SearchFormControl.DATE_OF_DEATH_DAY).valid) {
        this.searchValidationErrors.push({ controlId: SearchFormControl.DATE_OF_DEATH_DAY, documentHRef: 'dateOfDeath', errorMessage: SearchFormErrorMessage.DATE_OF_DEATH });
        this.dateOfDeathErrorMessage = { isInvalid: true, messages: [SearchFormErrorMessage.DATE_OF_DEATH] };
      }
      // Search cases form
      if (this.formGroup.errors) {
        // Date comparison
        if (this.formGroup.errors.errorType === SearchFormErrorType.DATE_COMPARISON) {
          this.searchValidationErrors.push({ controlId: null, documentHRef: 'dateOfDeath', errorMessage: SearchFormErrorMessage.DATE_COMPARISON_FAILED });
          this.dateOfDeathErrorMessage = { isInvalid: true, messages: [SearchFormErrorMessage.DATE_COMPARISON_FAILED] };
        }
        // No search criteria
        if (this.formGroup.errors.errorType === SearchFormErrorType.NO_SEARCH_CRITERIA) {
          this.searchValidationErrors.push({ controlId: null, documentHRef: null, errorMessage: SearchFormErrorMessage.NO_SEARCH_CRITERIA });
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
    this.caseRefErrorMessage =
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
      const searchParameters: SearchParameters = {
        caseReferences: this.formGroup.get(SearchFormControl.CASE_REF).value !== '' ? [this.formGroup.get(SearchFormControl.CASE_REF).value] : null,
        CCDJurisdictionIds:
          // If the selected value is not "All", use it; else, use the entire Services list (except the "All") item
          this.formGroup.get(SearchFormControl.SERVICES_LIST).value !== 'ALL'
            ? [this.formGroup.get(SearchFormControl.SERVICES_LIST).value]
            : this.services.slice(1).map((service) => service.id),
        otherReferences: this.formGroup.get(SearchFormControl.OTHER_REF).value !== '' ? [this.formGroup.get(SearchFormControl.OTHER_REF).value] : null,
        fullName: this.formGroup.get(SearchFormControl.FULL_NAME).value !== '' ? this.formGroup.get(SearchFormControl.FULL_NAME).value : null,
        address: this.formGroup.get(SearchFormControl.ADDRESS_LINE_1).value !== '' ? this.formGroup.get(SearchFormControl.ADDRESS_LINE_1).value : null,
        postcode: this.formGroup.get(SearchFormControl.POSTCODE).value !== '' ? this.formGroup.get(SearchFormControl.POSTCODE).value : null,
        emailAddress: this.formGroup.get(SearchFormControl.EMAIL).value !== '' ? this.formGroup.get(SearchFormControl.EMAIL).value : null,
        // Date format expected by API endpoint is yyyy-mm-dd
        dateOfBirth: this.getDateFormatted(DateCategoryType.DATE_OF_BIRTH),
        dateOfDeath: this.getDateFormatted(DateCategoryType.DATE_OF_DEATH)
      };

      // Store the search parameters to session
      this.searchService.storeState(SearchStatePersistenceKey.SEARCH_PARAMS, searchParameters);

      // Set the starting record number to 1
      this.searchService.storeState(SearchStatePersistenceKey.START_RECORD, 1);

      // Navigate to the Search Results page
      this.router.navigate(['results'], { relativeTo: this.route });
    }
  }

  /**
   * Function to return date in a format expected by the backend service
   *
   */
  private getDateFormatted(dateCategoryType: string): string {
    // Set values to empty strings if they are not truthy
    const day = dateCategoryType === DateCategoryType.DATE_OF_BIRTH
      ? (this.formGroup.get(SearchFormControl.DATE_OF_BIRTH_DAY).value || '')
      : (this.formGroup.get(SearchFormControl.DATE_OF_DEATH_DAY).value || '');

    const month = dateCategoryType === DateCategoryType.DATE_OF_BIRTH
      ? (this.formGroup.get(SearchFormControl.DATE_OF_BIRTH_MONTH).value || '')
      : (this.formGroup.get(SearchFormControl.DATE_OF_DEATH_MONTH).value || '');

    const year = dateCategoryType === DateCategoryType.DATE_OF_BIRTH
      ? (this.formGroup.get(SearchFormControl.DATE_OF_BIRTH_YEAR).value || '')
      : (this.formGroup.get(SearchFormControl.DATE_OF_DEATH_YEAR).value || '');

    if (day === '' || month === '' || year === '') {
      return null;
    }

    // Date format expected by API endpoint is yyyy-mm-dd
    return `${year}-${month}-${day}`;
  }
}

export interface SearchFormServiceListItem {
  label: string;
  value: string;
  id: string;
}
