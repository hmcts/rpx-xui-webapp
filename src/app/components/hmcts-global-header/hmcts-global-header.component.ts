import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as fromRoot from '../../store';
import { Store } from '@ngrx/store';

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

  public showItems: boolean;

  @Input() public headerTitle: {name: string; url: string};
  @Input() public navigation;
  @Input() public logoType: string;
  @Output() public navigate = new EventEmitter<string>();

  public userValue = true;

  constructor(public store: Store<fromRoot.State>) { }

  public onEmmitEvent(index) {

    this.navigate.emit(this.navigation.items[index].emit);
  }
}
