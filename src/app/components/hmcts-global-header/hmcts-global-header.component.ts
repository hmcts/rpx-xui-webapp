import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromNocStore from '../../../noc/store';

@Component({
    selector: 'exui-hmcts-global-header',
    templateUrl: './hmcts-global-header.component.html'
})
export class HmctsGlobalHeaderComponent implements OnInit {

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
  public selectedItem;
  public setTab;

  constructor(
    public nocStore: Store<fromNocStore.State>,
    private readonly router: Router) { }

  public ngOnInit() {
    // set the active tab via the url in the router
    this.setActiveTab();
  }

  public setActiveTab() {
    this.setTab = null;
    switch (this.router.url) {
      case '/tasks/list': {
        this.setTab = 'Task list';
        break;
      }
      case '/tasks/task-manager': {
        this.setTab = 'Task manager';
        break;
      }
      case '/cases': {
        this.setTab = 'Case list';
        break;
      }
      case '/cases/case-filter': {
        this.setTab = 'Create case';
        break;
      }
      default: {
        this.setTab = null;
        break;
      }
    }
  }

  public onEmitEvent(index) {
    this.navigate.emit(this.navigation.items[index].emit);
  }

  public onEmitSubMenu(menuItem: any) {
    // remove the setting of selected item via url
    this.setTab = null;

    // set the selected item
    this.selectedItem = menuItem;
    if (menuItem.href === '/noc') {
      this.nocStore.dispatch(new fromNocStore.Reset());
    }
  }
}
