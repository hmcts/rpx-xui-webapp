import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as fromRoot from '../../store';
import { Store } from '@ngrx/store';

@Component({
    selector: 'exui-hmcts-global-header',
    templateUrl: './hmcts-global-header.component.html'
})
export class HmctsGlobalHeaderComponent {

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
}
