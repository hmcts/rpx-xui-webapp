import { Component } from '@angular/core';
import { Mode } from '../../../models/hearings.enum';
import { HEARING_VIEW_ONLY_SUMMARY_TEMPLATE } from '../../../templates/hearing-view-only-summary.template';

@Component({
  selector: 'exui-hearing-viewsummary',
  templateUrl: './hearing-view-summary.component.html'
})
export class HearingViewSummaryComponent {
  public template = HEARING_VIEW_ONLY_SUMMARY_TEMPLATE;
  public mode = Mode.VIEW;
}
