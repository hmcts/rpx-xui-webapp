import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {  BookingDateValidationError, BookingNavigationEvent, NewBooking} from '../../models';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  TimeOption,
  BookingTimePageText,
  DateFormControl,
  BookingDateFormErrorMessage,
} from '../../models/booking-date.enum';
import { ErrorMessage } from '../../../app/models';
import { ErrorMessagesModel, GovUiConfigModel } from '@hmcts/rpx-xui-common-lib/lib/gov-ui/models';
import { DateValidators } from '../utils';

@Component({
  selector: 'exui-booking-date',
  templateUrl: './booking-date.component.html'
})
export class BookingDateComponent implements OnInit {

  @Input() public newBooking: NewBooking;
  @Output() public newBookingChange = new EventEmitter<NewBooking>();
  @Output() public eventTrigger = new EventEmitter();
  public title: string;
  public caption: string;
  public readonly dateInterval: DisplayedDateInterval[];
  public formGroup: FormGroup;
  public submitted = false;
  public errorMessage: ErrorMessage;
  public configStart: GovUiConfigModel;
  public configEnd: GovUiConfigModel;
  public dateValidationErrors: BookingDateValidationError[];
  public startDateErrorMessage: ErrorMessagesModel;
  public endDateErrorMessage: ErrorMessagesModel;

  constructor(
    private readonly fb: FormBuilder
  ) {
    this.dateInterval = [
      { date: TimeOption.TODAY, checked: false },
      { date: TimeOption.WEEK, checked: false },
      { date: TimeOption.DATERANGE, checked: false },
    ];

    this.configStart = {
      id: 'startDate',
      name: 'startDate',
      hint: 'For example, 19 11 2021',
      label: 'Booking Starts',
      isPageHeading: false
    };
    this.configEnd = {
      id: 'endDate',
      name: 'endDate',
      hint: 'For example, 19 11 2021',
      label: 'Booking Ends',
      isPageHeading: false
    };
  }

  public ngOnInit(): void {
    debugger;
    this.title = BookingTimePageText.TITLE;
    this.caption = BookingTimePageText.CAPTION;
    this.formGroup = this.fb.group({
      radioSelected: new FormControl(null, Validators.required),
      startDate_day: '',
      startDate_month: '',
      startDate_year: '',
      endDate_year: '',
      endDate_month: '',
      endDate_day: '',
      // startDate_year: new FormControl(null, null),
      // startDate_month: new FormControl(null, null),
      // startDate_day: new FormControl(null, null),
      // endDate_year: new FormControl(null, null),
      // endDate_month: new FormControl(null, null),
      // endDate_day: new FormControl(null, null),
    });
  

  // public ngOnInit(): void {
  //   this.formGroup = this.fb.group({
  //     caseRef: '',
  //     otherRef: '',
  //     fullName: '',
  //     addressLine1: '',
  //     postcode: '',
  //     email: '',
  //     dateOfBirth_day: '',
  //     dateOfBirth_month: '',
  //     dateOfBirth_year: '',
  //     dateOfDeath_day: '',
  //     dateOfDeath_month: '',
  //     dateOfDeath_year: '',
  //     servicesList: ''
  //   });

    // this.searchServiceSubscription$ = this.searchService.getServices().subscribe(services => {
    //   services.forEach(service => {
    //     this.services.push({ label: service.serviceName, value: service.serviceId, id: service.serviceId });
    //   });
    // });
    // // Set default service selection to "All"
    // this.formGroup.get(SearchFormControl.SERVICES_LIST).setValue(this.services[0].id);

    // // Set the form control validators
    this.setValidators();

    // // Pre-populate the form with existing search parameters
    // const searchParameters: SearchParameters = this.searchService.retrieveState(SearchStatePersistenceKey.SEARCH_PARAMS);
    // if (searchParameters) {
    //   // Note: Intentional use of != throughout this if block, to check for search parameter values being not null and not undefined
    //   /* eslint-disable eqeqeq */
    //   /* tslint:disable:triple-equals */
    //   const caseReferences = searchParameters.caseReferences;
    //   if (caseReferences != null) {
    //     this.formGroup.get(SearchFormControl.CASE_REF).setValue(caseReferences[0] || '');
    //   }
    //   const otherReferences = searchParameters.otherReferences;
    //   if (otherReferences != null) {
    //     this.formGroup.get(SearchFormControl.OTHER_REF).setValue(otherReferences[0] || '');
    //   }
    //   this.formGroup.get(SearchFormControl.FULL_NAME).setValue(searchParameters.fullName || '');
    //   this.formGroup.get(SearchFormControl.ADDRESS_LINE_1).setValue(searchParameters.address || '');
    //   this.formGroup.get(SearchFormControl.POSTCODE).setValue(searchParameters.postcode || '');
    //   this.formGroup.get(SearchFormControl.EMAIL).setValue(searchParameters.emailAddress || '');
    //   const dateOfBirth = searchParameters.dateOfBirth;
    //   if (dateOfBirth != null) {
    //     // Date is stored in format yyyy-mm-dd
    //     this.formGroup.get(SearchFormControl.DATE_OF_BIRTH_DAY).setValue(dateOfBirth.split('-')[2]);
    //     this.formGroup.get(SearchFormControl.DATE_OF_BIRTH_MONTH).setValue(dateOfBirth.split('-')[1]);
    //     this.formGroup.get(SearchFormControl.DATE_OF_BIRTH_YEAR).setValue(dateOfBirth.split('-')[0]);
    //   }
    //   const dateOfDeath = searchParameters.dateOfDeath;
    //   if (dateOfDeath != null) {
    //     // Date is stored in format yyyy-mm-dd
    //     this.formGroup.get(SearchFormControl.DATE_OF_DEATH_DAY).setValue(dateOfDeath.split('-')[2]);
    //     this.formGroup.get(SearchFormControl.DATE_OF_DEATH_MONTH).setValue(dateOfDeath.split('-')[1]);
    //     this.formGroup.get(SearchFormControl.DATE_OF_DEATH_YEAR).setValue(dateOfDeath.split('-')[0]);
    //   }
    
      /* eslint-enable eqeqeq */
      /* tslint:enable:triple-equals */
    //}
  }

