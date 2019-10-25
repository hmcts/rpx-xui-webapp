import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../store';
import {AppTitleModel} from '../../models/app-title.model';
import {UserNavModel} from '../../models/user-nav.model';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'exui-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  @Input() navItems: { active: boolean; href: string; }[];
  @Input() title: AppTitleModel;
  @Input() userNav: UserNavModel;
  @Output() navigate = new EventEmitter<string>();

  public isCaseManager = false;

  constructor(
    public store: Store<fromRoot.State>,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
     const userRoles = this.cookieService.get('roles');
     if (userRoles.indexOf('pui-case-manager') !== -1) {
        this.isCaseManager = true;
     }
  }

  onNavigate(event) {
    this.navigate.emit(event);
  }
}
