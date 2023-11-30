import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'exui-additional-instructions-section',
  templateUrl: './additional-instructions-section.component.html'
})
export class AdditionalInstructionsSectionComponent implements OnInit {
  @Input() public listingComments: string;
  public additionalInstructions: string;

  public ngOnInit(): void {
    this.additionalInstructions = this.listingComments?.replace(/(?:\r\n|\r|\n)/g, '<br>') || '';
  }
}
