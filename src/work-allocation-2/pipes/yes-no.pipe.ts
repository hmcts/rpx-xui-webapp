import { Pipe, PipeTransform } from '@angular/core';
/*
 * Returns a pretty string formatting of a boolean value.
 *  * true => 'Yes'
 *  * false => 'No'
 *  * undefined => undefined;
 */
@Pipe({name: 'yesNo'})
export class YesNoPipe implements PipeTransform {
  public transform(value: boolean): string {
    if (value === true) {
      return 'Yes';
    } else if (value === false) {
      return 'No';
    }
    return undefined;
  }
}
