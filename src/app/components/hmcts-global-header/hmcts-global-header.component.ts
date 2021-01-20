import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromNocStore from '../../../noc/store';
import { NavItemsModel } from '../../models/nav-item.model';
import { UserNavModel } from '../../models/user-nav.model';

@Component({
    selector: 'exui-hmcts-global-header',
    templateUrl: './hmcts-global-header.component.html'
})
export class HmctsGlobalHeaderComponent implements OnInit {

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

  constructor(
    public nocStore: Store<fromNocStore.State>,
    private readonly router: Router) { }

  public ngOnInit() {
    // set the active tab via the url in the router
    this.tab = this.setActiveTab(this.router.url);
  }

  public setActiveTab(url: string) {
    this.tab = null;
    switch (url) {
      case '/tasks/list': {
        return 'Task list';
      }
      case '/tasks/task-manager': {
        return 'Task manager';
      }
      case '/cases': {
        return 'Case list';
      }
      case '/cases/case-filter': {
        return 'Create case';
      }
      default: {
        return null;
      }
    }
  }

  public onEmitEvent(index: number): void {
    this.navigate.emit(this.navigation.items[index].emit);
  }

  public onEmitSubMenu(menuItem: any) {
    // remove the setting of selected item via url
    this.tab = menuItem.text;
    if (menuItem.href === '/noc') {
      this.nocStore.dispatch(new fromNocStore.Reset());
    }
  }
}
