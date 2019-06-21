import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../store';
import {AppTitleModel} from '../../models/app-title.model';
import {UserNavModel} from '../../models/user-nav.model';

@Component({
  selector: 'exui-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  @Input() navItems: { active: boolean; href: string; }[];
  @Input() title: AppTitleModel;
  @Input() userNav: UserNavModel;
  @Output() navigate = new EventEmitter<string>();

  constructor(public store: Store<fromRoot.State>) {}

  onNavigate(event) {
    this.navigate.emit(event);
  }
}
