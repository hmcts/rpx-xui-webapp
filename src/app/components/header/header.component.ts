import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppTitleModel } from '../../models/app-title.model';
import { UserNavModel } from '../../models/user-nav.model';
import * as fromRoot from '../../store';

@Component({
  selector: 'exui-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  @Input() public navItems: { active: boolean; href: string; }[];
  @Input() public title: AppTitleModel;
  @Input() public userNav: UserNavModel;
  @Output() public navigate = new EventEmitter<string>();

  constructor(public store: Store<fromRoot.State>) {}

  public onNavigate(event) {
    this.navigate.emit(event);
  }
}
