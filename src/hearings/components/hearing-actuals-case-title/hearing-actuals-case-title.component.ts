import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: false,
  selector: 'exui-hearing-actuals-case-title',
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './hearing-actuals-case-title.component.html',
})
export class HearingActualsCaseTitleComponent {
  @Input() public caseTitle: string;
}
