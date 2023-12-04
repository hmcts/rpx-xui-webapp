import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { editHearingChangeConfig } from '../../../models/editHearingChangeConfig.model';

@Component({
  selector: 'exui-additional-instructions-section',
  templateUrl: './additional-instructions-section.component.html'
})
export class AdditionalInstructionsSectionComponent implements OnInit {
  @Input() public listingComments: string;
  @Output() public changeEditHearing = new EventEmitter<editHearingChangeConfig>();

  public additionalInstructions: string;

  public ngOnInit(): void {
    this.additionalInstructions = this.listingComments?.replace(/(?:\r\n|\r|\n)/g, '<br>') || '';
  }

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
