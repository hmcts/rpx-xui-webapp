import { Component, Input } from '@angular/core';
import { Helper, Navigation } from '../../containers/footer/footer.model';

@Component({
  selector: 'exui-app-hmcts-global-footer',
  templateUrl: './hmcts-global-footer.component.html'
})
export class HmctsGlobalFooterComponent {
  @Input() public help: Helper;
  @Input() public navigation: Navigation;
}
