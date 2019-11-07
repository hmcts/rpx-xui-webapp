import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { NavItemsModel } from 'src/app/models/nav-item.model';
import { AppTitleModel } from '../../models/app-title.model';
import { UserNavModel } from '../../models/user-nav.model';
import * as fromRoot from '../../store';

@Component({
  selector: 'exui-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  @Input() public navItems: NavItemsModel[];
  @Input() public title: AppTitleModel;
  @Input() public userNav: UserNavModel;
  @Output() public navigate = new EventEmitter<string>();

  constructor(public store: Store<fromRoot.State>) {}

  public onNavigate(event: any) {
    this.navigate.emit(event);
  }
}
