import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { LoggerService } from '../../services/logger/logger.service';
import * as fromActions from '../../store';
import { Store } from '@ngrx/store';
import {NavItemsModel} from '../../models/nav-item.model';
import {AppTitleModel} from '../../models/app-title.model';

@Component({
  selector: 'exui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{
  navItems: NavItemsModel[];
  appHeaderTitle: AppTitleModel;
  userNav: NavItemsModel[];

  constructor(
    private logger: LoggerService,
    private store: Store<fromActions.State> ) {
  }

  ngOnInit(): void {
    this.appHeaderTitle = { name: 'Manage Cases', url: '/' };
    this.appHeaderTitle.url = '/'
    this.navItems = [{
      text: 'Case list',
      href: '/',
      active: true
    }];
    this.userNav = [{
      text: 'Case list',
      href: '/',
      active: true
    }];
  }

  // To do move signOut to header component when available!!!
  signOut() {
    this.store.dispatch(new fromActions.Logout());
  }
}
