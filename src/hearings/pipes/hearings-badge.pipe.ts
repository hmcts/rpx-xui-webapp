import { Pipe, PipeTransform } from '@angular/core';
import { EXUIDisplayStatusEnum } from '../models/hearings.enum';

@Pipe({
  name: 'hearingsBadge'
})
export class HearingsBadgePipe implements PipeTransform {

  public transform(value: EXUIDisplayStatusEnum): string {
    switch (value) {
      case EXUIDisplayStatusEnum.VACATED:
        return 'govuk-tag govuk-tag--red';
      case EXUIDisplayStatusEnum.COMPLETED:
        return 'govuk-tag govuk-tag--purple';
      case EXUIDisplayStatusEnum.LISTED:
        return 'govuk-tag govuk-tag--green';
      case EXUIDisplayStatusEnum.AWAITING_LISTING:
        return 'govuk-tag govuk-tag--grey';
      default:
        return 'govuk-tag';
    }
  }

}
