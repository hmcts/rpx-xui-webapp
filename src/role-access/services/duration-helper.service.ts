import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { boolean } from '@pact-foundation/pact/dsl/matchers';

@Injectable({ providedIn: 'root' })
export class DurationHelperService {

  public dateFormat = 'YYYY-MM-DD';

  public getDateFromControls(
    dayControl: FormControl,
    monthControl: FormControl,
    yearControl: FormControl
  ): Date {
    return new Date(yearControl.value, monthControl.value - 1, dayControl.value);
  }

  public getTodaysDate(): Date {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    return currentDate;
  }

  public formatString(n: number): string {
    return n >= 10 ? n.toString() : `0${n}`;
  }

  public checkDates(
    startDate: string,
    endDate: string
  ): { isStartDateValid: boolean, isEndDateValid: boolean} {
    const isStartDateValid = moment(startDate, this.dateFormat, true).isValid();
    const isEndDateValid = moment(endDate, this.dateFormat, true).isValid();
    return {
      isStartDateValid,
      isEndDateValid
    }
  }

  public convertDateControlsToString(dateControls: FormControl[]): string {
    if (dateControls.length !== 3) {
      return '';
    }
    const dayStart = this.formatString(dateControls[0].value);
    const monthStart = this.formatString(dateControls[1].value);
    const yearStart = dateControls[2].value;
    return `${yearStart}-${monthStart}-${dayStart}`;
  }

}
