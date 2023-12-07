import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EditHearingChangeConfig } from '../../../../models/editHearingChangeConfig.model';

@Component({
  selector: 'exui-additional-instructions-section',
  templateUrl: './additional-instructions-section.component.html'
})
export class AdditionalInstructionsSectionComponent implements OnInit {
  @Input() public listingComments: string;
  @Output() public changeEditHearing = new EventEmitter<EditHearingChangeConfig>();

  public additionalInstructions: string;

  public ngOnInit(): void {
    this.additionalInstructions = this.listingComments?.replace(/(?:\r\n|\r|\n)/g, '<br>') || '';
  }

  public onChange(fragmentId: string): void {
    const changeLink = '/hearings/request/hearing-additional-instructions#additionalInstructionsTextarea';
    this.changeEditHearing.emit({ fragmentId, changeLink });
  }
}
