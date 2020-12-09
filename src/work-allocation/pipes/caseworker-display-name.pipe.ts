import { Pipe, PipeTransform } from '@angular/core';

import { Caseworker } from '../models/dtos';

/*
 * Returns a formatted display name for a Caseworker.
 */
@Pipe({name: 'caseworkerDisplayName'})
export class CaseworkerDisplayName implements PipeTransform {
  public transform(caseworker: Caseworker): string {
    if (caseworker) {
      return `${caseworker.firstName} ${caseworker.lastName}`;
    }
    return undefined;
  }
}
