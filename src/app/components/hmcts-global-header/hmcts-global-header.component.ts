import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromNocStore from '../../../noc/store';

@Component({
    selector: 'exui-hmcts-global-header',
    templateUrl: './hmcts-global-header.component.html'
})
export class HmctsGlobalHeaderComponent {

  @Input() public set showNavItems(value) {
    this.showItems = value;
  }
  @Input() public label;
  @Input() public items;
  @Input() public logoIsUsed;
  @Input() public showFindCase: boolean;
  @Input() public headerTitle: {name: string; url: string};
  @Input() public navigation;
  @Input() public logoType: string;
  @Output() public navigate = new EventEmitter<string>();

  public showItems: boolean;
  public userValue = true;

  constructor(public nocStore: Store<fromNocStore.State>) { }

  public onEmitEvent(index) {
    this.navigate.emit(this.navigation.items[index].emit);
  }

  public onEmitSubMenu(menuItem: any) {
    if (menuItem.href === '/noc') {
      this.nocStore.dispatch(new fromNocStore.Reset());
    }
  }
}
