import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mode } from '../../models/hearings.enum';

@Component({
  standalone: false,
  selector: 'exui-linked-hearings-case-title',
  templateUrl: './linked-hearings-case-title.component.html'
})
export class LinkedHearingsCaseTitleComponent {
  @Input() public caseName: string;
  @Input() public caseId: string;
  @Input() public mode: Mode = Mode.LINK_HEARINGS;
  public hearingTitleTextPrefix = '';
  constructor(
    protected readonly route: ActivatedRoute,
  ) {
    this.hearingTitleTextPrefix = this.route.snapshot.data.mode === Mode.MANAGE_HEARINGS ? 'Manage hearings linked to' : 'Link hearings for';
  }
}
