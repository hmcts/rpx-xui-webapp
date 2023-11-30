import { Component, Input } from '@angular/core';

@Component({
  selector: 'exui-language-requirements-section',
  templateUrl: './language-requirements-section.component.html'
})
export class LanguageRequirementsSectionComponent {
  @Input() public hearingInWelshFlag: boolean;
}
