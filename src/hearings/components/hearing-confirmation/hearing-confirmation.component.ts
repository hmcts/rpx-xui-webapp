import { Component, Input } from '@angular/core';

@Component({
  standalone: false,
  selector: 'exui-hearing-confirmation',
  templateUrl: './hearing-confirmation.component.html'

})
export class HearingConfirmationComponent {
  @Input() public caseId: string;
  @Input() public heading: string;
  @Input() public headingDescription: string;
  @Input() public subheading: string;
  @Input() public subheadingDescription: string;
  @Input() public additionalDescription: string;
}
