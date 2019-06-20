import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { LoggerService } from '../../services/logger/logger.service';
import * as fromActions from '../../store';
import { Store } from '@ngrx/store';
import {NavItemsModel} from '../../models/nav-item.model';
import {AppTitleModel} from '../../models/app-title.model';
import {UserNavModel} from '../../models/user-nav.model';

@Component({
  selector: 'exui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{
  navItems: NavItemsModel[];
  appHeaderTitle: AppTitleModel;
  userNav: UserNavModel;
  componentName: string;

  constructor(
    private logger: LoggerService,
    private store: Store<fromActions.State> ) {
  }

  ngOnInit(): void {
    this.componentName = 'App Component';
    this.appHeaderTitle = {name: 'Manage Cases', url: '/'};
    this.appHeaderTitle.url = '/';

    this.navItems = [{
      text: 'Case list',
      href: '/cases',
      active: true
    }];

    this.userNav ={
      label: 'Account navigation',
      items: [{
        text: 'Sign out',
        emit: 'sing-out'
      }]
    };
  }

  onNavigate(event): void {
    this.store.dispatch(new fromActions.Logout());
    switch(event) {
      case 'sign-out':
        this.store.dispatch(new fromActions.Logout());
    }
  }
  // To do move signOut to header component when available!!!
  signOut() {

  }
}
