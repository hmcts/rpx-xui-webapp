import { Component, Input } from '@angular/core';

import { NavItemsModel } from './../../models/nav-item.model';

@Component({
  selector: 'exui-hmcts-sub-navigation',
  templateUrl: './hmcts-sub-navigation.component.html'
})
export class HmctsSubNavigationComponent {
  @Input() public items: NavItemsModel[];
}
