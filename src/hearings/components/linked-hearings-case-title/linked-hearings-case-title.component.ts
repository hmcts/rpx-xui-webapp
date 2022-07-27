import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'exui-linked-hearings-case-title',
  templateUrl: './linked-hearings-case-title.component.html',
})
export class LinkedHearingsCaseTitleComponent {
  @Input() public caseName: string;
  @Input() public caseId: string;
}
