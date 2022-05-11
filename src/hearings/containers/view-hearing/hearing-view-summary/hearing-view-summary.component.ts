import { Component } from '@angular/core';
import { HEARING_VIEW_ONLY_SUMMARY_TEMPLATE } from '../../../templates/hearing-view-only-summary.template';
import { Mode } from '../../../models/hearings.enum';

@Component({
  selector: 'exui-hearing-viewsummary',
  templateUrl: './hearing-view-summary.component.html'
})
export class HearingViewSummaryComponent {
  public template = HEARING_VIEW_ONLY_SUMMARY_TEMPLATE;
  public mode = Mode.VIEW;
}