  /**
   * Assign validation to form controls
   *
   */
  private setValidators(): void {
    const dayValidator = DateValidators.dayValidator();
    this.formGroup.get(DateFormControl.BOOKING_START_DAY).setValidators(dayValidator);
    const monthValidator = DateValidators.monthValidator();
    this.formGroup.get(DateFormControl.BOOKING_START_MONTH).setValidators(monthValidator);
    const yearValidator = DateValidators.yearValidator();
    this.formGroup.get(DateFormControl.BOOKING_START_YEAR).setValidators(yearValidator);

    this.formGroup.get(DateFormControl.BOOKING_END_DAY).setValidators(dayValidator);
    this.formGroup.get(DateFormControl.BOOKING_END_MONTH).setValidators(monthValidator);
    this.formGroup.get(DateFormControl.BOOKING_END_YEAR).setValidators(yearValidator);
debugger;
    const bookingDateValidator = DateValidators.bookingDateValidator();
    const bookingDateValidator2 = DateValidators.bookingDateValidator2();
    this.formGroup.setValidators([bookingDateValidator,bookingDateValidator2]);
    this.formGroup.updateValueAndValidity();
    this.formGroup.get(DateFormControl.BOOKING_START_DAY).updateValueAndValidity();
    this.formGroup.get(DateFormControl.BOOKING_END_DAY).updateValueAndValidity();
  }

