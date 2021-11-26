import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ErrorMessagesModel } from '@hmcts/rpx-xui-common-lib/lib/gov-ui/models';
import { date } from 'faker';
import { DateFormControl, BookingDateFormErrorMessage, TimeOption } from '../../models/index';

export class DateValidators {

  public static dayValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value === null || control.value === '') { return; }
      if (control.value <= 0 || control.value > 31) {
        return { isValid : false };
      }
      return;
    };
  }

  public static monthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value === null || control.value === '') { return; }
      if (control.value <= 0 || control.value > 12) {
        return { isValid : false };
      }
      return;
    };
  }

  public static yearValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value === null || control.value === '') { return; }
      if (control.value < 1900 || control.value > 2100) {
        return { isValid : false };
      }
      return;
    };
  }

//   public static conditionalRequiredValidator(): ValidatorFn {
//     return (formGroup: AbstractControl): ValidationErrors | null => {
         
        
//     //     debugger;
//     //     const dateOfBirthDay = formGroup.get('radioSelected').value;

//     //   if (dateOfBirthDay.value === TimeOption.TODAY ) {
//     //     return { isValid : false };
//     //   }
//       return;
//     };
//   }

//   public static conditionalRequiredValidator(): ValidatorFn {
//     return (formGroup: FormGroup): ValidationErrors | null => {


//     //   const dateOfBirthDay = formGroup.get(DateFormControl.BOOKING_START_DAY).value;
//     //   const dateOfBirthMonth = formGroup.get(DateFormControl.BOOKING_START_MONTH).value;
//     //   const dateOfBirthYear = formGroup.get(DateFormControl.BOOKING_START_YEAR).value;
//     //   const dateOfDeathDay = formGroup.get(DateFormControl.BOOKING_END_DAY).value;
//     //   const dateOfDeathMonth = formGroup.get(DateFormControl.BOOKING_END_MONTH).value;
//     //   const dateOfDeathYear = formGroup.get(DateFormControl.BOOKING_END_YEAR).value;
      
//     //const dateOfBirthDay = formGroup.get(DateFormControl.BOOKING_START_DAY).value;
     


//       if (!formGroup || !formGroup.get('radioSelected')) {
//         return null;
//     }
//     const x = formGroup.get('radioSelected');
//      // console.log(x.value)
//       if ( x.value == TimeOption.TODAY ) {
//         return { isValid: false, errorType: BookingDateFormErrorMessage.DATE_COMPARISON };
//       }
//       // No comparison required if both the dates are blank
//     //   if (dateOfBirthDay === '' && dateOfBirthMonth === '' && dateOfBirthYear === '' &&
//     //       dateOfDeathDay === '' && dateOfDeathMonth === '' && dateOfDeathYear === '') {
//     //     return;
//     //   }

//     //   // Form the dates
//     //   const dateOfBirth = new Date(dateOfBirthYear, dateOfBirthMonth, dateOfBirthDay);
//     //   const dateOfDeath = new Date(dateOfDeathYear, dateOfDeathMonth, dateOfDeathDay);

//     //   // Do not compare even if one of the date is not well formed
//     //   if (dateOfBirth.getFullYear() <= 1900 || dateOfDeath.getFullYear() <= 1900) {
//     //     return;
//     //   }

//     //   // Compare
//     //   if (dateOfBirth > dateOfDeath) {
//     //     return { isValid: false, errorType: BookingDateFormErrorMessage.DATE_COMPARISON };
//     //   }
//       return;
//     };
//   }


public static getFormValues(formGroup: AbstractControl) {
    const startDateDay = formGroup.get(DateFormControl.BOOKING_START_DAY).value;
    const startDateMonth = formGroup.get(DateFormControl.BOOKING_START_MONTH).value;
    const startDateYear = formGroup.get(DateFormControl.BOOKING_START_YEAR).value;
    const endDateDay = formGroup.get(DateFormControl.BOOKING_END_DAY).value;
    const endDateMonth = formGroup.get(DateFormControl.BOOKING_END_MONTH).value;
    const endDateYear = formGroup.get(DateFormControl.BOOKING_END_YEAR).value;
    const radioSelected = formGroup.get('radioSelected').value;
    return {startDateDay,startDateMonth,startDateYear,endDateDay,endDateMonth,endDateYear,radioSelected}
}


