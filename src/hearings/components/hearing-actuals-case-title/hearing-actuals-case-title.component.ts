import { Component, Input } from '@angular/core';

@Component({
  standalone: false,

  selector: 'exui-hearing-actuals-case-title',
  templateUrl: './hearing-actuals-case-title.component.html'

})
export class HearingActualsCaseTitleComponent {
  @Input() public caseTitle: string;
}