  /**
   * Function to validate form controls
   *
   */
  private validateForm(): boolean {
    // Reset validation error messages
    this.formGroup.updateValueAndValidity();
    this.formGroup.get(DateFormControl.BOOKING_START_DAY).updateValueAndValidity();
    this.formGroup.get(DateFormControl.BOOKING_END_DAY).updateValueAndValidity();
    this.resetValidationErrorMessages();
    if (this.formGroup.errors) {
    if (!this.formGroup.valid) {
      if (!this.formGroup.get(DateFormControl.BOOKING_START_DAY).valid ||
          !this.formGroup.get(DateFormControl.BOOKING_START_MONTH).valid ||
          !this.formGroup.get(DateFormControl.BOOKING_START_YEAR).valid) {
        this.dateValidationErrors.push({ controlId: DateFormControl.BOOKING_START_DAY, documentHRef: 'startDate', errorMessage: BookingDateFormErrorMessage.BOOKING_START_DATE_FAILED });
        this.startDateErrorMessage = { isInvalid: true, messages: [BookingDateFormErrorMessage.BOOKING_START_DATE_FAILED] };
      }

      if (!this.formGroup.get(DateFormControl.BOOKING_END_DAY).valid ||
          !this.formGroup.get(DateFormControl.BOOKING_END_MONTH).valid ||
          !this.formGroup.get(DateFormControl.BOOKING_END_YEAR).valid) {
        this.dateValidationErrors.push({ controlId: DateFormControl.BOOKING_END_DAY, documentHRef: 'endDate', errorMessage: BookingDateFormErrorMessage.BOOKING_END_DATE_FAILED });
        this.endDateErrorMessage = { isInvalid: true, messages: [BookingDateFormErrorMessage.BOOKING_END_DATE_FAILED] };
      }

      if (!this.formGroup.get(DateFormControl.RADIOSELECTED).valid )
      {
        this.dateValidationErrors.push({ controlId: null, documentHRef: 'dateOfDeath', errorMessage: BookingDateFormErrorMessage.NO_SELECTION });
      }
     
 debugger;
        switch (this.formGroup.errors.errorType) {
          case BookingDateFormErrorMessage.BOOKING_BOTH_DATE_EMPTY_CHECK:
            this.dateValidationErrors.push({ controlId: null, documentHRef: 'dateOfDeath', errorMessage: BookingDateFormErrorMessage.BOOKING_START_DATE_EMPTY_CHECK_FAILED });    
            this.dateValidationErrors.push({ controlId: null, documentHRef: 'dateOfDeath', errorMessage: BookingDateFormErrorMessage.BOOKING_END_DATE_EMPTY_CHECK_FAILED });       
            this.startDateErrorMessage = { isInvalid: true, messages: [BookingDateFormErrorMessage.BOOKING_START_DATE_EMPTY_CHECK_FAILED] };
            this.endDateErrorMessage = { isInvalid: true, messages: [BookingDateFormErrorMessage.BOOKING_END_DATE_EMPTY_CHECK_FAILED] };
            break;
            case BookingDateFormErrorMessage.BOOKING_START_DATE_EMPTY_CHECK:
              this.dateValidationErrors.push({ controlId: null, documentHRef: 'dateOfDeath', errorMessage: BookingDateFormErrorMessage.BOOKING_START_DATE_EMPTY_CHECK_FAILED });
              this.startDateErrorMessage = { isInvalid: true, messages: [BookingDateFormErrorMessage.BOOKING_START_DATE_EMPTY_CHECK_FAILED] };    
            break;
            case BookingDateFormErrorMessage.BOOKING_END_DATE_EMPTY_CHECK:
              this.dateValidationErrors.push({ controlId: null, documentHRef: 'dateOfDeath', errorMessage: BookingDateFormErrorMessage.BOOKING_END_DATE_EMPTY_CHECK_FAILED });        
              this.endDateErrorMessage = { isInvalid: true, messages: [BookingDateFormErrorMessage.BOOKING_END_DATE_EMPTY_CHECK_FAILED] };
            break;
            // case BookingDateFormErrorMessage.BOOKING_BOTH_DATE_CHECK:
            //   this.dateValidationErrors.push({ controlId: null, documentHRef: 'dateOfDeath', errorMessage: BookingDateFormErrorMessage.BOOKING_START_DATE_EMPTY_CHECK_FAILED });    
            //   this.dateValidationErrors.push({ controlId: null, documentHRef: 'dateOfDeath', errorMessage: BookingDateFormErrorMessage.BOOKING_END_DATE_EMPTY_CHECK_FAILED });       
            //   this.startDateErrorMessage = { isInvalid: true, messages: [BookingDateFormErrorMessage.BOOKING_START_DATE_FAILED] };
            //   this.endDateErrorMessage = { isInvalid: true, messages: [BookingDateFormErrorMessage.BOOKING_END_DATE_FAILED] };
            //   break;
            //   case BookingDateFormErrorMessage.BOOKING_START_DATE_CHECK:
            //     this.dateValidationErrors.push({ controlId: null, documentHRef: 'dateOfDeath', errorMessage: BookingDateFormErrorMessage.BOOKING_START_DATE_EMPTY_CHECK_FAILED });
            //     this.startDateErrorMessage = { isInvalid: true, messages: [BookingDateFormErrorMessage.BOOKING_START_DATE_FAILED] };    
            //   break;
            //   case BookingDateFormErrorMessage.BOOKING_END_DATE_CHECK:
            //     this.dateValidationErrors.push({ controlId: null, documentHRef: 'dateOfDeath', errorMessage: BookingDateFormErrorMessage.BOOKING_END_DATE_EMPTY_CHECK_FAILED });        
            //     this.endDateErrorMessage = { isInvalid: true, messages: [BookingDateFormErrorMessage.BOOKING_END_DATE_FAILED] };
            //   break;
            case BookingDateFormErrorMessage.PAST_DATE_CHECK:
              this.dateValidationErrors.push({ controlId: null, documentHRef: 'dateOfDeath', errorMessage: BookingDateFormErrorMessage.PAST_DATE_CHECK_FAILED });
              this.startDateErrorMessage = { isInvalid: true, messages: [BookingDateFormErrorMessage.PAST_DATE_CHECK_FAILED] };
            break;
            case BookingDateFormErrorMessage.DATE_COMPARISON:
              this.dateValidationErrors.push({ controlId: null, documentHRef: 'dateOfDeath', errorMessage: BookingDateFormErrorMessage.BOOKING_DATE_COMPARISON_FAILED });
              this.startDateErrorMessage = { isInvalid: true, messages: [BookingDateFormErrorMessage.BOOKING_DATE_COMPARISON_FAILED] };
            break;
          default:
            break;
        }  

 
      }

      // Validation failed, return false
     
    //}
debugger;
     if(this.isAnyError())
     {
      return true;
     }else{
      return false;
     }

    // Validation succeeded, return true
    }
  }

