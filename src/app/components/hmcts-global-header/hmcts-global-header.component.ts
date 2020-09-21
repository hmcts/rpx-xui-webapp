import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as fromRoot from '../../store';
import { Store } from '@ngrx/store';

@Component({
    selector: 'exui-hmcts-global-header',
    templateUrl: './hmcts-global-header.component.html'
})
export class HmctsGlobalHeaderComponent {

  @Input() set showNavItems(value) {
    this.showItems = value;
  }
  @Input() label;
  @Input() items;
  @Input() public logoIsUsed;
  @Input() showFindCase: boolean;

  public showItems: boolean;
  // @Input() set userLoggedIn(value) {
  //     this.userValue = value;
  // }
  @Input() headerTitle: {name: string; url: string};
  @Input() navigation;
  @Input() logoType: string;
  @Output() navigate = new EventEmitter<string>();

  userValue = true;
  constructor(public store: Store<fromRoot.State>) { }

  onEmmitEvent(index) {
    this.navigate.emit(this.navigation.items[index].emit);
  }

  public getHeaderHeight(showItems) {
    if (showItems) {
      return 'none';
    } else {
      return '88px';
    }
  }
}
