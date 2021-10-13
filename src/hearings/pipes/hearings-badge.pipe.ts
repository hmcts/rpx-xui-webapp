import { Pipe, PipeTransform } from '@angular/core';
import { HearingListingStatusEnum } from '../models/hearings.enum';

@Pipe({
  name: 'hearingsBadge'
})
export class HearingsBadgePipe implements PipeTransform {

  public transform(value: HearingListingStatusEnum): string {
    switch (value) {
      case HearingListingStatusEnum.CANCELLED:
        return 'govuk-tag govuk-tag--red';
      case HearingListingStatusEnum.COMPLETED:
        return 'govuk-tag govuk-tag--purple';
      case HearingListingStatusEnum.LISTED:
        return 'govuk-tag govuk-tag--green';
      case HearingListingStatusEnum.WAITING_TO_BE_LISTED:
        return 'govuk-tag govuk-tag--grey';
      default:
        return '';
    }
  }

}
