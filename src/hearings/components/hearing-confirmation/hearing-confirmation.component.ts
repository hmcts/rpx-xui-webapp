import { Component, Input } from '@angular/core';
import { HearingConfirmationSource } from 'src/hearings/models/hearings.enum';

@Component({
  selector: 'exui-hearing-confirmation',
  templateUrl: './hearing-confirmation.component.html'
})
export class HearingConfirmationComponent {

  @Input() public confirmationSource: number;
  @Input() public caseId: string;
  @Input() public heading: string;
  @Input() public headingDescription: string;
  @Input() public subheading: string;
  @Input() public subheadingDescription: string;
  @Input() public additionalDescription: string;

  public get hearingConfirmationSource(): typeof HearingConfirmationSource {
    return HearingConfirmationSource;
  }
}
