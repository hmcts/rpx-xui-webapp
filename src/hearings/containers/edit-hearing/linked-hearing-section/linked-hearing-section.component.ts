import { Component, Input } from '@angular/core';

@Component({
  selector: 'exui-linked-hearing-section',
  templateUrl: './linked-hearing-section.component.html'
})
export class LinkedHearingSectionComponent {
  @Input() public hearingIsLinkedFlag: boolean;
}
