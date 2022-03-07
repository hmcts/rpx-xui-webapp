import { Component, Input } from '@angular/core';
import { CaseDetailsModel } from '../../models/caseDetails.model';

@Component({
  selector: 'exui-hearing-actuals-case-title',
  templateUrl: './hearing-actuals-case-title.component.html'
})
export class HearingActualsCaseTitleComponent {
  @Input() caseDetails: CaseDetailsModel;
}
