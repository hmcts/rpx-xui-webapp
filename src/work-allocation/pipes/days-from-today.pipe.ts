import { Pipe, PipeTransform } from '@angular/core';
/*
 * Returns a number of days from the current date, rounded down.
 *  * Before today is shown as positive.
 *  * Today is shown as 0.
 *  * After today is shown as negative.
 */
@Pipe({name: 'daysFromToday'})
export class DaysFromTodayPipe implements PipeTransform {

  // The number of seconds in a day, for formatting purposes.
  SECONDS_IN_A_DAY: number = 60 * 60 * 24;

  transform(date: Date): string {
    if (date) {
      const diffDays = this.getDiffDays(date, new Date());
      if (diffDays == 0) {
        return '0 days';
      }

      const plural = Math.abs(diffDays) != 1;
      const sign = diffDays > 0 ? '+' : '';
      return `${sign}${diffDays} day${plural ? 's' : ''}`;
    }
    return undefined;
  }

  private getDiffDays(fromDate: Date, toDate: Date): number {
    const fromEpoch: number = fromDate.getTime();
    const toEpoch: number = toDate.getTime();
    const diffSecs = Math.floor((toEpoch - fromEpoch) / 1000);
    return Math.floor(diffSecs / this.SECONDS_IN_A_DAY);
  }
}
