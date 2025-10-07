import { Pipe, PipeTransform } from '@angular/core';
import { EXUIDisplayStatusEnum } from '../models/hearings.enum';

@Pipe({
  standalone: false,

  name: 'hearingsBadge'

})
export class HearingsBadgePipe implements PipeTransform {
  public transform(value: EXUIDisplayStatusEnum): string {
    switch (value) {
      case EXUIDisplayStatusEnum.VACATED:
      case EXUIDisplayStatusEnum.CANCELLED:
        return 'govuk-tag govuk-tag--red';
      case EXUIDisplayStatusEnum.COMPLETED:
        return 'govuk-tag govuk-tag--purple';
      case EXUIDisplayStatusEnum.LISTED:
        return 'govuk-tag govuk-tag--green';
      case EXUIDisplayStatusEnum.AWAITING_LISTING:
      case EXUIDisplayStatusEnum.UPDATE_REQUESTED:
      case EXUIDisplayStatusEnum.CANCELLATION_REQUESTED:
        return 'govuk-tag govuk-tag--grey';
      case EXUIDisplayStatusEnum.FAILURE:
        return 'govuk-tag govuk-tag--orange';
      case EXUIDisplayStatusEnum.AWAITING_ACTUALS:
        return 'govuk-tag govuk-tag--blue';
      case EXUIDisplayStatusEnum.ADJOURNED:
        return 'govuk-tag govuk-tag--yellow';
      default:
        return 'govuk-tag';
    }
  }
}