  /**
   * Function to reset validation error messages
   *
   */
  public resetValidationErrorMessages(): void {
    this.dateValidationErrors = [];
    this.startDateErrorMessage =
    this.endDateErrorMessage = null;
  }

  /**
   * Function to check if any error exists
   *
   */
  public isAnyError(): boolean {

    return Array.isArray(this.dateValidationErrors) && this.dateValidationErrors.length > 0;
  }


  public onSubmit(): void {
    debugger;
   
    if (!this.validateForm()) {
      // Scroll to error summary
      window.scrollTo({ top: 0, left: 0 });
      debugger;
     
    } else {
      // Populate a SearchParameters instance with the form inputs and persist via the SearchService
      // const searchParameters: SearchParameters = {
      //   caseReferences: this.formGroup.get(SearchFormControl.CASE_REF).value !== '' ? [this.formGroup.get(SearchFormControl.CASE_REF).value] : null,
      //   CCDJurisdictionIds:
      //     // If the selected value is not "All", use it; else, use the entire Services list (except the "All") item
      //     this.formGroup.get(SearchFormControl.SERVICES_LIST).value !== 'ALL'
      //       ? [this.formGroup.get(SearchFormControl.SERVICES_LIST).value]
      //       : this.services.slice(1).map(service => service.id),
      //   otherReferences: this.formGroup.get(SearchFormControl.OTHER_REF).value !== '' ? [this.formGroup.get(SearchFormControl.OTHER_REF).value] : null,
      //   fullName: this.formGroup.get(SearchFormControl.FULL_NAME).value !== '' ? this.formGroup.get(SearchFormControl.FULL_NAME).value : null,
      //   address: this.formGroup.get(SearchFormControl.ADDRESS_LINE_1).value !== '' ? this.formGroup.get(SearchFormControl.ADDRESS_LINE_1).value : null,
      //   postcode: this.formGroup.get(SearchFormControl.POSTCODE).value !== '' ? this.formGroup.get(SearchFormControl.POSTCODE).value : null,
      //   emailAddress: this.formGroup.get(SearchFormControl.EMAIL).value !== '' ? this.formGroup.get(SearchFormControl.EMAIL).value : null,
      //   // Date format expected by API endpoint is yyyy-mm-dd
      //   dateOfBirth: this.getDateFormatted(DateCategoryType.DATE_OF_BIRTH),
      //   dateOfDeath: this.getDateFormatted(DateCategoryType.DATE_OF_DEATH)
      // };


      // // Navigate to the Search Results page
      // this.router.navigate(['results'], {relativeTo: this.route});
    }
debugger;
    this.formGroup.setErrors(null);

  }

  /**
   * Function to return date in a format expected by the backend service
   *
   */
  // private getDateFormatted(dateCategoryType: string): string {
  //   const day = dateCategoryType === DateCategoryType.DATE_OF_BIRTH
  //     ? this.formGroup.get(SearchFormControl.DATE_OF_BIRTH_DAY).value
  //     : this.formGroup.get(SearchFormControl.DATE_OF_DEATH_DAY).value;

  //   const month = dateCategoryType === DateCategoryType.DATE_OF_BIRTH
  //     ? this.formGroup.get(SearchFormControl.DATE_OF_BIRTH_MONTH).value
  //     : this.formGroup.get(SearchFormControl.DATE_OF_DEATH_MONTH).value;

  //   const year = dateCategoryType === DateCategoryType.DATE_OF_BIRTH
  //     ? this.formGroup.get(SearchFormControl.DATE_OF_BIRTH_YEAR).value
  //     : this.formGroup.get(SearchFormControl.DATE_OF_DEATH_YEAR).value;

  //   if (day === '' || month === '' || year === '') {
  //     return null;
  //   }

  //   // Date format expected by API endpoint is yyyy-mm-dd
  //   return `${year}-${month}-${day}`;
  // }

  // public onEventTrigger() {

  //   if (!this.validateForm()) {
  //     // Scroll to error summary
  //     window.scrollTo({ top: 0, left: 0 });
  //   } else {
  //     this.eventTrigger.emit(BookingNavigationEvent.CONFIRMBOOKINGDATESUBMIT);
  //   }
   
  // }
}

export interface DisplayedDateInterval {
  date: TimeOption;
  checked: boolean;
}

