import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { LoggerService } from '../../services/logger/logger.service';
import * as fromActions from '../../store';
import { Store } from '@ngrx/store';
import {NavItemsModel} from '../../models/nav-item.model';
import {AppTitleModel} from '../../models/app-title.model';
import {UserNavModel} from '../../models/user-nav.model';
import {AppConstants} from '../../app.constants';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'exui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  navItems: NavItemsModel[];
  appHeaderTitle: AppTitleModel;
  userNav: UserNavModel;
  componentName = 'App Component';

  constructor(
    private logger: LoggerService,
    private store: Store<fromActions.State>,
    private http: HttpClient) {
  }

  ngOnInit(): void {
    this.appHeaderTitle = AppConstants.APP_HEADER_TITLE;
    this.navItems = AppConstants.NAV_ITEMS;
    this.userNav = AppConstants.USER_NAV;
  }

  onNavigate(event): void {
    if (event === 'sign-out') {
      return this.store.dispatch(new fromActions.Logout());
    }
  }

  getUrl(url) {
    this.http.get<any>(url).subscribe(data => {
      console.log(data);
    });
  }
}
