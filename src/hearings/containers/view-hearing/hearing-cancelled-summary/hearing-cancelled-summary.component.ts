import { Component } from '@angular/core';
import { Mode } from '../../../models/hearings.enum';
import { HEARING_CANCELLED_SUMMARY_TEMPLATE } from '../../../templates/hearing-cancelled-summary.template';

@Component({
    selector: 'exui-hearing-cancelled-summary',
    templateUrl: './hearing-cancelled-summary.component.html',
    standalone: false
})
export class HearingCancelledSummaryComponent {
  public template = HEARING_CANCELLED_SUMMARY_TEMPLATE;
  public mode = Mode.VIEW;
}
