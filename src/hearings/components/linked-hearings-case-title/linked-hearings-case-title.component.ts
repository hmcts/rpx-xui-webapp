import { Component, Input } from '@angular/core';
import { Mode } from 'src/hearings/models/hearings.enum';

@Component({
  selector: 'exui-linked-hearings-case-title',
  templateUrl: './linked-hearings-case-title.component.html',
})
export class LinkedHearingsCaseTitleComponent {
  @Input() public caseName: string;
  @Input() public caseId: string;
  @Input() public mode: Mode = Mode.LINK_HEARINGS;
  public hearingTitleTextPrefix = this.mode === Mode.LINK_HEARINGS ? 'Link hearings' : 'Manage hearings';
}
