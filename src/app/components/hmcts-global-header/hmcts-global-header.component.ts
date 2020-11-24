import { Component, EventEmitter, Input, Output } from '@angular/core';

import { NavItemsModel } from './../../models/nav-item.model';
import { UserNavModel } from './../../models/user-nav.model';

@Component({
    selector: 'exui-hmcts-global-header',
    templateUrl: './hmcts-global-header.component.html'
})
export class HmctsGlobalHeaderComponent {

  @Input() public set showNavItems(value: boolean) {
    this.showItems = value;
  }
  @Input() public items: NavItemsModel[];
  @Input() public logoIsUsed: boolean;
  @Input() public showFindCase: boolean;
  @Input() public headerTitle: {name: string; url: string};
  @Input() public navigation: UserNavModel;
  @Input() public logoType: string;
  @Input() public currentUrl: string;
  @Output() public navigate = new EventEmitter<string>();

  public showItems: boolean;
  public userValue = true;

  public onEmitEvent(index: number): void {
    this.navigate.emit(this.navigation.items[index].emit);
  }
}
