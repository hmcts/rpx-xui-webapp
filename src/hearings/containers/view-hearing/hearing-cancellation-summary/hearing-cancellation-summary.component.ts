import { Component } from '@angular/core';
import { HEARING_CANCELLATION_SUMMARY_TEMPLATE } from '../../../../hearings/templates/hearing-cancellation-summary.template';
import { Mode } from '../../../models/hearings.enum';

@Component({
  standalone: false,
  selector: 'exui-hearing-cancellation-summary',
  templateUrl: './hearing-cancellation-summary.component.html'

})
export class HearingCancellationSummaryComponent {
  public template = HEARING_CANCELLATION_SUMMARY_TEMPLATE;
  public mode = Mode.VIEW;
}
