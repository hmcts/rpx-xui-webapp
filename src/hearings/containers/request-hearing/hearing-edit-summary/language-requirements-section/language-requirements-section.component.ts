import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EditHearingChangeConfig } from '../../../../models/editHearingChangeConfig.model';

@Component({
  selector: 'exui-language-requirements-section',
  templateUrl: './language-requirements-section.component.html'
})
export class LanguageRequirementsSectionComponent {
  @Input() public hearingInWelshFlag: boolean;
  @Output() public changeEditHearing = new EventEmitter<EditHearingChangeConfig>();

  public onChange(fragmentId: string): void {
    const changeLink = '/hearings/request/hearing-welsh#welsh_hearing_yes';
    this.changeEditHearing.emit({ fragmentId, changeLink });
  }
}
