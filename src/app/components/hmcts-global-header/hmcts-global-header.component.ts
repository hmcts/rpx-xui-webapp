import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store';

@Component({
    selector: 'exui-hmcts-global-header',
    templateUrl: './hmcts-global-header.component.html'
})
export class HmctsGlobalHeaderComponent {

  // @Input() set userLoggedIn(value) {
  //     this.userValue = value;
  // }
  @Input() public headerTitle: {name: string; url: string};
  @Input() public navigation: any;
  @Output() public navigate = new EventEmitter<string>();

  public userValue = true;
  constructor(public store: Store<fromRoot.State>) { }

  public onEmmitEvent(index: number) {
    this.navigate.emit(this.navigation.items[index].emit);
  }


}
