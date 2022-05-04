import { Component, Input } from '@angular/core';

@Component({
  selector: 'exui-hearing-actuals-case-title',
  templateUrl: './hearing-actuals-case-title.component.html'
})
export class HearingActualsCaseTitleComponent {
  @Input() caseTitle: string;
}
