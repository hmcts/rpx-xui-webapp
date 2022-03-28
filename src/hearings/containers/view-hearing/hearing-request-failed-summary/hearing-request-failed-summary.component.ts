import { Component } from '@angular/core';
import { HEARING_REQUEST_FAILED_SUMMARY_TEMPLATE } from '../../../templates/hearing-request-failed-summary.template';
import { HearingSummaryEnum, Mode } from '../../../models/hearings.enum';

@Component({
  selector: 'exui-hearing-request-failed-summary',
  templateUrl: './hearing-request-failed-summary.component.html',
})
export class HearingRequestFailedSummaryComponent {
  public template = HEARING_REQUEST_FAILED_SUMMARY_TEMPLATE;
  public mode = Mode.VIEW;
  public requestErrors = [{ id: 'request-failed', message: HearingSummaryEnum.RequestFailedError }];
}
