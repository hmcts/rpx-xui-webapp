import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

/*
 * Returns an integer representation of a number.
 *  * Before today is shown as positive.
 *  * Today is shown as 0.
 *  * After today is shown as negative.
 */
@Pipe({name: 'twoDP'})
export class TwoDPPipe implements PipeTransform {
  private readonly DIGITS_INFO: string = '1.2-2';
  private readonly decimalPipe: DecimalPipe = new DecimalPipe('en-US');

  /**
   * @param value The number to be formatted.
   * @param locale A locale code for the locale format rules to use.
   * When not supplied, uses the value of `LOCALE_ID`, which is `en-US` by default.
   * See [Setting your app locale](guide/i18n#setting-up-the-locale-of-your-app).
   */
  public transform(value: any, locale?: string): string {
    if (isNaN(Number(value))) {
      return undefined;
    }
    return this.decimalPipe.transform(value, this.DIGITS_INFO, locale);
  }
}
