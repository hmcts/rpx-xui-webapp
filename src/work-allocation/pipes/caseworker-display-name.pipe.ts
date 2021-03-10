import { Pipe, PipeTransform } from '@angular/core';

import { Caseworker } from '../models/dtos';

/*
 * Returns a formatted display name for a Caseworker.
 */
@Pipe({name: 'caseworkerDisplayName'})
export class CaseworkerDisplayName implements PipeTransform {
  public transform(caseworker: Caseworker, includeEmail = true): string {
    if (caseworker) {
      const email = includeEmail && caseworker.email ? ` - ${caseworker.email}` : '';
      return `${caseworker.firstName} ${caseworker.lastName}${email}`;
    }
    return undefined;
  }
}