public static bookingDateValidator2(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const {startDateDay,startDateMonth,startDateYear,endDateDay,endDateMonth,endDateYear,radioSelected} =  this.getFormValues(formGroup);
         // No comparison required if date range is not selected
    if (radioSelected !== TimeOption.DATERANGE ) {
       return;
    }
    if ((startDateDay === '' || startDateMonth === '' || startDateYear === '') &&
    (endDateDay === '' || endDateMonth === '' || endDateYear === '')  ) {
        return { isValid: false, errorType: BookingDateFormErrorMessage.BOOKING_BOTH_DATE_EMPTY_CHECK };
    }
    if (startDateDay === '' || startDateMonth === '' || startDateYear === '' ) {
          return { isValid: false, errorType: BookingDateFormErrorMessage.BOOKING_START_DATE_EMPTY_CHECK };
   
    }
    if (endDateDay === '' || endDateMonth === '' || endDateYear === '' ) {
    return { isValid: false, errorType: BookingDateFormErrorMessage.BOOKING_END_DATE_EMPTY_CHECK };
    }
  }}


  public static bookingDateValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const startDateDay = formGroup.get(DateFormControl.BOOKING_START_DAY).value;
      const startDateMonth = formGroup.get(DateFormControl.BOOKING_START_MONTH).value;
      const startDateYear = formGroup.get(DateFormControl.BOOKING_START_YEAR).value;
      const endDateDay = formGroup.get(DateFormControl.BOOKING_END_DAY).value;
      const endDateMonth = formGroup.get(DateFormControl.BOOKING_END_MONTH).value;
      const endDateYear = formGroup.get(DateFormControl.BOOKING_END_YEAR).value;
      const radioSelected = formGroup.get('radioSelected').value;
  
     // No comparison required if date range is not selected
    if (radioSelected !== TimeOption.DATERANGE ) {
       return;
    }
  


      // No comparison required if both the dates are blank
      if (startDateDay === '' || startDateMonth === '' || startDateYear === '' ||
      endDateDay === '' || endDateMonth === '' || endDateYear === '') {
        return { isValid: true };
      }

      // Form the dates
      const startDate = new Date(startDateYear, startDateMonth, startDateDay);
      const endDate = new Date(endDateYear, endDateMonth, endDateDay);

    //   // Do not compare even if one of the date is not well formed
    //   if (startDate.getFullYear() <= 1900 || startDate.getFullYear() >= 2100 ||
    //   endDate.getFullYear() <= 1900 || endDate.getFullYear() >= 2100) {
    //     bookingDateFormErrorMessages.push( { isValid: false, errorType: BookingDateFormErrorMessage.BOOKING_BOTH_DATE_CHECK });
    //   }
    //   if (startDate.getFullYear() <= 1900 || startDate.getFullYear() >= 2100 ) {
    //     bookingDateFormErrorMessages.push( { isValid: false, errorType: BookingDateFormErrorMessage.BOOKING_START_DATE_CHECK });
    //   }
    //   if (endDate.getFullYear() <= 1900 || endDate.getFullYear() >= 2100 ) {
    //     bookingDateFormErrorMessages.push( { isValid: false, errorType: BookingDateFormErrorMessage.BOOKING_END_DATE_CHECK });
    //   }

      // Compare
      debugger;
      console.log('------------------------------------------------------------------');
      console.log(startDate);
      console.log(endDate);
      if (startDate > endDate) {

        return { isValid: false, errorType: BookingDateFormErrorMessage.DATE_COMPARISON };
      }
      if (new Date() > startDate) {
        return { isValid: false, errorType: BookingDateFormErrorMessage.PAST_DATE_CHECK };
      }

      return ;
    };
  }
}
