import { Component, EventEmitter, Input, Output } from '@angular/core';
import { editHearingChangeConfig } from '../../../models/editHearingChangeConfig.model';

@Component({
  selector: 'exui-language-requirements-section',
  templateUrl: './language-requirements-section.component.html'
})
export class LanguageRequirementsSectionComponent {
  @Input() public hearingInWelshFlag: boolean;
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
