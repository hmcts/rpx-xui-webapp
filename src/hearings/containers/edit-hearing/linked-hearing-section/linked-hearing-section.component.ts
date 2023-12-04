import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EditHearingChangeConfig } from '../../../models/editHearingChangeConfig.model';

@Component({
  selector: 'exui-linked-hearing-section',
  templateUrl: './linked-hearing-section.component.html'
})
export class LinkedHearingSectionComponent {
  @Input() public hearingIsLinkedFlag: boolean;
  @Output() public changeEditHearing = new EventEmitter<EditHearingChangeConfig>();

  public onChange(fragmentId: string): void {
    const changeLink = '/hearings/request/hearing-link#yes';
    this.changeEditHearing.emit({ fragmentId, changeLink });
  }
}
