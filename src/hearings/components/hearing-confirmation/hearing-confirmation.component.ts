import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: false,
  selector: 'exui-hearing-confirmation',
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './hearing-confirmation.component.html',
})
export class HearingConfirmationComponent {
  @Input() public caseId: string;
  @Input() public heading: string;
  @Input() public headingDescription: string;
  @Input() public subheading: string;
  @Input() public subheadingDescription: string;
  @Input() public additionalDescription: string;
  @Input() public jurisdiction: string;
  @Input() public caseType: string;
}
