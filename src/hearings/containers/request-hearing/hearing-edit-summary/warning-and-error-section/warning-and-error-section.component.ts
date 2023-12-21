import { Component, Input } from '@angular/core';

@Component({
  selector: 'exui-warning-and-error-section',
  templateUrl: './warning-and-error-section.component.html'
})
export class WarningAndErrorSectionComponent {
  @Input() public displayValildationMessage: boolean;
  @Input() public isPagelessAttributeChanged: boolean = true;
}
