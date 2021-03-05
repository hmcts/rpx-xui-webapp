import { Pipe, PipeTransform } from '@angular/core';

import { Caseworker } from '../models/dtos';

/*
 * Returns a formatted display name for a Caseworker.
 */
@Pipe({name: 'caseworkerDisplayName'})
export class CaseworkerDisplayName implements PipeTransform {
  public transform(caseworker: Caseworker, includeEmail = true): string {
    if (caseworker) {
      const email = includeEmail && caseworker.email_id ? ` - ${caseworker.email_id}` : '';
      return `${caseworker.first_name} ${caseworker.last_name}${email}`;
    }
    return undefined;
  }
}
