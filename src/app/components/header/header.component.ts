import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as fromRoot from '../../store';
import {AppTitleModel} from '../../models/app-title.model';
import {UserNavModel} from '../../models/user-nav.model';
import { CookieService } from 'ngx-cookie';
import { Observable, of } from 'rxjs';
import { AppUtils } from 'src/app/app-utils';

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
  showNavItems: Observable<boolean>;

  constructor(
    public store: Store<fromRoot.State>,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
     const userRoles = this.cookieService.get('roles');
     if (userRoles && userRoles.indexOf('pui-case-manager') !== -1) {
        this.isCaseManager = true;
     }
     this.store.pipe(select(fromRoot.getRouterUrl)).subscribe(url => {
      this.showNavItems = of(AppUtils.showNavItems(url));
     });
  }

  onNavigate(event) {
    this.navigate.emit(event);
  }
}
