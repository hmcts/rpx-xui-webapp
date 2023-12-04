import { Component, EventEmitter, Input, Output } from '@angular/core';
import { editHearingChangeConfig } from '../../../models/editHearingChangeConfig.model';

@Component({
  selector: 'exui-linked-hearing-section',
  templateUrl: './linked-hearing-section.component.html'
})
export class LinkedHearingSectionComponent {
  @Input() public hearingIsLinkedFlag: boolean;
  @Output() public changeEditHearing = new EventEmitter<string>();

  public onChange(fragmentId: string): void {
    let changeLink = '';
    if (fragmentId === 'additionalSecurityRequired') {
      changeLink = '/hearings/request/hearing-facilities#additionalSecurityYes';
    } else {
      changeLink = '/hearings/request/hearing-facilities#immigrationDetentionCentre';
    }
    this.changeEditHearing.emit({ fragmentId, changeLink });
  }
}
