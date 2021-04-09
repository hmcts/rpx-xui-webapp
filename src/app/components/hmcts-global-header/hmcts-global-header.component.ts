import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromNocStore from '../../../noc/store';
import { NavItemsModel } from '../../models/nav-item.model';
import { UserNavModel } from '../../models/user-nav.model';

@Component({
    selector: 'exui-hmcts-global-header',
    templateUrl: './hmcts-global-header.component.html'
})
export class HmctsGlobalHeaderComponent implements OnChanges {

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
  public tab;
  public leftItems: NavItemsModel[];
  public rightItems: NavItemsModel[];

  constructor(
    public nocStore: Store<fromNocStore.State>) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.splitNavItems();
  }

  public splitNavItems() {
    this.rightItems = this.items.filter(item => item.align && item.align === 'right');
    this.leftItems = this.items.filter(item => !item.align || item.align !== 'right');
  }

  public onEmitEvent(index: number): void {
    this.navigate.emit(this.navigation.items[index].emit);
  }

  public onEmitSubMenu(menuItem: any) {
    if (menuItem.href === '/noc') {
      this.nocStore.dispatch(new fromNocStore.Reset());
    }
  }
}
