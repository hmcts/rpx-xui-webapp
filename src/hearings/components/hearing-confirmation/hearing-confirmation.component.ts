import { Component, Input } from '@angular/core';

@Component({
    selector: 'exui-hearing-confirmation',
    templateUrl: './hearing-confirmation.component.html',
    standalone: false
})
export class HearingConfirmationComponent {
  @Input() public caseId: string;
  @Input() public heading: string;
  @Input() public headingDescription: string;
  @Input() public subheading: string;
  @Input() public subheadingDescription: string;
  @Input() public additionalDescription: string;
}
