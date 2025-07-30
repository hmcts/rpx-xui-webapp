import { Component, Input } from '@angular/core';

@Component({
    selector: 'exui-hearing-actuals-case-title',
    templateUrl: './hearing-actuals-case-title.component.html',
    standalone: false
})
export class HearingActualsCaseTitleComponent {
  @Input() public caseTitle: string;
}
